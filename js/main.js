/*
    No se contecta aun con el DOM!!!!!! es solo la parte de como funcionaria....
    aun no tengo una idea concreta de a donde quiero dirigir la pagina que se va 
    a construir, por lo tanto decidi realizar algo para ir incluyendo los temas vistos en clase 
    y terminar de concretar la idea proximamente

    por el momento tengo pensado en hacer una logica de inicio de sesion, registro y
    si entra que en una pagina se vayan observando los usuarios pero aun no tengo una idea en concreto
*/

let salir = false;

const listaUsuarios = [
  {
    id: "pepito",
    pass: "pepito2",
    nombres: "pepito",
    apellidos: "perez",
    edad: 17,
    identificacionUsu: 123456,
    genero: "masculino",
  },
];
let user = new Usuario();

do {
  let opc = parseInt(
    prompt(
      "Elija una opcion...\n" +
        "1) Iniciar Sesion\n" +
        "2) Registrarme\n" +
        "3) Ver lista de usurios\n" +
        "9) Salir\n"
    )
  );

  if (opc == 1) {
    alert("Va a iniciar sesion...");
    let idUsuario = prompt("Digite el nombre de usuario....");
    let contraUsuario = prompt("Digite la contraseña...");

    user.iniciarSesion(idUsuario, contraUsuario, ...listaUsuarios);
  }
  if (opc == 2) {
    alert("va a registrarse...");

    let datos = pedirDatosRegistro();
    console.log(datos);
    user.registrarUsuario(
      datos.id,
      datos.pass,
      datos.nombres,
      datos.apellidos,
      datos.identificacionUsu,
      datos.edad,
      datos.genero,
      ...listaUsuarios
    );
  }
  if (opc == 3) {
    user.imprimirListaUsuarios(...listaUsuarios);
  }
  if (opc == 9) {
    salir = true;
  }
} while (salir != 1);

function pedirDatosRegistro() {
  let datos = {};

  let idUsuario = prompt("Digite el nombre de usuario....");
  let contraUsuario = prompt("Digite la contraseña...");
  let nombres = prompt("Digite sus nombres...");
  let apellidos = prompt("Digite sus apellidos...");
  let identificacionUsu = parseInt(prompt("Digita tu identificacion..."));
  let edad = parseInt(prompt("Digita tu edad..."));
  let genero = prompt("Digita tu genero...");

  datos = {
    id: idUsuario,
    pass: contraUsuario,
    nombres: nombres,
    apellidos: apellidos,
    edad: edad,
    identificacionUsu: identificacionUsu,
    genero: genero,
  };
  return datos;
}
