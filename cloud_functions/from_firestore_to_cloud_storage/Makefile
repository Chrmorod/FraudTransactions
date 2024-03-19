# Definición de las variables
FUNCTION_NAME := add_trx
BUCKET_NAME := bucket-transaction
DEPLOY_PARAMS := --set-env-vars BUCKET_NAME=$(BUCKET_NAME)

# Regla para implementar la función
deploy:
	gcloud functions deploy $(FUNCTION_NAME) $(DEPLOY_PARAMS)
