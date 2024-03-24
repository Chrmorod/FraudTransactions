import logging
import os
import traceback
import re

from google.cloud import bigquery
from google.cloud import storage

import yaml

with open("./schemas.yaml") as schema_file:
     config = yaml.load(schema_file, Loader=yaml.Loader)

PROJECT_ID = os.getenv('PROJECT_ID')
BQ_DATASET = os.getenv('DATASET') #bank
TABLE_PREDICTED = os.getenv('TABLE_PRED')
CS = storage.Client()
BQ = bigquery.Client()
job_config = bigquery.LoadJobConfig()


def streaming(data,context):
     bucketname = data['bucket'] 
     print("Bucket name",bucketname)
     filename = data['name']   
     print("File name",filename)  
     timeCreated = data['timeCreated']
     print("Time Created",timeCreated) 
     try:
          for table in config:
               tableName = table.get('name')
               print("Table Name:",tableName)
               tableSchema = table.get('schema')
               print("Table Schema:",tableSchema)
               _check_if_table_exists(tableName,tableSchema)
               tableFormat = table.get('format')
               print("Table Format:",tableFormat)
               if tableFormat == 'NEWLINE_DELIMITED_JSON':
                  _load_table_from_uri(data['bucket'], data['name'], tableSchema, tableName)
               # Prediction
               match = re.search(r'trx-(\w+)\.json', filename)
               id_trx = match.group(1)
               query = """
               INSERT INTO `detector-transactions-project.bank.fraud_results`(ID,date,time,isFraud)
               SELECT id as ID, DATE(CURRENT_DATETIME()) as date, TIME(TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), SECOND)) as time, p.label as isFraud
               FROM ML.PREDICT(MODEL `bank.model_supervised_lreg`,
               (
                    SELECT  type,
                         amount,
                         nameOrig,
                         nameDest,
                         oldBalanceOrg as oldBalanceOrig,
                         newBalanceOrig,
                         oldBalanceDest,
                         newBalanceDest,
                         if(oldBalanceOrg = 0.0, 1, 0) as origzeroFlag,
                         if(newBalanceDest = 0.0, 1, 0) as destzeroFlag,
                         round((newBalanceDest-oldBalanceDest-amount)) as amountError,
                         ID as id
                    FROM  `{PROJECT_ID}.{BQ_DATASET}.{TABLE_PREDICTED}`
                    WHERE ID = '{id_query}'
               )
               ), unnest(predicted_isfraud_probs) as p
               where p.prob > 0.5
               """.format(id_query=id_trx,PROJECT_ID=PROJECT_ID,BQ_DATASET=BQ_DATASET,TABLE_PREDICTED=TABLE_PREDICTED)
               query_job = BQ.query(query)
               #results = query_job.result()
               #for row in results:
               #    print("Selected record:", row)
     except Exception:
          print('Error streaming file. Cause: %s' % (traceback.format_exc()))

def _check_if_table_exists(tableName,tableSchema):

     table_id = BQ.dataset(BQ_DATASET).table(tableName)
     print("table Bigquery ID",table_id)
     try:
          BQ.get_table(table_id)
     except Exception:
          logging.warn('Creating table: %s' % (tableName))
          schema = create_schema_from_yaml(tableSchema)
          table = bigquery.Table(table_id, schema=schema)
          table = BQ.create_table(table)
          print("Created table {}.{}.{}".format(table.project, table.dataset_id, table.table_id))

def _load_table_from_uri(bucket_name, file_name, tableSchema, tableName):

     uri = 'gs://%s/%s' % (bucket_name, file_name)
     table_id = BQ.dataset(BQ_DATASET).table(tableName)

     schema = create_schema_from_yaml(tableSchema) 
     print(schema)
     job_config.schema = schema

     job_config.source_format = bigquery.SourceFormat.NEWLINE_DELIMITED_JSON,
     job_config.write_disposition = 'WRITE_APPEND',

     load_job = BQ.load_table_from_uri(
     uri,
     table_id,
     job_config=job_config,
     ) 
          
     load_job.result()
     print("Job finished.")

def create_schema_from_yaml(table_schema):
     schema = []
     for column in table_schema:
          
          schemaField = bigquery.SchemaField(column['name'], column['type'], column['mode'])

          schema.append(schemaField)

          if column['type'] == 'RECORD':
               schemaField._fields = create_schema_from_yaml(column['fields'])
     return schema
