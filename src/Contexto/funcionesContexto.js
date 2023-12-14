export function modificarElementoEnLista(lista, indice, nuevoValor) {
    // Crear una copia de la lista original
    const nuevaLista = [...lista];
    // Modificar el elemento en el índice especificado
    nuevaLista[indice] = nuevoValor;
    // Devolver la nueva lista modificada
    return nuevaLista;
  }
  function verificarIgualesNoNulos(valor1, valor2, valor3) {
    // Verificar que ninguno sea nulo
    if (valor1 !== null && valor2 !== null && valor3 !== null) {
      // Verificar que los tres valores sean iguales
      if (valor1 === valor2 && valor1 === valor3) {
        return true; // Los tres valores no son nulos y son iguales
      }
    }
  
    return false; // Al menos uno es nulo o no son iguales
  }
function colorearElementos(listaDeIdentificadores) {
  listaDeIdentificadores.forEach((identificador) => {
    const elemento = document.getElementById(String(identificador));

    if (elemento) {
      //le doy un border a las casillas
      elemento.style.border = '15px solid #969696'
    }
  });
}
export function quitarBordes() {
  const elementosGrid = document.querySelectorAll('.grid-item');
  elementosGrid.forEach((elemento) => {
    elemento.style.border = 'none';
  });
}
export function todasCasillasMarcadas(arr) {
  return arr.every((elemento) => elemento !== null);
}
export function hayGanador(lista){
  const patronesGanadores = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [3, 4, 5],
    [6, 7, 8],
    [2, 5, 8],
    [2, 4, 6]
  ];
  for (const patron of patronesGanadores){
    const [pos1, pos2, pos3] = patron;
    if(verificarIgualesNoNulos(lista[pos1], lista[pos2], lista[pos3])){
      colorearElementos(patron)
      return lista[pos1];
    }
  }
  return false;
}