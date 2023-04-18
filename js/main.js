/* Como se esta cambiando el manejo de datos de localStorage a json 
  si se registra un nuevo usuario, no se evidenciara en la lista, vista infoUsuarios,
  pero se puede evidenciar en el localStorage como se estaba manejando, esto por que se quiere
  manejar como bd y realizar peticiones fetch para editar, crear y eliminar los datos de 
  usuarios.
  por eso mismo, por el momento, para la funcionalidad de guardar información, solo
  servira con los usuarios que esten quemados en el json, no con los que se creen, pero 
  como digo, si se crean usuarios, se guardaran en el localStorage por que se estaba manejando de esa
  manera...
*/
let yaSeCargoLaPaginaAntes;

function cargarPagina() {
  let paginaCargada = localStorage.getItem("paginaCargadaAnteriorMente");

  if (paginaCargada) {
    //Si ya se cargo los datos una anterior vez(true), no se cargan los datos desde fetch sino desde el localStorage
    localStorageDatos();
  } else {
    //Si no se ha cargado(false), es necesario cargar los datos desde la peticion fetch
    localStorage.setItem("paginaCargadaAnteriorMente", true);
    fetchDatos();
  }
  buscarUsuLogueado();
}

function buscarUsuLogueado() {
  let datosUsuEncontrados = false;
  //alert("buscando usu logeado!!!");
  console.log("buscando Usu Logueado...");
  const usuarioLogueado = localStorage.getItem("usuarioAutoIni");
  //alert(usuarioLogueado);
  console.log(usuarioLogueado);
  if (usuarioLogueado != null) {
    datosUsuEncontrados = true;
  } else {
    datosUsuEncontrados = false;
  }

  if (datosUsuEncontrados) {
    // alert("Se encontraron datos..." + JSON.parse(usuarioLogueado));
    console.log("Se encontraron datos..." + JSON.parse(usuarioLogueado));
    Swal.fire({
      title: "Se Inicio Sesion con datos almacenados!",
      text: "Bienvenido " + usuarioLogueado,
      icon: "success",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "../pages/infoUsuarios.html";
      }
    });
  } else {
    //alert("no se encontro usuario logueado...");
    console.log("no se encontro usuario logueado...");
    //almacenarDatosLocalStorage();
  }
}

let salir = false;

let datos = "";
let listaUsuarios;
let user = new Usuario();
let recordarDatos = false;
/*Botones */
const btnRegistrarme = document.querySelector("#btnRegistrarme");
const btnEntrar = document.querySelector("#btnIniciarSesion");
const btnRecorarDatos = document.getElementById("recordarDatos");
const terminos = document.getElementById("terminos");

btnEntrar.addEventListener("click", () => {
  const emailLogin = document.getElementById("emailLogin").value;
  const passLogin = document.getElementById("passLogin").value;
  listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios"));
  console.log("mandando..." + email + "-" + passLogin + "---" + recordarDatos);
  user.iniciarSesion(emailLogin, passLogin, recordarDatos, ...listaUsuarios);
});

btnRecorarDatos.addEventListener("click", () => {
  if (btnRecorarDatos.checked) {
    recordarDatos = true;
    Swal.fire({
      title: "Se guardaran tus datos!",
      text: "La proxima vez que ingreses se iniciara sesion automaticamente :)",
      icon: "info",
      confirmButtonText: "Cool",
    });
  } else {
    recordarDatos = false;
    Swal.fire({
      title: "No se guardaran tus datos!",
      text: "Tus datos no quedaran registrados :)",
      icon: "info",
      confirmButtonText: "De acuerdo",
    });
  }
});

btnRegistrarme.addEventListener("click", () => {
  let datos = pedirDatosRegistro();
  console.log(datos);
  user.registrarUsuario(datos, ...listaUsuarios);
  vaciarCampos();
});

