# TransactLaunch Application

## Introduction

Welcome to TransactLaunch! This application is designed to simulate online payments and provide a dashboard summary of transaction data, including fraud statistics. It offers three main functionalities:

1. **Manual Online Payment Simulation**: Allows users to manually insert simulated online payment transactions.
2. **Automatic Data Generation**: Enables users to input the URL of the created API to automatically insert transactions from MongoDB to Google Cloud Pub/Sub, which handles further processing.
3. **Dashboard**: Provides a summary of transaction data, including fraud statistics by date.

## Usage

### 1. Manual Online Payment Simulation

Click on the "Insert Manual Payment" button to manually insert a simulated online payment transaction.

### 2. Automatic Data Generation

Click on the "Generate Data Automatically" button and input the URL of the created API. This will automatically insert transactions from MongoDB to Google Cloud Pub/Sub.

### 3. Dashboard

Click on the "Dashboard" button to view a summary of transaction data. The dashboard includes statistics on fraud occurrences by date and other relevant information.

## Installation

To run the TransactLaunch application locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install dependencies.
4. After installation, run `npm start` to start the development server.
5. Access the application in your web browser at `http://localhost:3000`.

## Technologies Used

- ReactJS: Frontend framework for building user interfaces.
- Google Cloud Pub/Sub: Messaging service used for publishing and subscribing to messages.
- MongoDB: NoSQL database used for storing transaction data.
- Other dependencies as specified in the `package.json` file.

## Contributing

Contributions to TransactLaunch are welcome! If you have any suggestions, feature requests, or bug reports, please submit them via GitHub issues.
