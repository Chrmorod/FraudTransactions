![Logo](https://github.com/Chrmorod/FraudTransactions/blob/main/images/3-Scams-Blog-image.jpg)

# TransactLaunch 
### Final Project - Bigdata &amp; Analytics UPV

## API Reference

#### Get all transactions from mongodb
```https://transactlaunch-api-goo2izby2q-ew.a.run.app/bank/transactions/online-payments
  GET /bank/transactions/online-payments
```

| Parameter     |   Type   | Description                |
| :--------     | :------- | :------------------------- |
| `transaction` | `object` | `{ "id": "66047a934474d286e0bed239" "step": 278,"type": "CASH_IN","amount": 355919.4,"nameOrig": "C1991608184","nameDest": "C465944656","oldBalanceOrg": 72466.0 "oldBalanceDest": 7759.33,"newBalanceDest": 0.0}` |

#### Post all transactions (Pub/Sub format)

``` https://transactlaunch-api-goo2izby2q-ew.a.run.app/bank/transactions/publish-transaction
  POST /bank/transactions/publish-transaction
```

| Parameter     | Type     | Description                       |
| :--------     | :------- | :-------------------------------- |
| `transaction` | `object` | **6NzgrIGX7sbB8tYdHLrk** `amount: 13439.14 nameDest: "M1498613611" nameOrig: "C243675757" newBalanceDest: 0 newBalanceOrig: 0 oldBalanceDest: 0 oldBalanceOrg: 0 step: 34 type: "PAYMENT"` |

## Deployment

To deploy the local react project run

```bash
  npm start
```
## Demo project 

[TransactLaunch Project](https://transactlaunch-app-goo2izby2q-ew.a.run.app)

## Architecture

![Architecture](https://github.com/Chrmorod/FraudTransactions/blob/main/images/transactLaunch-architecture.png)

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## Usage CloudFunctions

```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```
## Tech Stack

**Client:** React JS, Spring Boot

**Server:** Node

**Databases** Mongodb,  BigQuery

## Acknowledgements

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)

## Documentation

[Documentation](https://linktodocumentation)

## Author

- [@Chrmorod](https://github.com/Chrmorod/)

