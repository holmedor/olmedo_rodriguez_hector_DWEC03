// ------------------- VARIABLES GLOBALES ------------------------

// capturamos el contenedor donde mantendremos el chat con el jugador
const contenedorEscribirJugadores = document.getElementById("chat");
var url = "randomrace.html";//url
var x1 = 0, y1 = 0, pos1 = 0;//coordenadas de jugador y posición en el array del circuito
var x2 = 0, y2 = 0; pos2 = 0;//coordenadas de ordenador y posición en el array del circuito
var tiradas1=[];//tiradas del jugador
var tiradas2=[];//tiradas del ordenador
var tirada1=0;//contador de tiradas del jugador
var tirada2=0;//contador de tiradas del ordenador
var celdascircuito1 = []; //array para almacenar las coordenadas de las celdas del circuito 1
var celdascircuito2 = []; //array para almacenar las coordenadas de las celdas del circuito 2
var tam1 = 0, tam2 = 0; //variables con el tamaño de cada circuito (numero de celdas)
var colorTecla = "whitesmoke";
var colorMargen = "black";
var colorCoche1 = "#5B7721";
var colorCoche2 = "#91CD72";
/*
   función que define el tablero y recoge el circuito del jugador
*/
function pintaCircuito1() {
  const numRows = 20;
  const numCols = 20;
  const table = $("#tablero");

  for (let i = 0; i < numRows; i++) {
    const row = $("<tr></tr>");
    for (let j = 0; j < numCols; j++) {
      const cell = $("<td></td>");
      cell.click(function () {         // Añade un click event listener a cada celda
        if (cell.css("background-color") === colorTecla) {
          cell.css("background-color", "");
        } else {
          cell.css("background-color", colorCoche1);
        } // Cambia el color de fondo de cada celda seleccionada
        const coordenadas1 = { row: i, col: j }; //almacena las coordenadas de la celda seleccionada
        celdascircuito1.push(coordenadas1);
        console.log("Seleccionada celda de coordenadas:", coordenadas1);
      });
      row.append(cell);
    }
    table.append(row);
  }
  console.log("Se ha pintado el tablero, hay que dibujar el circuito!!!")
  $("#getcoordenadas1").click(function () { //guarda las coordenadas de las celdas del circuito 
    console.log("Circuito 1 creado, sus coordenadas son: ", celdascircuito1);
    pintaCircuito2debajo();
  });
}
/*
   función que en base al circuito dibujado, pinta otro una fila debajo
*/
function pintaCircuito2debajo() { 
  for (let i = 0; i < celdascircuito1.length; i++) {
    console.log("Celda ", i, ": ", celdascircuito1[i]);
    let x = celdascircuito1[i]['row'] + 1;
    let y = celdascircuito1[i]['col'];
    celdascircuito2[i] = { row: x, col: y };
    console.log("Celda debajo", i, ": ", x, y);
    console.log("Celda debajo", i, ": ", celdascircuito2[i]);
    let referencia = "table tr:eq(" + x + ") td:eq(" + y + ")";
    $(referencia).css("background-color", colorCoche2);
  }
  salidaCoches();
}
/*
   función que coloca los coches en la casilla de salida de cada circuito
*/
function salidaCoches() {
  let x1 = celdascircuito1[0]['row'];
  let y1 = celdascircuito1[0]['col'];
  console.log("Celda salida coche 1:", x1, ":", y1);
  let referencia1 = "table tr:eq(" + x1 + ") td:eq(" + y1 + ")";
  $(referencia1).css("border-radius", "50%");
  let x2 = celdascircuito2[0]['row'];
  let y2 = celdascircuito2[0]['col'];
  console.log("Celda salida coche 2:", x2, ":", y2);
  let referencia2 = "table tr:eq(" + x2 + ") td:eq(" + y2 + ")";
  $(referencia2).css("border-radius", "50%");
  console.log("COCHES EN SUS PUESTOS!!!");
  escribeChat("COCHES EN SUS PUESTOS!!! Pulsa el botón DADO");
  tam1 = celdascircuito1.length;
  tam2 = celdascircuito2.length;
  pos1 = 0;
  posant1 = 0;
  pos2 = 0;
  posant2 = 0;
}
/*
  función que mueve el coche 1
*/
function rollCoche1() {
  console.log("Tu posicion :" + pos1 + ".");
  console.log("Tu ubicación es: ", celdascircuito1[pos1]);
  posant1 = pos1;
  var d1 = Math.floor(Math.random() * 6) + 1;
  tiradas1[tirada1]=d1;
  tirada1=tirada1+1;
  escribeDado1("TIRADAS JUGADOR: "+tiradas1);
  pos1 = pos1 + d1;
  if (pos1 >= tam1) {
    console.log("El juego ha terminado: HAS GANADO!!!");
    escribeChat("El juego ha terminado: HAS GANADO!!! <br>Pulsa REINICIO para otra partida");
    mueveCoche1();
  } else {
    console.log("Muevo el coche 1 hasta " + pos1);
    mueveCoche1();
    rollCoche2();
  }
}
/*
  función que mueve el coche 2
*/
function rollCoche2() {
  console.log("La posicion del ordenador es " + pos2 + ".");
  console.log("La ubicación del ordenador es: ", celdascircuito2[pos2]);
  posant2 = pos2;
  var d2 = Math.floor(Math.random() * 6) + 1;
  tiradas2[tirada2]=d2;
  tirada2=tirada2+1;
  escribeDado2("TIRADAS ORDENADOR: "+tiradas2);
  pos2 = pos2 + d2;
  if (pos2 >= tam2) {
    console.log("El juego ha terminado: HAS PERDIDO!!!");
    escribeChat("El juego ha terminado: HAS PERDIDO!!! <br>Pulsa REINICIO para otra partida");
  } else {
    console.log("Muevo el coche 2 hasta " + pos2);
  }
  mueveCoche2();
}
function mueveCoche1() { //función que borra y pinta el coche 1 emulando su movimiento
  x = celdascircuito1[posant1]['row'];
  y = celdascircuito1[posant1]['col'];
  let referenciaant1 = "table tr:eq(" + x + ") td:eq(" + y + ")";
  $(referenciaant1).css("border-radius", "0");
  x = celdascircuito1[pos1]['row'];
  y = celdascircuito1[pos1]['col'];
  let referencia1 = "table tr:eq(" + x + ") td:eq(" + y + ")";
  $(referencia1).css("border-radius", "50%");
}
function mueveCoche2() { //función que borra y pinta el coche 2 emulando su movimiento
  x = celdascircuito2[posant2]['row'];
  y = celdascircuito2[posant2]['col'];
  let referenciaant2 = "table tr:eq(" + x + ") td:eq(" + y + ")";
  $(referenciaant2).css("border-radius", "0");
  x = celdascircuito2[pos2]['row'];
  y = celdascircuito2[pos2]['col'];
  let referencia2 = "table tr:eq(" + x + ") td:eq(" + y + ")";
  $(referencia2).css("border-radius", "50%");
  escribeChat("Pulsa el botón DADO!!!");
}
/*
  función que escribe en el chat
*/
function escribeChat(data){
  document.getElementById("chat").innerHTML = data;
}
/*
  función que pinta la salida del dado1
*/
function escribeDado1(data){
  document.getElementById("dado1").innerHTML = data;
}
/*
  función que pinta la salida del dado2
*/
function escribeDado2(data){
  document.getElementById("dado2").innerHTML = data;
}
/*
  función que reinicia el juego
*/
function redirigir(url) {
  window.location.href = url;
}
// ------------------- MAIN ------------------------
// se pinta el tablero y se espera a que se pinte el circuito
$(document).ready(pintaCircuito1);
