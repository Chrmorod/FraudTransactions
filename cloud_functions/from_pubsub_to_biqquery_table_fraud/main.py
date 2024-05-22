import base64
import json
import os
import traceback
from google.cloud import bigquery

PROJECT_ID = os.getenv('PROJECT_ID')
BQ_DATASET = os.getenv('DATASET')

BQ = bigquery.Client()

def pubsub_to_bigquery(event, context):
    try:
        # Decode msg Pub/Sub
        pubsub_message = base64.b64decode(event['data']).decode('utf-8')
        data = json.loads(pubsub_message)
        print(pubsub_message)
        ID = data.get('id')
        oldBalanceOrg = data.get('oldBalanceOrg')
        nameDest = data.get('nameDest')
        step = data.get('step')
        newBalanceDest = data.get('newBalanceDest')
        nameOrig = data.get('nameOrig')
        type = data.get('type')
        amount = data.get('amount')
        newBalanceOrig = data.get('newBalanceOrig')
        oldBalanceDest = data.get('oldBalanceDest')
        
        current_date = "DATE(CURRENT_DATETIME())"
        current_time = "TIME(TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), SECOND))"
        
        query_validate = f"""
        INSERT INTO `{PROJECT_ID}.{BQ_DATASET}.fraud_validate`(ID, date, time, nameOrig, oldBalanceOrg, newBalanceOrig, nameDest, oldBalanceDest, newBalanceDest, type, amount, step)
        VALUES (
            '{ID}', {current_date}, {current_time}, '{nameOrig}', {oldBalanceOrg}, {newBalanceOrig}, '{nameDest}', {oldBalanceDest}, {newBalanceDest}, '{type}', {amount}, {step}
        )
        """
        query_job = BQ.query(query_validate)
        query_job.result()
        print(f"Processed transaction ID: {ID} in table fraud_validate at date: {current_date}")

        query_results = f"""
        INSERT INTO `{PROJECT_ID}.{BQ_DATASET}.fraud_results`(ID, date, time, isFraud)
        SELECT '{ID}' as ID, {current_date} as date, {current_time} as time, p.label as isFraud
        FROM ML.PREDICT(MODEL `{PROJECT_ID}.{BQ_DATASET}.model_supervised_lreg`,
            (
                SELECT
                    '{type}' AS type,
                    {amount} AS amount,
                    '{nameOrig}' AS nameOrig,
                    '{nameDest}' AS nameDest,
                    {oldBalanceOrg} AS oldBalanceOrig,
                    {newBalanceOrig} AS newBalanceOrig,
                    {oldBalanceDest} AS oldBalanceDest,
                    {newBalanceDest} AS newBalanceDest,
                    IF({oldBalanceOrg} = 0.0, 1, 0) AS origzeroFlag,
                    IF({newBalanceDest} = 0.0, 1, 0) AS destzeroFlag,
                    ROUND(({newBalanceDest} - {oldBalanceDest} - {amount})) AS amountError,
                    '{ID}' AS ID
            )
        ), UNNEST(predicted_isfraud_probs) AS p
        WHERE p.prob > 0.5
        """
        query_job = BQ.query(query_results)
        query_job.result()
        print(f"Processed transaction ID: {ID} in table fraud_results at date: {current_date}")

    #except KeyError as e:
    #    print(f"KeyError: {e}. Event received: {event}")
    except Exception as e:
        print(f"An error occurred: {traceback.format_exc()}")

