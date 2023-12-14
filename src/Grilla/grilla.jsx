import React from 'react';
//import { modificarElementoEnLista, hayGanador, quitarBordes, todasCasillasMarcadas } from './funciones';
import './grilla.css';
import { GetContextoGrilla } from '../Contexto/contextoGrilla';
import Card from './Card/CardMesagge';
import ReactIf from './ReactIf/ReactIf';

function GrillaItem({pos}){
    const {modificarPosicionGrilla, itemUsado, getItemIcono} = GetContextoGrilla();
    const clickItem = () => {
        modificarPosicionGrilla(pos);
    };
    return (
        <div id={pos} className="grid-item container-icon" onClick={clickItem}>
            {itemUsado(pos) && <img src={getItemIcono(pos)} alt="imagen_icono" />}
        </div> 
    );
}

function Grilla(){
    const {longitudGrilla, turnoJugador, tenemosUnGanador, tenemosUnEmpate, getGanador, reiniciarJuego} = GetContextoGrilla();
    let items = [];
    for (let index = 0; index < longitudGrilla(); index++) { items.push(<GrillaItem key={index} pos={index}/>); }

    return (
        <React.StrictMode>
            <div className="container-game">
                <div className="grid-container">
                    {items}
                </div>
                <div className="container-player">
                    <p className='info-turn-play'>Turno Jugador</p>
                    <div className="container-img">
                       <img src={turnoJugador()} alt="jugador" className="customImg"/> 
                    </div>
                    <ReactIf state={tenemosUnGanador()}>
                        <Card>
                            <p className='info-winner'>EL GANADOR ES</p>
                            <div className="container-winner">
                               <img src={getGanador()} alt="icono_ganador" className='custom-img'/> 
                            </div>
                            <button className="w3-button w3-indigo w3-round-large" onClick={reiniciarJuego}>REINICIAR JUEGO</button>
                        </Card>
                    </ReactIf>
                    <ReactIf state={tenemosUnEmpate()}>
                        <Card>
                            <p className='info-winner'>EMPATE !!</p>
                            <button className="w3-button w3-indigo w3-round-large" onClick={reiniciarJuego}>REINICIAR JUEGO</button>
                        </Card>
                    </ReactIf>                   
                </div>

            </div>
        </React.StrictMode>
    );
}
export default Grilla;