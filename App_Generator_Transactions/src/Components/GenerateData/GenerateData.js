import React from "react";
import { Home } from "../Home/Home";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './GenerateData.css';
const TRX_API_URL_POST = process.env.REACT_APP_API_URL;
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
            home: false,
            isPlaying: false,
            isStopped: true,
            activeButton: null
        };
        this.play = this.play.bind(this);
        this.stop = this.stop.bind(this);
    }
    setGenerate = (generate) => {
        this.setState({ generate: generate });
    };  
    //handleGenerate = async (event) => {
    //    event.preventDefault();
    //<button className="btn-general" type="submit" onClick={this.handleGenerate}>Generate</button>
    async play() {
        this.setState({ activeButton: 'play', isPlaying: true, isStopped: false });
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
                            newBalanceDest: elemento.newBalanceDest
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
                        console.error('Error en la solicitud POST:', error);
                    }
                }));
            } else {
                console.error('Error al intentar extraer los datos');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
        this.setState({ isPlaying: false, isStopped: true });
    };
    setgoback = (setgoback) => {this.setState({home:setgoback})}
    stop() {this.setState({ activeButton: 'stop', isPlaying: false, isStopped: true });}
    render(){
        const { dataForm } = this.state;
        return(
                <>
                {this.state.home ? (
                    <HomeView/>
                ):(
                    <>
                    <h1>Send Transactions</h1>
                    <button className = "btn-back" onClick={this.setgoback}><FontAwesomeIcon icon={faChevronLeft}/></button>
                    <form>
                        <div className="url-input">
                            <label className="lbl-url">URL Transactions: </label>
                            <input className= "input-url" type="text" autoFocus required value={this.state.generate} onChange={(e) => this.setGenerate(e.target.value)}/>
                        </div>
                        <button className={`btn-playButton${this.state.activeButton === 'play' ? ' active' : ''}`} onClick={this.play} disabled={!this.state.isStopped}><FontAwesomeIcon icon={faPlay} /></button>
                        <button className={`btn-stopButton${this.state.activeButton === 'stop' ? ' active' : ''}`} onClick={this.stop} disabled={!this.state.isPlaying}><FontAwesomeIcon icon={faStop} /></button>
                    </form>
                    </>
                )
                }
                </>
            )
        }
}
