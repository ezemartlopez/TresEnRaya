import circulo from './images/circulo.png';
import cruz from './images/cruz.png';
import { createContext, useContext, useEffect, useState } from "react";
import { modificarElementoEnLista, quitarBordes, hayGanador as tenemosGanador, todasCasillasMarcadas } from "./funcionesContexto";
const ContextoGrilla = createContext();

//Funcion para obtener el el valor del contexto (prueba)
export const GetContextoGrilla = () => {
    return useContext(ContextoGrilla);
};

//Componente para obtener Encerrar el contexto
export function ContextoGrillaJuego({children}){
    const [grilla, setGrilla] = useState(Array(9).fill(null));
    const [jugador, setJugador] = useState('cruz');
    const [hayGangador, setHayGanador] = useState(false);
    const [ganador, setGanador] = useState('');
    const [hayEmpate, setHayEmpate] = useState(false);

    useEffect(()=>{
        let resultado = tenemosGanador(grilla);
        if(resultado){
            setTimeout(() => {
                setHayGanador(true);
                setGanador(resultado);
            }, 500);
        }
        if(todasCasillasMarcadas(grilla)){
            setHayEmpate(true);
        }
    },[grilla])


    const modificarJugador = () => {
        const jugadorSig = jugador === 'cruz'? 'circulo': 'cruz';
        setJugador(jugadorSig);
    };
    const obtenerJugador = () => {
        const aux = jugador;
        modificarJugador();
        return aux;
    };
    const modificarPosicionGrilla = (pos) => {
        if(!grilla[pos] && !(hayEmpate || hayGangador)){
           setGrilla(modificarElementoEnLista(grilla, pos, obtenerJugador())); 
        }
    };

    const longitudGrilla = () => { return grilla.length; };
    const getItemIcono = (pos) => { 
        if (grilla[pos]){
            return grilla[pos] === 'cruz'? cruz: circulo;
        } 
        return '';
    };
    const getGanador = ()=>{ return ganador === 'cruz'? cruz: ganador==='circulo'? circulo: ''; };
    const itemUsado = (pos) => { return grilla[pos]!== null;};
    const turnoJugador = () => { return jugador === 'cruz'? cruz: circulo; };
    const tenemosUnGanador = () => {return hayGangador; };
    const tenemosUnEmpate = () => { return hayEmpate; };
    const reiniciarJuego = ()=>{
        quitarBordes();
        setGrilla(Array(9).fill(null));
        setJugador('cruz');
        setHayGanador(false);
        setGanador('');
        setHayEmpate(false);
    };
    /* Controladores del juego */
    const controladorDeJuego = {
        modificarPosicionGrilla,
        longitudGrilla,
        getItemIcono,
        itemUsado,
        turnoJugador,
        getGanador,
        reiniciarJuego,
        tenemosUnGanador,
        tenemosUnEmpate
    }

    return (
        <ContextoGrilla.Provider value={controladorDeJuego}>
            {children}
        </ContextoGrilla.Provider>
    );
}