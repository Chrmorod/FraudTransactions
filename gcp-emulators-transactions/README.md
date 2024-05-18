# Introduction
Welcome to the Online Payments Simulator API documentation!

This API is designed to facilitate the simulation of online payments in real-time.

It provides endpoints to retrieve transactions from a MongoDB database and publish them to a Pub/Sub system using /online-payments, 
as well as to insert transactions into Firestore using /transactions.
## Prerequisites
You must install [Google Cli](https://cloud.google.com/sdk/docs/install).

## Enpoints
### Retrieve Online Payments
#### Endpoint: /online-payments

Method: GET

Description: Retrieves online payment transactions from a MongoDB database.

Parameters: None

Response:

Success: Returns a JSON object containing the retrieved transactions.
Error: Returns an error message if the retrieval fails.
Publish Transaction
#### Endpoint: /publish-transaction

Method: POST

Description: Publishes a transaction to a Pub/Sub system.

Parameters:

Transaction data (JSON format)
Response:

Success: Returns a confirmation message upon successful publishing.
Error: Returns an error message if the publishing fails.
Insert Transaction
#### Endpoint: /transactions

Method: POST

Description: Inserts a transaction into Firestore.

Parameters:

Transaction data (JSON format)
Response:

Success: Returns a confirmation message upon successful insertion.
Error: Returns an error message if the insertion fails.

## Reference Documentation
For further reference, please consider the following sections:

* [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
* [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/docs/3.0.4/maven-plugin/reference/html/)
* [Create an OCI image](https://docs.spring.io/spring-boot/docs/3.0.4/maven-plugin/reference/html/#build-image)
* [GCP Support](https://googlecloudplatform.github.io/spring-cloud-gcp/reference/html/index.html)
* [GCP Storage](https://googlecloudplatform.github.io/spring-cloud-gcp/reference/html/index.html#cloud-storage)
* [GCP Messaging](https://googlecloudplatform.github.io/spring-cloud-gcp/reference/html/index.html#cloud-pubsub)
* [Medium - Claudio Rauso](https://medium.com/@claudiorauso/local-testing-spring-gcp-firestore-57f2ffc49c1e)
