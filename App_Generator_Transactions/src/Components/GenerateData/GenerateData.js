import React from "react";
import './GenerateData.css';
export class GenerateData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            generate: "",
            dataForm: []
        };
    }
    setGenerate = (generate) => {
        this.setState({ generate: generate });
    };
      
    handleGenerate = async (event) => {
        event.preventDefault();
        try {
            let TRX_API_URL = this.state.generate
            const response = await fetch(TRX_API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                this.setState({ dataForm: data });
                console.log('Datos extraidos exitosamente');
            } else {
                console.error('Error al intentar extraer los datos');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };
    render(){
        const { dataForm } = this.state;
        return(
            <>
            <h1>Send Transactions</h1>
            <form>
                <input className= "input-url" type="text" autoFocus required value={this.state.generate} onChange={(e) => this.setGenerate(e.target.value)} />
                <button className="btn-generate" type="submit" onClick={this.handleGenerate}>Generate</button>
                <ul>
                    {dataForm.map((elemento, index) => (
                        <li key={index}>
                            <p>Step: {elemento.step}</p>
                            <p>Type: {elemento.type}</p>
                            <p>Amount: {elemento.amount}</p>
                            <p>NameOrig: {elemento.nameOrig}</p>
                            <p>Old Balance Orig: {elemento.oldbalanceOrg}</p>
                            <p>New Balance Orig: {elemento.newbalanceOrig}</p>
                            <p>NameDest: {elemento.nameDest}</p>
                            <p>Old Balance Dest: {elemento.oldbalanceDest}</p>
                            <p>New Balance Dest: {elemento.newbalanceDest}</p>
                            <p>Is Fraud: {elemento.isFraud}</p>
                            <p>Is Flagged Fraud: {elemento.isFlaggedFraud}</p>
                        </li>
                    ))}
                </ul>
            </form>
            </>
        )
    }
}
