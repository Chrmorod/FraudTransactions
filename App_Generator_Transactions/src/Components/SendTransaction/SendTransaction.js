import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Home } from '../Home/Home';
import './SendTransaction.css';
import logoTransaction from '../../Images/transaction.svg';
import { v4 as uuid } from 'uuid';
import moment from 'moment-timezone';

const TRX_API_URL_POST = process.env.REACT_APP_API_URL;

class HomeView extends React.Component {
  render() {
    return (
      <Home />
    );
  }
}

export class SendTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeOptions: ["CASH-IN", "CASH-OUT", "DEBIT", "PAYMENT", "TRANSFER"],
      step: 1,
      type: "CASH-IN",
      amount: 0,
      nameOrig: "",
      oldBalanceOrg: 0,
      newBalanceOrig: 0,
      nameDest: "",
      oldBalanceDest: 0,
      newBalanceDest: 0,
      home: false
    };
  }
  getCurrentDateInDays = () => {
      const today = new Date();
      const epoch = new Date(1970, 0, 1);
      const differenceInTime = today.getTime() - epoch.getTime();
      const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
      return differenceInDays;
  };
  getCurrentTime = () => {
     //const now = moment.tz('Europe/Madrid').format('HH:mm:ss.SSS000');// Spain hour
     const now = moment.tz('Europe/Madrid').add(1, 'hours');
     const hours = now.hours()+1;
     const minutes = now.minutes();
     const seconds = now.seconds();
     const milliseconds = now.milliseconds();
     const microseconds = (hours * 3600 * 1e6) + (minutes * 60 * 1e6) + (seconds * 1e6) + (milliseconds * 1e3);
     return microseconds;
  };
  generateRandomNumber = () => {
    const randomNumber = Math.random();
    const scaledNumber = randomNumber * 743;
    const roundedNumber = Math.floor(scaledNumber);
    const finalNumber = roundedNumber + 1;
    return finalNumber;
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  setGoBack = () => {
    this.setState({ home: true });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let postData = {
          "ID": uuid(),
          "date": this.getCurrentDateInDays(),
          "time": this.getCurrentTime(),
          "oldBalanceOrg": parseFloat(this.state.oldBalanceOrg),
          "nameDest": this.state.nameDest,
          "step": this.generateRandomNumber(),
          "newBalanceDest": parseFloat(this.state.newBalanceDest),
          "nameOrig": this.state.nameOrig,
          "type": this.state.type,
          "amount": parseFloat(this.state.amount),
          "newBalanceOrig": parseFloat(this.state.newBalanceOrig),
          "oldBalanceDest": parseFloat(this.state.oldBalanceDest)
        };
      const POST_URL = TRX_API_URL_POST;
      const postResponse = await fetch(POST_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      if (postResponse.ok) {
        console.log('Solicitud POST exitosa:', postData);
      } else {
        console.error('Error en la solicitud POST:', postData);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  render() {
    return (
      <>
        {this.state.home ? (
          <HomeView />
        ) : (
          <>
            <div className="myheader">
              <img className="logo-style" src={logoTransaction}/>
              <h1>Manual Entry</h1>
            </div>
            <button className="btn-back" onClick={this.setGoBack}><FontAwesomeIcon icon={faChevronLeft} /></button>
            <section>
              <form onSubmit={this.handleSubmit} className="section-body">
                <table>
                  <thead>
                    <tr>
                      <th>NameOrig</th>
                      <th>OldBalanceOrig</th>
                      <th>NewBalanceOrig</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>NameDest</th>
                      <th>OldBalanceDest</th>
                      <th>NewBalanceDest</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input type="text" name="nameOrig" autoFocus required value={this.state.nameOrig} onChange={this.handleChange} /></td>
                      <td><input type="number" step="any" name="oldBalanceOrg" autoFocus required value={this.state.oldBalanceOrg} onChange={this.handleChange} /></td>
                      <td><input type="number" step="any" name="newBalanceOrig" autoFocus required value={this.state.newBalanceOrig} onChange={this.handleChange} /></td>
                      <td width='200px'>
                        <select id="type-transac" name="type" type="text" autoFocus required value={this.state.type} onChange={this.handleChange}>
                          {this.state.typeOptions.map(option => (<option key={option} value={option}>{option}</option>))}
                        </select>
                      </td>
                      <td><input type="number" step="any" name="amount" autoFocus required value={this.state.amount} onChange={this.handleChange} /></td>
                      <td><input type="text" name="nameDest" autoFocus required value={this.state.nameDest} onChange={this.handleChange} /></td>
                      <td><input type="number" step="any" name="oldBalanceDest" autoFocus required value={this.state.oldBalanceDest} onChange={this.handleChange} /></td>
                      <td><input type="number" step="any" name="newBalanceDest" autoFocus required value={this.state.newBalanceDest} onChange={this.handleChange} /></td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </section>
            <section>
              <div className="section-btn">
                <button className="btn-register" type="submit" onClick={this.handleSubmit}>Register Transaction</button>
              </div>
            </section>
          </>
        )}
      </>
    );
  }
}

