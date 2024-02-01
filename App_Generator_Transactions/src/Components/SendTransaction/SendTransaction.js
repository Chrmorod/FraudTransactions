import React from "react";
import Datetime from '../DateTime';
import './SendTransaction.css';
const TRX_API_URL = "http://localhost:8080/transactions";
export class SendTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            amount: "",
            sender: "",
            oldbalancesender: "",
            newbalancesender: "",
            recipient: "",
            oldbalancerecipient: "",
            newbalancerecipient: ""
        };
    }

    setSender = (sender) => { this.setState({ sender: sender }); }
    setOldBalanceSender = (oldbalancesender) => { this.setState({ oldbalancesender: oldbalancesender }); }
    setNewBalanceSender = (newbalancesender) => { this.setState({ newbalancesender: newbalancesender }); }
    setAmount = (amount) => { this.setState({ amount: amount }); }
    setType = (type) => { this.setState({ type: type }); }
    setRecipient = (recipient) => { this.setState({ recipient: recipient }); }
    setOldBalanceRecipient = (oldbalancerecipient) => { this.setState({ oldbalancerecipient: oldbalancerecipient }); }
    setNewBalanceRecipient = (newbalancerecipient) => { this.setState({ newbalancerecipient: newbalancerecipient }); }

    handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
          let transaction = {
              "transaction": {
                "step": 1,
                "type": this.state.type,
                "amount": this.state.amount,
                "nameOrig": this.state.sender,
                "oldbalanceOrg": this.state.oldbalancesender,
                "newbalanceOrig": this.state.newbalancesender,
                "nameDest": this.state.recipient,
                "oldbalanceDest": this.state.oldbalancerecipient,
                "newbalanceDest": this.state.newbalancerecipient,
                "isFraud": 0,
                "isFlaggedFraud": 0
              }
          };
  
          const response = await fetch(TRX_API_URL, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(transaction),
          });
  
          if (response.ok) {
              console.log('Datos guardados exitosamente');
              this.props.history.push('/transactions');
          } else {
              console.error('Error al guardar datos');
          }
      } catch (error) {
          console.error('Error de red:', error);
      }
    };
    render(){
        return(
          <>
            <section>
              <div class="title-datetime-container">
                <h1>Create Transactions</h1>
                <Datetime />
              </div>
            </section>
            <section>
              <form onSubmit={this.handleSubmit} class="section-body">
                <div class="card-container sender-card">
                  <h2>Sender</h2>
                  <label>Sender</label>
                  <input type="text" autoFocus required value={this.state.sender} onChange={(e) => this.setSender(e.target.value)} />
                  <label>Old Balance Sender</label>
                  <input type="text" autoFocus required value={this.state.oldbalancesender} onChange={(e) => this.setOldBalanceSender(e.target.value)} />
                  <label>New Balance Sender</label>
                  <input type="text" autoFocus required value={this.state.newbalancesender} onChange={(e) => this.setNewBalanceSender(e.target.value)} />
                </div>
                <div class="arrow-right"></div>
                <div class="card-container amount-type-card">
                  <div class="arrow-container">
                    <div class="arrow"></div>
                  </div>
                  <h2>Amount & Type</h2>
                  <label>Amount</label>
                  <input type="text" autoFocus required value={this.state.amount} onChange={(e) => this.setAmount(e.target.value)} />
                  <label for="type-transac">Type</label>
                  <select id="type-transac" name="type" type="text" autoFocus required value={this.state.type} onChange={(e) => this.setType(e.target.value)} >
                    <option value="cash-in">CASH-IN</option>
                    <option value="cash-out">CASH-OUT</option>
                    <option value="debit">DEBIT</option>
                    <option value="payment">PAYMENT</option>
                    <option value="transfer">TRANSFER</option>
                  </select>
                </div>
                <div class="arrow-right"></div>
                <div class="card-container recipient-card">
                  <h2>Recipient</h2>
                  <label>Recipient</label>
                  <input type="text" autoFocus required value={this.state.recipient} onChange={(e) => this.setRecipient(e.target.value)} />
                  <label>Old Balance Recipient</label>
                  <input type="text" autoFocus required value={this.state.oldbalancerecipient} onChange={(e) => this.setOldBalanceRecipient(e.target.value)} />
                  <label>New Balance Recipient</label>
                  <input type="text" autoFocus required value={this.state.newbalancerecipient} onChange={(e) => this.setNewBalanceRecipient(e.target.value)} />
                </div>
              </form>
            </section>
            <section>
                <div className="section-btn">
                    <button className="btn-general" type="submit" onClick={this.handleSubmit}>Register Transaction</button>
                </div>
            </section>
          </>
        )
    }
}
//export default App;
