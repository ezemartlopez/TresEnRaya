import React, { useEffect, useState } from 'react';
import { modificarElementoEnLista, hayGanador, quitarBordes, todasCasillasMarcadas } from './funciones';
import './grilla.css';
import circulo from './images/circulo.png';
import cruz from './images/cruz.png';

const CRUZ = 'cruz';
const CIRCULO = 'circulo';
const iconoAsignar = (valor) => {
    if(valor === CRUZ) return cruz;
    else return circulo;
};
function GrillaItem({valor, handleClick, index}){
    const clickMe = ()=> { handleClick(index); }
    return (
        <div id={index} className="grid-item container-icon" onClick={clickMe}>
            {valor && <img src={iconoAsignar(valor)} alt="imagen"/>}
        </div> 
    );
}


function Grilla(){
    //Valores de la grilla del juego por default null.
    const [board, setBoard] = useState(Array(9).fill(null));
    //Turno de jugador, por default cruz
    const [jugador, setJugador] = useState(CRUZ);
    //estado para controlar el ganador
    const [ganador, setGanador] = useState(false);
    //estado de empate
    const [empate, setEmpate] = useState(false);
    //Control de cambios de Board
    useEffect(()=>{
        let resultado = hayGanador(board);
        if(resultado){ setGanador(resultado); }
        else if(todasCasillasMarcadas(board)){
            setEmpate(true);
        }
    },[board]);
    //funcion para alternar el jugador
    const siguienteJugador = () => {
        //Devuelve el jugador que debe marcar y cambia al sig
        const auxiliarJugador = jugador;
        if (jugador === CRUZ) setJugador(CIRCULO); 
        else  setJugador(CRUZ);
        return auxiliarJugador;
    };
    //Evento para manejar los clicks
    const clickCasilla = (posicion) => {
        if(board[posicion]===null && !ganador){
            console.log('Click en pocision: ', posicion);
            let cambioGrilla = modificarElementoEnLista(board,posicion, siguienteJugador());
            setBoard(cambioGrilla);
        }
        return
    };
    //Evento que reinicia el tablero y estados
    const reiniciar = () => {
        setBoard(Array(9).fill(null));
        setJugador(CRUZ);
        setGanador(false);
        setEmpate(false);
        quitarBordes();
    };

    return (
        <React.StrictMode>
        <div className="container-game">
            <div className="grid-container">
                {board.map((valor, index) => ( <GrillaItem key={index} index={index} valor={valor} handleClick={clickCasilla} /> ))}
            </div>
            {(!ganador && !empate) && <p className='info-turn-play'> Turno para jugar: {jugador.toUpperCase()} </p>}
            {ganador && <p className='info-winner'>El ganador es: {ganador.toUpperCase()}</p>}
            {empate && <p className='info-winner'>EMPATE</p>}
            {(ganador||empate) && <button className='btn' type='button' onClick={reiniciar}>REINICIAR</button>}
        </div>
        </React.StrictMode>
    );
}
export default Grilla;