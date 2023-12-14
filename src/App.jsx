import './App.css';
import Grilla from './Grilla/grilla';
import { ContextoGrillaJuego } from './Contexto/contextoGrilla';
function App() {
  return (
    <div className="App">
      <h1 className='title-game'>Juego Tres en Raya</h1>
      <ContextoGrillaJuego>
        <Grilla></Grilla>
      </ContextoGrillaJuego>
      
    </div>
  );
}

export default App;
