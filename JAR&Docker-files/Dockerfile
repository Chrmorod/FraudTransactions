# Usa una imagen base oficial de Ubuntu
FROM ubuntu:latest

# Descarga y configura OpenJDK 17
RUN apt-get update && \
    apt-get install -y openjdk-17-jdk && \
    apt-get clean

# Establece las variables de entorno para Java
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH="$JAVA_HOME/bin:$PATH"

# Define el directorio de trabajo
WORKDIR /app

# Copia el archivo JAR a la imagen Docker
COPY ./transactlaunch-api.jar /app/transactlaunch-api.jar

# Exponemos el puerto 8080 para las peticiones GET y POST
EXPOSE 8080

# Establecemos las variables de entorno. Asegúrate de que las rutas y valores son correctos.
ENV spring.data.mongodb.uri="mongodb://localhost:27017"
ENV host.port.firestore="localhost:9080"
ENV project.id.gcloud="detector-transactions-project"
ENV CORS_ORIGIN_URL="http://localhost:3000"
ENV MODE_EMULATOR="false"
#ENV credentials.user="file:///path/to/your/service-account-file.json"
ENV pubsub.project-id="detector-transactions-project"
ENV pubsub.topic-id="online-payments"
ENV pubsub.subscription-id="online-payments-sub"

# Comando por defecto que se ejecutará cuando se inicie el contenedor
CMD ["java", "-jar", "/app/transactlaunch-api.jar"]
