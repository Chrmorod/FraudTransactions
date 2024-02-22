import React from "react";
import { Home } from "../Home/Home";
import './GenerateData.css';
class HomeView extends React.Component{
    render(){
      return (
        <Home/>
      )
    }
}
export class GenerateData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            generate: "",
            dataForm: [],
            home: false
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
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Datos extraidos exitosamente');
                 // Metodo Post con los datos obtenidos
                 await Promise.all(data.map(async (elemento) => {
                    try {
                        const postData = {
                            step: elemento.step,
                            type: elemento.type,
                            amount: elemento.amount,
                            nameOrig: elemento.nameOrig,
                            oldBalanceOrg: elemento.oldBalanceOrg,
                            newBalanceOrig: elemento.newBalanceOrig,
                            nameDest: elemento.nameDest,
                            oldBalanceDest: elemento.oldBalanceDest,
                            newBalanceDest: elemento.newBalanceDest,
                            isFraud: elemento.isFraud
                        };
                        const POST_URL = 'http://localhost:8080/bank/transactions'; // Cambia esto a la dirección real
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
                        console.error('Error en la solicitud POST:', error);
                    }
                }));
            } else {
                console.error('Error al intentar extraer los datos');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };
    setgoback = (setgoback) => {this.setState({home:setgoback})}
    render(){
        const { dataForm } = this.state;
        return(
                <>
                {this.state.home ? (
                    <HomeView/>
                ):(
                    <>
                    <h1>Send Transactions</h1>
                    <button className = "btn-back" onClick={this.setgoback}>Back</button>
                    <form>
                        <input className= "input-url" type="text" autoFocus required value={this.state.generate} onChange={(e) => this.setGenerate(e.target.value)} />
                        <button className="btn-general" type="submit" onClick={this.handleGenerate}>Generate</button>
                    </form>
                    </>
                )
                }
                </>
            )
        }
}
