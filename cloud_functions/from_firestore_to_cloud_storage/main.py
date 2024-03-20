import json
import os
from datetime import datetime
from flask import jsonify
from google.cloud import firestore
from google.cloud import storage

def upload(file_path, content):
    storage_client = storage.Client()
    bucket_name = os.getenv('BUCKET_NAME')
    bucket = storage_client.bucket(bucket_name)
    new_blob = bucket.blob(file_path)
    new_blob.upload_from_string(content) 

def format_transaction_data(data):
    return {
        field_name: field_value[next(iter(field_value))]
        for field_name, field_value in data.items()
    }
def add_trx(data, context):
    try:
        trx_id = context.resource.split('/')[-1]
        fields_data = data.get('value', {}).get('fields', {})
        transaction_data = format_transaction_data(fields_data)
        transaction = json.dumps(transaction_data)
        upload(f"transactions/{datetime.utcnow().date().isoformat()}/trx-{trx_id}.json", transaction)
    except Exception as e:
        print(f"An error occurred: {e}")

