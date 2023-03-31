/*
     se contecta aun con el DOM, las opciones que aparecen en el alert son las que aun no se 
     han desarrollado por completo o estan en construcción

     el login se puede realizar, el registro tambien

     en el login si hacen el check de recordar los datos, se guardan los datos en el 
     local storage y la proxima vez que accedas al login se iniciara sesion automaticamente 
     y te redireccionara a la pagina donde se encontraran la información de todos los usuarios

     la pagina en mencion aun no esta desarrollada, la idea es que con la información que se brinda en 
     el formulario, se ,uestre la lista total de los usuarios en donde 
     para cada usuario se le recomienden ya sea alguna comida, se le diga donde poder ver la pelicula 
     que ingreso, puede que se me ocurra otra idea con la info que se tiene, esta parte se realizara con 
     peticiones fetch a una api... y de igual forma, el ideal es que se pueda eliminar o editar cualquier usuario 
     de la lista.


*/
let respuesta = "";
function buscarUsuLogueado() {
  fetchDatos();
  let datosUsuEncontrados = false;
  alert("buscando usu logeado!!!");
  const usuarioLogueado = localStorage.getItem("usuarioAutoIni");
  alert(usuarioLogueado);
  if (usuarioLogueado != null) {
    datosUsuEncontrados = true;
  } else {
    datosUsuEncontrados = false;
  }

  if (datosUsuEncontrados) {
    alert("Se encontraron datos..." + JSON.parse(usuarioLogueado));
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
    alert("no se encontro usuario logueado...");
    do {
      console.log("respuesta", respuesta);
      let opc = parseInt(
        prompt(
          "Elija una opcion...\n" +
            "3) VER LISTA USUARIOS !!!!! \n" +
            "4) intento con fetch (EN CONSTRUCCIÓN)\n" + //sE TIENE PENSADO MANEJAR LOS DATOS POR ESTE MEDIO
            "9) Salir\n"
        )
      );

      if (opc == 3) {
        user.imprimirListaUsuarios(...listaUsuarios);
      }
      if (opc == 4) {
        alert("peticion fetch...");
        alert(fetchDatos());
        console.log("se pidieron los datos...");

        respuesta = fetch("./json/datos.json")
          .then((response) => response.json())
          .then((data) => console.log(data));
        alert(respuesta);
      }
      if (opc == 9) {
        salir = true;
      }
    } while (salir != 1);
  }
  console.log(respuesta);
}

let salir = false;

let listaUsuarios = "";

let user = new Usuario();
let recordarDatos = false;
/*Botones */
const btnRegistrarme = document.querySelector("#btnRegistrarme");
const btnEntrar = document.querySelector("#btnIniciarSesion");
const btnRecorarDatos = document.getElementById("recordarDatos");

btnEntrar.addEventListener("click", () => {
  const emailLogin = document.getElementById("emailLogin").value;
  const passLogin = document.getElementById("passLogin").value;

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

  listaUsuarios.push({
    id: datos.id,
    pass: datos.pass,
    nombres: datos.nombres,
    apellidos: datos.apellidos,
    edad: parseInt(datos.edad),
    email: datos.email,
    pelicula: datos.pelicula,
    comida: datos.comida,
    alcohol: datos.alcohol,
    img: datos.img,
  });
  Swal.fire({
    title: "Se registro exitosamente el usuario!",
    text: " :)",
    icon: "success",
    confirmButtonText: "ok",
  });
  console.log(listaUsuarios);
  localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));

  //Estoy implementando una forma para que se pueda modificar el json y dejar de manejar los datos de los usuarios desde el localStorage...
  /*fetch("./json/datos.json", {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));*/

  vaciarCampos();
  //  user.registrarUsuario(datos, ...listaUsuarios);
});

function pedirDatosRegistro() {
  let datos = {};

  const nombres = document.getElementById("nombres").value;
  const apellidos = document.getElementById("apellidos").value;
  // const fotoPerfil FALRA AVERIGUAR COMO CAPTURAR LA IMAGEN....
  const edad = document.getElementById("edad").value;
  const alcohol = document.getElementById("alcohol").value;
  const pelicula = document.getElementById("pelicula").value;
  const comida = document.getElementById("comida").value;
  const email = document.getElementById("email").value;
  const pass = document.getElementById("contra").value;
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

function vaciarCampos() {
  document.getElementById("nombres").value = "";
  document.getElementById("apellidos").value = "";
  // const fotoPerfil FALRA AVERIGUAR COMO CAPTURAR LA IMAGEN....
  document.getElementById("edad").value = "";
  document.getElementById("alcohol").value = "";
  document.getElementById("pelicula").value = "";
  document.getElementById("comida").value = "";
  document.getElementById("email").value = "";
  document.getElementById("contra").value = "";
}

async function fetchDatos() {
  let respuesta = fetch("./json/datos.json")
    .then((response) => response.json())
    .then((data) => {
      for (let i in data) {
        console.log(data[i]);
        listaUsuarios = data[i];
      }
    });

  return respuesta;
}
