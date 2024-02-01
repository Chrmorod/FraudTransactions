import React from "react";
import './Home.css'
import { SendTransaction } from "../SendTransaction/SendTransaction";
import { GenerateData } from "../GenerateData/GenerateData";
class SendTransactionView extends React.Component{
    render(){
      return (
        <SendTransaction/>
      )
    }
}
class GenerateDataView extends React.Component{
    render(){
      return (
        <GenerateData/>
      )
    }
}
export class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            createTransaction: false,
            sendTransaction: false
        };
    }
    setCreateTransaction = (createTransaction) => {this.setState({createTransaction:createTransaction})}
    setSendTransaction = (sendTransaction) => {this.setState({sendTransaction:sendTransaction})}
    render(){
        return(
            <>
            {this.state.createTransaction ? (
                <SendTransactionView/>
            ):(
                <>
                {this.state.sendTransaction ? (
                    <GenerateDataView/>
                ):(
                    <>
                        <h1>Generator Transactions</h1>
                        <form>
                            <button className="btn-create" onClick={() => this.setCreateTransaction(!this.state.createTransaction)}>Create</button>
                            <button className="btn-send"  onClick={() => this.setSendTransaction(!this.state.sendTransaction)}>Send</button>
                        </form>
                    </>
                )}
                </>
            )
            }
            </>
        )
    }
}