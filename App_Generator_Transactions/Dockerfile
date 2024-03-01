FROM node:14-alpine

WORKDIR /app

# Copiamos el package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto de la aplicación
COPY . .

# Definimos la variable de entorno para la URL de la API
ENV REACT_APP_API_URL=http://localhost:8080/bank/transactions

# Compilar la aplicación React
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
