import json
import os
from datetime import datetime
from flask import jsonify
from google.cloud import firestore
from google.cloud import storage

db = firestore.Client()

def upload(file_path, content):
    storage_client = storage.Client()
    bucket_name = os.getenv('BUCKET_NAME')
    bucket = storage_client.bucket(bucket_name)
    new_blob = bucket.blob(file_path)
    content_json = json.dumps(content)
    new_blob.upload_from_string(content_json) 

def add_trx(request):
    trx_collection_ref = db.collection('transactions')
    for doc in trx_collection_ref.stream():
        trx_id = doc.id
        transaction = doc.to_dict()
        upload(f"transactions/{datetime.utcnow().date().isoformat()}/trx-{trx_id}.json", transaction)
    return jsonify({ 'ok': 0 })

