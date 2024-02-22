import React from "react";
import {Home} from '../Home/Home'
import './SendTransaction.css';
const TRX_API_URL = "http://localhost:8080/transactions";
class HomeView extends React.Component{
  render(){
    return (
      <Home/>
    )
  }
}
export class SendTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typeOptions: ["CASH-IN", "CASH-OUT", "DEBIT", "PAYMENT", "TRANSFER"],
            type: "CASH-IN",
            amount: 0.0,
            sender: "",
            oldbalancesender: 0.0,
            newbalancesender: 0.0,
            recipient: "",
            oldbalancerecipient: 0.0,
            newbalancerecipient: 0.0
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
    setgoback = (setgoback) => {this.setState({home:setgoback})}
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
                "isFraud": 0
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
          {this.state.home ? (
              <HomeView/>
          ):(
            <>
              <section>
                <div class="title-datetime-container">
                  <h1>Create Transactions</h1>
                  <button className="btn-back" onClick={this.setgoback}>Back</button>
                </div>
              </section>
              <section>
                <form onSubmit={this.handleSubmit} class="section-body">
                <table>
                  <tr>
                      <th>Step</th>
                      <th>NameOrig</th>
                      <th>OldBalanceOrig</th>
                      <th>NewBalanceOrig</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>NameDest</th>
                      <th>OldBalanceDest</th>
                      <th>NewBalanceDest</th>
                  </tr>
                  <tr>
                      <td>1</td>
                      <td><input type="text" autoFocus required value={this.state.sender} onChange={(e) => this.setSender(e.target.value)} /></td>
                      <td><input type="number" step="any" autoFocus required value={this.state.oldbalancesender} onChange={(e) => this.setOldBalanceSender(e.target.value)} name="oldBalanceSender"/></td>
                      <td><input type="number" step="any" autoFocus required value={this.state.newbalancesender} onChange={(e) => this.setNewBalanceSender(e.target.value)} name ="newBalanceSender" /></td>                      
                      <td width='200px'>
                        <select id="type-transac" name="type" type="text" autoFocus required value={this.state.type} onChange={(e) => this.setType(e.target.value)} >
                          {this.state.typeOptions.map(option => (<option value={option}>{option}</option>))}
                        </select>
                      </td>
                      <td><input type="number" step="any" autoFocus required value={this.state.amount} onChange={(e) => this.setAmount(e.target.value)} name="amount"/></td>
                      <td><input type="text" autoFocus required value={this.state.recipient} onChange={(e) => this.setRecipient(e.target.value)} /></td>
                      <td><input type="number" step="any" autoFocus required value={this.state.oldbalancerecipient} onChange={(e) => this.setOldBalanceRecipient(e.target.value)} name="oldBalanceRecipient"/></td>
                      <td><input type="number" step="any" autoFocus required value={this.state.newbalancerecipient} onChange={(e) => this.setNewBalanceRecipient(e.target.value)} name="newBalanceRecipient"/></td>
                  </tr>
              </table>
                </form>
              </section>
              <section>
                  <div className="section-btn">
                      <button className="btn-general" type="submit" onClick={this.handleSubmit}>Register Transaction</button>
                  </div>
              </section>
            </>
          )}
          </>
        )
    }
}
//export default App;
