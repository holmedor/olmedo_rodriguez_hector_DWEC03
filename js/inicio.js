"use strict";

console.log("Empieza el programa");

// ------------------- VARIABLES GLOBALES ------------------------

// capturamos el formulario de introduccion de jugador
const formulario = document.querySelector("#formNombre");

// capturamos el contenedor donde mantendremos el chat con el jugador
const contenedorEscribirJugadores = document.getElementById("chat");

var numJugadores = 0; //contador de jugadores en JSON
var arrayJugadores = new Array(); //array de jugadores

var nombre = "";           //nombre del usuario
var password = "";         //password del usuario 
var id = "";
var passwordOK = false;
var url = "views/randomrace.html";//url

// -------------------- CLASE JUGADOR -------------------------------
class Jugador {
  //constructor
  constructor(id, nombre, apellido, usuario, contraseña) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.usuario = usuario;
    this.contraseña = contraseña;
  }
  // metodos
  getJugador() {
    return this.id + " " + this.nombre + " " + this.apellido + " " + this.usuario + " " + this.contraseña;
  }
  getIdJugador() {
    return this.id;
  }
  getNombreJugador() {
    return this.nombre;
  }
  getApellidoJugador() {
    return this.apellido;
  }
  getUsuarioJugador() {
    return this.usuario;
  }
  getContraseñaJugador() {
    return this.contraseña;
  }
}
/*
  función para leer del JSON
*/
function cargarJugadoresJSON() {
  let path = "data/usuarios.json";

  let request = new Request(path, {
    headers: new Headers({
      "Content-Type": "text/json",
    }),
    method: "GET",
  });

  fetch(request).then((response) => {
    response.json().then((data) => {
      console.log("Datos", data);
      aniadirJugadoresInicialesArray(data); //llamo a la función
    });
  });
}
/* 
	función para añadir jugadores al array cuando arranca la pagina web
*/
function aniadirJugadoresInicialesArray(data) {
  //  cargar el fichero JSON, parsearlo a objetos tipo "jugador" y añadirlos al array
  var myJSON = JSON.stringify(data);
  console.log("myJSON: ",myJSON);
  var objetoParseado = JSON.parse(myJSON);
  console.log("objetoParseado: ",objetoParseado);
  for (let i = 0; i < objetoParseado.length; i++) {
    var nuevoJugador = new Jugador(
      objetoParseado[i].id,
      objetoParseado[i].nombre,
      objetoParseado[i].apellido,
      objetoParseado[i].usuario,
      objetoParseado[i].contraseña,
    );
    // añadir el objeto al array
    arrayJugadores.push(nuevoJugador);
  }
  console.log("arrayJugadores: ", arrayJugadores);
}
/* 
	función que al pulsar "ENTRAR" recoge usuario y password y comprueba
*/
function inicio() {
  capturarDatosJugador();
  passwordOK = false;
  //comprobar password sin caracteres especiales
  comprobarPassword(password);
  // comprobar usuario y password en json
  console.log("usuario: " + nombre);
  console.log("password: " + password);
  if (passwordOK == true) {
    if (buscarJugador(nombre, password) == true) {
      document.getElementById("chat").innerHTML =
        "Nombre de usuario y password correctos!!!";
	  alert("Bienvenido al juego randomrace!!!")
      redirigir(url);
    } else {
      document.getElementById("chat").innerHTML = "EL USUARIO NO ESTÁ REGISTRADO"
    }
  }
}
/* 
	función que recoge usuario 
*/
function capturarDatosJugador() {
  // TODO: recoger los el nombre y password del HTML
  nombre = document.getElementById("fnombre").value;
  password = document.getElementById("fpassword").value;
  console.log("Nombre:" + nombre);
  console.log("Password:" + password);
}
/* 
	función que comprueba usuario y password 
*/
function comprobarPassword(password) {
  let error = -1;
  for (let i = password.length; i >= 0; i--) {
    if (
      (password.charCodeAt(i) > 32 && password.charCodeAt(i) < 48) ||
      (password.charCodeAt(i) > 57 && password.charCodeAt(i) < 65) ||
      (password.charCodeAt(i) > 90 && password.charCodeAt(i) < 97) ||
      password.charCodeAt(i) == 123
    ) {
      error = i;
    }
    console.log("caracter " + i + ": " + password.charCodeAt(i));
    console.log("error:" + error);
    console.log("passwordOK:" + passwordOK);
  }
  console.log("===================");
  console.log("error:" + error);
  console.log("passwordOK:" + passwordOK);

  if (error != -1) {
    //		alert("password contiene \""+password[error]+"\". Introduce otra password!!!");
    document.getElementById("fpassword").innerHTML = "";
    document.getElementById("chat").innerHTML =
      'La password contiene "' +
      password[error] +
      '". Introduce otra password!!!';
  } else {
    //		alert("password OK");
    document.getElementById("chat").innerHTML =
      "La password no contiene caracteres especiales";
    passwordOK = true;
  }
}
/* 
	función que busca usuario y password 
*/
function buscarJugador(nombre, password) {
  let encontrado = false;
  arrayJugadores.forEach(function (jugador) {
    if (jugador.usuario == nombre && jugador.contraseña == password) {
      encontrado = true;
    }
  });
  return encontrado;
}
/* 
	función que tras comprobar usuario y password deja acceder al juego
*/
function redirigir(url) {
  window.location.href = url;
}
//
// ------------------- MAIN ------------------------
// cargamos los jugadores cuando empieza el programa y espera a que un usuario acceda
cargarJugadoresJSON(); //carga el fichero JSON
console.log("Jugadores cargados!!!");
console.log(arrayJugadores);
console.log("Acaba el programa");
