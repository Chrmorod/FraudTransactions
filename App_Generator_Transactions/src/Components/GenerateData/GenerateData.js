import React from "react";
import { Home } from "../Home/Home";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './GenerateData.css';
import logoTransaction from '../../Images/transaction.svg';
import AbortController from "abort-controller"
import moment from 'moment-timezone';

const TRX_API_URL_POST = process.env.REACT_APP_API_URL;

class HomeView extends React.Component {
    render() {
        return (
            <Home />
        );
    }
}

export class GenerateData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            generate: "",
            dataForm: [],
            home: false,
            isPlayStop: true,
            activeButton: null,
            currentPage: 15, // Pages data
            totalPages: null, // Total number pages
            controller: new AbortController(),
            counter: 0
        };
    }
    setGenerate = (generate) => {
        this.setState({ generate: generate });
    };

    playOrStop = async () => {
        const { isPlayStop, currentPage, controller } = this.state;
        this.setState({ isPlayStop: !isPlayStop }); // Changes state button isPlayStop
        const signal = controller.signal;

        if (isPlayStop) {
            try {
                let TRX_API_URL = this.state.generate + `?page=${currentPage}`;
                const response = await fetch(TRX_API_URL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    signal
                });

                if (response.ok) {
                    const responseData = await response.json();
                    console.log('Datos extraidos exitosamente', responseData.length);

                    if (responseData.length > 0) {
                        await this.processData(responseData); // Procedure data if response
                    } else {
                        console.error('La respuesta de la solicitud GET no contiene datos.');
                    }
                } else {
                    console.error('Error al intentar extraer los datos');
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        } else {
            console.log('Detención de la petición GET y POST');
            console.log('Contador:', this.state.counter);
            const counter = 0;
            this.setState({ counter });
            if (controller.signal.aborted) {
                controller.abort(); // Abort request GET and POST if touch button
            }
        }
    };
    
    processData = async (responseData) => {
        try {
            if (Array.isArray(responseData)) {
                for (let i = 0; i < responseData.length; i++) {
                    if (this.state.isPlayStop) return; // Verify stop procedure
                    const elemento = responseData[i];
                    try {
                        const postData = {
                            id : elemento.id,
                            step: elemento.step,
                            type: elemento.type,
                            amount: elemento.amount,
                            nameOrig: elemento.nameOrig,
                            nameDest: elemento.nameDest,
                            oldBalanceOrg: elemento.oldBalanceOrg,
                            newBalanceOrig: elemento.newBalanceOrig,
                            oldBalanceDest: elemento.oldBalanceDest,
                            newBalanceDest: elemento.newBalanceDest
                        };
                        //
                        const counter = this.state.counter + 1;
                        this.setState({ counter });
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
                        console.error('Error en la solicitud POST:', error);
                    }
                }
            } else {
                console.error('La respuesta de la solicitud GET no es una matriz.');
            }
        } catch (error) {
            console.error('Error al procesar datos:', error);
        }
    };

    setGoBack = () => {
        this.setState({ home: true });
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
                          <h1>Auto-Generate & Send</h1>
                        </div>
                        <button className="btn-back" onClick={this.setGoBack}><FontAwesomeIcon icon={faChevronLeft} /></button>
                        <div className="url-input">
                            <label className="lbl-url">URL Transactions: </label>
                            <input className="input-url" type="text" autoFocus required value={this.state.generate} onChange={(e) => this.setGenerate(e.target.value)} />
                            <button className={`btn-play${!this.state.isPlayStop ? ' pressed' : ' active'}`} onClick={this.playOrStop}>
                                <FontAwesomeIcon icon={this.state.isPlayStop ? faPlay : faStop} />
                            </button>
                        </div>
                    </>
                )}
            </>
        );
    }
}
