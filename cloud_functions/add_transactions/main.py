import json
import os
from datetime import datetime
from flask import jsonify
from google.cloud import storage
from google.cloud import firestore

def upload(file_path, content):
    storage_client = storage.Client()
    bucket_name = os.getenv('BUCKET_NAME')
    bucket = storage_client.bucket(bucket_name)
    new_blob = bucket.blob(file_path)
    new_blob.upload_from_string(content)


def add_transaction(request):
    """
    Example:
    --------
        {
        "step": 1,
        "type": "CASH-IN",
        "amount": 100,
        "nameOrig": "CHRISTIAN",
        "nameDest": "ADAM",
        "oldBalanceDest": 0,
        "newBalanceDest": 100,
        "newBalanceOrig": 100,
        "oldBalanceOrg": 200
        }
    """
    db = firestore.Client()
    doc_ref = db.collection('transactions').document()
    transaction_ID = doc_ref
    payload = request.get_json(silent=True)
    payload_as_string = json.dumps(payload)
    upload(
        f"transactions/raw/trx-{transaction_ID}-{datetime.utcnow().date().isoformat()}.json", payload_as_string)

    return jsonify({'Id': transaction_ID})
