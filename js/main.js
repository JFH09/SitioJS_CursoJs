/*
  El sitio web cuando se inicie sesion, y se pase a la vista "infoUsuarios", 
  recomiendo que se tenga cuidado y se revisen las opciones en las que se 
  relacionan la comida, pelicula y licor preferido del usuario,  ya que solo te tienen 100 
  peticiones para algunas apis que se estan usando, asi que a mayor cantidad de usuarios,
  mayor seran las peticiones y puede que de tanto usarla, esas opciones de deshabniliten y ya no funcionen, 
  esto por que se estan usando endpoints gratuitos, y se tiene una cierta cantidad de 
  peticiones.

  De igual manera, los datos obtenidos por las apis, son en cierta manera basicos, asi que para mayor 
  facilidad, y usabilidad del sitio, intentar poner en nuevos registros licores como whiskey, gin, tequila, etc...(licores en los que se podria hacer un coctel), 
  en la parte de comidas, serviria colocando, la comida en ingles, como chicken, salmon, hamburger, etc...
  y puede que en las peliculas no se encuentren, pero salgan algunas que podrian coincidir...

  En el archivo infoUsuarios.js, dejo en la parte de peliculas una segunda opcion para poder hacer las 
  solicitudes por si se llegan a acabar, asi que se tendrian que descomentar y comentar las que estaban usando,
  
  IMPORTANTE: Cada vez que se edite o elimine un usuario, se recargara la pagina, asi que se estaran haciendo 
  multiples solicitudes a las apis, para tener presente, dado el inconveniente con solo las 100 peticiones 
  que se tienen. 

 */
let yaSeCargoLaPaginaAntes;

function cargarPagina() {
  let paginaCargada = localStorage.getItem("paginaCargadaAnteriorMente");

  if (paginaCargada) {
    //Si ya se cargo los datos una anterior vez(true), no se cargan los datos desde fetch sino desde el localStorage
    localStorageDatos();
  } else {
    //Si no se ha cargado(false), es necesario cargar los datos desde la peticion fetch por primera vez
    localStorage.setItem("paginaCargadaAnteriorMente", true);
    fetchDatos();
  }
  buscarUsuLogueado();
}

function buscarUsuLogueado() {
  let datosUsuEncontrados = false;

  const usuarioLogueado = localStorage.getItem("usuarioAutoIni");

  if (usuarioLogueado != null) {
    datosUsuEncontrados = true;
  } else {
    datosUsuEncontrados = false;
  }

  if (datosUsuEncontrados) {
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
    console.log("no se encontro usuario logueado...");
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
  listaUsuarios = datos["listaUsuarios"];
  console.log(listaUsuarios);
  for (let i in datos["listaUsuarios"]) {
    console.log("Se esta almacenando ....", datos["listaUsuarios"][i]);
  }

  localStorage.setItem("listaUsuarios", JSON.stringify(datos["listaUsuarios"]));
}
