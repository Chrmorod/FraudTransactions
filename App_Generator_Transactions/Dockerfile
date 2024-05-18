FROM node:14-alpine

WORKDIR /app

# Copy package.json & install dependencies
COPY package*.json ./
RUN npm install

# Copy rest app
COPY . .

# Define enviroment var - URL API
ENV REACT_APP_API_URL=http://localhost:8090/bank/transactions/publish-transaction

# Compile React Application
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
