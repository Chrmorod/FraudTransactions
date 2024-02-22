# Utilizar la imagen base de Java
FROM adoptopenjdk/openjdk11:jre-11.0.11_9-alpine
LABEL maintainer "Christian Molina <chmorod>"
# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el JAR de tu aplicación Micronaut al contenedor
COPY build/libs/*.jar app.jar

# Exponer el puerto en el que se ejecuta tu aplicación Micronaut
EXPOSE 8080

# Comando para ejecutar tu aplicación Micronaut al iniciar el contenedor
CMD ["java", "-jar", "app.jar"]