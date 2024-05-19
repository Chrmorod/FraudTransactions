import base64
import json
import os
import traceback
import re
from google.cloud import bigquery

PROJECT_ID = os.getenv('PROJECT_ID')
BQ_DATASET = os.getenv('DATASET')  # bank

BQ = bigquery.Client()

def pubsub_to_bigquery(event, context):
    # Decode msg Pub/Sub
    pubsub_message = base64.b64decode(event['data']).decode('utf-8')
    data = json.loads(pubsub_message)
        
    try:
        # Obtain data
        ID = data.get('ID')
        date = data.get('date')
        time = data.get('time')
        oldBalanceOrg = data.get('oldBalanceOrg')
        nameDest = data.get('nameDest')
        step = data.get('step')
        newBalanceDest = data.get('newBalanceDest')
        nameOrig = data.get('nameOrig')
        type = data.get('type')
        amount = data.get('amount')
        newBalanceOrig = data.get('newBalanceOrig')
        oldBalanceDest = data.get('oldBalanceDest')
        # Query BigQuery ML
        query = f"""
        INSERT INTO `{PROJECT_ID}.{BQ_DATASET}.fraud_results`(ID, date, time, isFraud)
        SELECT id as ID, DATE_ADD(DATE(1970, 1, 1), INTERVAL CAST('{date}' AS INT64) DAY) AS date, TIME(TIMESTAMP_MICROS( CAST('{time}' AS INT64))) as time, p.label as isFraud
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
        query_job = BQ.query(query)
        query_job.result()  # wait the query finished
        
        print(f"Processed transaction ID: {ID} at date: {date}")

    except Exception:
        print('Error processing Pub/Sub message. Cause: %s' % (traceback.format_exc()))