let terminosCond;
terminos.addEventListener("click", () => {
  if (terminos.checked) {
    terminosCond = true;
    Swal.fire({
      title: "Se cuidaran tus datos!",
      text: "La proxima vez que ingreses se iniciara sesion automaticamente :)",
      icon: "info",
      confirmButtonText: "Cool",
    });
  } else {
    terminosCond = false;
    Swal.fire({
      title: "Si no aceptas los terminos y condiciones no puedes avanzar!",
      text: ":)",
      icon: "info",
      confirmButtonText: "De acuerdo",
    });
  }
});
function pedirDatosRegistro() {
  let datos = {};

  const nombres = document.getElementById("nombres").value;
  const apellidos = document.getElementById("apellidos").value;
  const edad = document.getElementById("edad").value;
  const alcohol = document.getElementById("alcohol").value;
  const pelicula = document.getElementById("pelicula").value;
  const comida = document.getElementById("comida").value;
  const email = document.getElementById("email").value;
  const pass = document.getElementById("contra").value;

  console.log("tinee may", terminos);
  let numerosPass = false;
  let letraPass = false;

  if (edad < 18) {
    console.log(edad, "menor!!!");
    Swal.fire({
      title: "Eres menor de 18",
      text: "No puedes acceder a la aplicación, vuelve cuando cumplas 18 :) ",
      icon: "warning",
      confirmButtonText: "Cool",
    });
  } else if (!validarContra(pass)) {
    Swal.fire({
      title: "Condiciones clave!!!",
      text: "La contraseña debe tener mas de 8 caracteres, una mayuscula, un caracter especial y un número :) ",
      icon: "warning",
      confirmButtonText: "Cool",
    });
  } else if (
    nombres == "" ||
    apellidos == "" ||
    edad == "" ||
    alcohol == "" ||
    pelicula == "" ||
    comida == "" ||
    email == "" ||
    pass == ""
  ) {
    Swal.fire({
      title: "No puedes dejar campos vacios!!!",
      text: "Por favor llena todos los campos :) ",
      icon: "warning",
      confirmButtonText: "Cool",
    });
  } else if (!terminosCond) {
    Swal.fire({
      title: "Debes aceptar los terminos y condiciones !!!",
      text: " :) ",
      icon: "warning",
      confirmButtonText: "Cool",
    });
  } else if (!email.includes("@")) {
    Swal.fire({
      title: "Debes ingresar un dominio !!!",
      text: "gmail / hotmail / outlook / icloud / yahoo :) ",
      icon: "warning",
      confirmButtonText: "Cool",
    });
  } else {
    datos = {
      id: nombres + edad,
      pass: pass,
      nombres: nombres,
      apellidos: apellidos,
      edad: edad,
      email: email,
      pelicula: pelicula,
      comida: comida,
      alcohol: alcohol,
      img: "https://cdn-icons-png.flaticon.com/512/6073/6073874.png",
    };
    return datos;
  }
}

function validarContra(pass) {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(pass);
}
function vaciarCampos() {
  document.getElementById("nombres").value = "";
  document.getElementById("apellidos").value = "";
  document.getElementById("edad").value = "";
  document.getElementById("alcohol").value = "";
  document.getElementById("pelicula").value = "";
  document.getElementById("comida").value = "";
  document.getElementById("email").value = "";
  document.getElementById("contra").value = "";
}

function fetchDatos() {
  fetch("https://jfh09.github.io/JSON_API_DB_SITIO_JS/datos.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      datos = data;
    })
    .then(() => {
      almacenarDatosLocalStorage();
    });
}

function localStorageDatos() {
  console.log(
    "Se obtienen los datos desde el local storage ya que ya se cargaron los datos antes..."
  );
  listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios"));
  console.log(listaUsuarios);
  for (let i in listaUsuarios) {
    console.log("Se esta almacenando ....", listaUsuarios[i]);
  }
}

function almacenarDatosLocalStorage() {
  console.log("Se esta almacenando ....", typeof datos["listaUsuarios"]);
  console.log("Se esta almacenando ....", datos["listaUsuarios"]);
  listaUsuarios = datos["listaUsuarios"];
  console.log(listaUsuarios);
  for (let i in datos["listaUsuarios"]) {
    console.log("Se esta almacenando ....", datos["listaUsuarios"][i]);
  }

  localStorage.setItem("listaUsuarios", JSON.stringify(datos["listaUsuarios"]));
}
