![Logo](https://github.com/Chrmorod/FraudTransactions/blob/main/images/3-Scams-Blog-image.jpg)

# TransactLaunch 
### Final Project - Bigdata &amp; Analytics UPV

## API Reference

#### Get all transactions from mongodb
```https://transactlaunch-api-goo2izby2q-ew.a.run.app/bank/transactions/online-payments
  GET /bank/transactions/online-payments
```

| Parameter     |   Type   | Description                |
| :--------     | :------- | :------------------------- |
| `transaction` | `object` | `{ "id": "66047a934474d286e0bed239" "step": 278,"type": "CASH_IN","amount": 355919.4,"nameOrig": "C1991608184","nameDest": "C465944656","oldBalanceOrg": 72466.0 "oldBalanceDest": 7759.33,"newBalanceDest": 0.0}` |

#### Post all transactions (Pub/Sub format)

``` https://transactlaunch-api-goo2izby2q-ew.a.run.app/bank/transactions/publish-transaction
  POST /bank/transactions/publish-transaction
```

| Parameter     | Type     | Description                       |
| :--------     | :------- | :-------------------------------- |
| `transaction` | `object` | **6NzgrIGX7sbB8tYdHLrk** `amount: 13439.14 nameDest: "M1498613611" nameOrig: "C243675757" newBalanceDest: 0 newBalanceOrig: 0 oldBalanceDest: 0 oldBalanceOrg: 0 step: 34 type: "PAYMENT"` |

## Deployment

To deploy the local react project run

```bash
  npm start
```
## Demo project 

[TransactLaunch Project](https://transactlaunch-app-goo2izby2q-ew.a.run.app)

## Architecture

![Architecture](https://github.com/Chrmorod/FraudTransactions/blob/main/images/transactLaunch-architecture.png)

## Screenshots

![App Screenshot](https://github.com/Chrmorod/FraudTransactions/blob/main/images/TransactLaunch.gif)

## Usage CloudFunctions

```python
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
        
        # Extract data
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
        
        # Insert data into fraud_data_validate
        query_validate = f"""
        INSERT INTO `{PROJECT_ID}.{BQ_DATASET}.fraud_data_validate`(ID, date, time, nameOrig, oldBalanceOrg, newBalanceOrig, nameDest, oldBalanceDest, newBalanceDest, type, amount, step)
        VALUES (
            '{ID}', {current_date}, {current_time}, '{nameOrig}', {oldBalanceOrg}, {newBalanceOrig}, '{nameDest}', {oldBalanceDest}, {newBalanceDest}, '{type}', {amount}, {step}
        )
        """
        query_job = BQ.query(query_validate)
        query_job.result()
        print(f"Processed transaction ID: {ID} in table fraud_data_validate at date: {current_date}")
        
        # Insert data into fraud_results
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

    except KeyError as e:
        print(f"KeyError: {e}. Event received: {event}")
        log_error(event, e)
    except Exception as e:
        print(f"An error occurred: {traceback.format_exc()}")
        log_error(event, e)
        # Rollback logic: remove the inserted record from fraud_data_validate if the insertion to fraud_results failed
        if 'ID' in locals():
            rollback_query_validate = f"""
            DELETE FROM `{PROJECT_ID}.{BQ_DATASET}.fraud_data_validate`
            WHERE ID = '{ID}'
            """
            rollback_query_results = f"""
            DELETE FROM `{PROJECT_ID}.{BQ_DATASET}.fraud_results`
            WHERE ID = '{ID}'
            """
            try:
                BQ.query(rollback_query_validate).result()
                BQ.query(rollback_query_results).result()
                print(f"Rolled back transaction ID: {ID} from both tables due to an error")
            except Exception as rollback_error:
                print(f"Rollback failed: {rollback_error}")

def log_error(event, error):
    try:
        error_data = {
            "event": event,
            "error_message": str(error),
            "traceback": traceback.format_exc()
        }
        error_json = json.dumps(error_data)
        current_date = "DATE(CURRENT_DATETIME())"
        current_time = "TIME(TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), SECOND))"
        query_error_log = f"""
        INSERT INTO `{PROJECT_ID}.{BQ_DATASET}.fraud_data_errors`(event, error_message, traceback, date, time)
        VALUES (
            '{error_json}', '{str(error)}', '{traceback.format_exc()}', {current_date}, {current_time}
        )
        """
        BQ.query(query_error_log).result()
        print(f"Logged error for event: {event}")

    except Exception as log_error:
        print(f"Failed to log error: {log_error}")
```
## Tech Stack

**Client:** React JS, Spring Boot

**Server:** Node

**Databases** Mongodb,  BigQuery

## Acknowledgements
 - [Claudio Rauso - Firestore](https://medium.com/@claudiorauso/local-testing-spring-gcp-firestore-57f2ffc49c1e)
 - [Claudio Rauso -Pub/Sub](https://medium.com/@claudiorauso/local-testing-spring-gcp-pub-sub-e2028b69d8e5)
 - [Spring Boot](https://start.spring.io/)
 - [React JS](https://react.dev/)
 - [Eraser - Diagrams](https://app.eraser.io/)

## Documentation

[Documentation](https://linktodocumentation)

## Author

- [@Chrmorod](https://github.com/Chrmorod/)

