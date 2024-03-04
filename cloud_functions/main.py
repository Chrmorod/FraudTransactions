import json
import os
from datetime import datetime

import iso3166
from flask import jsonify
from google.cloud import storage


def upload(file_path, content):
    storage_client = storage.Client()
    bucket_name = os.getenv('BUCKET_NAME')
    bucket = storage_client.bucket(bucket_name)
    new_blob = bucket.blob(file_path)
    new_blob.upload_from_string(content)


def add_event(request):
    """Save new events in: events/raw/<data>/event-<id>.json
    
    https://europe-west1-airbnb-bigdata-project.cloudfunctions.net/add_event

    Example:
    --------
        {
            "eventId": "03854e09-470f-4e90-989f-308b9f39d155", 
            "tenantId": "airbnb", 
            "eventTime": "2023-01-22T15:54:10.368082833-03:00", 
            "processTime": "2023-01-22T15:54:40.368082833-03:00", 
            "resourceId": "RES.002", 
            "userId": "USR.005", 
            "countryCode": "UK",  ==> iso3166
            "duration": 149, 
            "itemPrice": 27.63, 
            "externalId": null, 
            "created": "2023-01-22T18:54:10.392377"
        }

    """

    payload = request.get_json(silent=True)

    if not iso3166.countries.get(payload['countryCode']): #TODO: Comprobar que funcione!!
        return jsonify({'error': 'Country code is not ISO 3166.'})
    
    eventId = payload['eventId']
    payload['externalId'] = eventId #TODO: Comprobar que funcione!!
    payload['created'] = datetime.utcnow().isoformat()
    payload_as_string = json.dumps(payload)
    upload(
        f"events/raw/{datetime.utcnow().date().isoformat()}/event-{eventId}.json", payload_as_string)

    return jsonify({'externalId': eventId})
