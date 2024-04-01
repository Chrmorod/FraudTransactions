import React from "react";
import './Home.css'
import logoTransaction from '../../Images/transaction.svg';
import { SendTransaction } from "../SendTransaction/SendTransaction";
import { GenerateData } from "../GenerateData/GenerateData";
import { ShowDashBoard } from "../ShowDashBoard/ShowDashBoard";
class SendTransactionView extends React.Component {
    render() {
        return (
            <SendTransaction />
        )
    }
}
class GenerateDataView extends React.Component {
    render() {
        return (
            <GenerateData />
        )
    }
}
class ShowDashBoardView extends React.Component {
    render() {
        return (
            <ShowDashBoard />
        )
    }
}
export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createTransaction: false,
            sendTransaction: false,
            showDashboard: false
        };
    }
    setCreateTransaction = (createTransaction) => { this.setState({ createTransaction: createTransaction }) }
    setSendTransaction = (sendTransaction) => { this.setState({ sendTransaction: sendTransaction }) }
    setShowDashboard = (showDashboard) => { this.setState({ showDashboard: showDashboard }) }
    render() {
        return (
            <>
                {this.state.createTransaction ? (
                    <SendTransactionView />
                ) : (
                    <>
                        {this.state.sendTransaction ? (
                            <GenerateDataView />
                        ) : (
                            <>
                                {this.state.showDashboard ? (
                                    <ShowDashBoardView/>
                                ) : (
                                    <>
                                        <div className="myheader">
                                            <img className="logo-style" src={logoTransaction}/>
                                            <h1>TransactLaunch</h1>
                                        </div>
                                        <form>
                                            <button className="btn-create" onClick={() => this.setCreateTransaction(!this.state.createTransaction)}>Manual Entry</button>
                                            <button className="btn-send" onClick={() => this.setSendTransaction(!this.state.sendTransaction)}>Auto-Generate & Send</button>
                                            <button className="btn-dashboard" onClick={() => this.setShowDashboard(!this.state.showDashboard)}>Dashboard</button>

                                        </form>
                                    </>
                                )}
                            </>
                        )}
                    </>
                )
                }
            </>
        )
    }
}