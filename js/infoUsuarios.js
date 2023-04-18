const btnCerrarSesion = document.getElementById("cerrarSesion");
const btnEditar = document.getElementById("editar");
btnCerrarSesion.addEventListener("click", () => {
  cerrarSesion();
});

let listaUsuarios = localStorage.getItem("listaUsuarios");

function mostrarInfoUsuarios() {
  console.log(listaUsuarios);
  let usuarios = JSON.parse(listaUsuarios);
  console.log(usuarios.length);

  const seccionUsuarios = document.getElementById("seccionUsuarios");

  for (let i = 0; i < usuarios.length; i++) {
    let card = document.createElement("div");
    card.className = "cardUsuario";
    card.innerHTML = `
  <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src=${
          usuarios[i].img
        }  class="img-fluid rounded-start" style="padding-top: 15px;" alt="imagen-Usuario">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title"> ${
            usuarios[i].id
          }<span><ion-icon name="create-outline" onclick="editarUsuario(
            'id',
            ${usuarios.indexOf(usuarios[i])} 
            )"></ion-icon></span></h5>
          <h6 class="card-text"> ${
            usuarios[i].nombres
          }<span><ion-icon name="create-outline" onclick="editarUsuario(
              'nombres',
              ${usuarios.indexOf(usuarios[i])} 
              )"></ion-icon></span> ${
                " " + usuarios[i].apellidos
              } <span><ion-icon name="create-outline" onclick="editarUsuario(
                'apellidos',
                ${usuarios.indexOf(usuarios[i])} 
                )"></ion-icon></span>
          </h6>
          <p class="card-text"> ${
            usuarios[i].edad
          }<span><ion-icon name="create-outline" onclick="editarUsuario(
            'edad',
            ${usuarios.indexOf(usuarios[i])} 
            )"></ion-icon></span></p>
          <p class="card-text">${
            usuarios[i].comida
          }<span><ion-icon name="create-outline" onclick="editarUsuario(
            'comida',
            ${usuarios.indexOf(usuarios[i])} 
            )"></ion-icon></span></p>
          <p class="card-text">${
            usuarios[i].pelicula
          }<span><ion-icon name="create-outline" onclick="editarUsuario(
            'pelicula',
            ${usuarios.indexOf(usuarios[i])} 
            )"></ion-icon></span></p>
          <p class="card-text">${
            usuarios[i].alcohol
          }<span><ion-icon name="create-outline" onclick="editarUsuario(
            'alcohol',
            ${usuarios.indexOf(usuarios[i])} 
            )"></ion-icon></span></p>
          <p class="card-text"><small class="text-body-secondary">${
            usuarios[i].email
          }</small><span><ion-icon name="create-outline" onclick="editarUsuario(
            'email',
            ${usuarios.indexOf(usuarios[i])} 
            )"></ion-icon></span></p>
          
          <a href="#" class="btn btn-danger" onclick="eliminarUsuario(
            ${usuarios.indexOf(usuarios[i])}
            )">Eliminar</a>
          </div>
      </div>
      <div class="relacionInfo">
        <div class="mostrarInfoRelacion">
          <a class="btn btn-outline-secondary botonInfo" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Como hacer tu comida favorita?</a>
          <button class="btn btn-outline-secondary botonInfo" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Donde ver pelicula favorita?</button>
          <button class="btn btn-outline-secondary botonInfo" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample3" aria-expanded="false" aria-controls="multiCollapseExample3">Que coctel te podria gustar?</button>
        <!--  <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse" data-bs-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">Toggle both elements</button>-->
        </div>
        <div class="row">

            <div class="collapse multi-collapse" id="multiCollapseExample1">
              <div class="card card-body bg-primary-subtle id="comidaContainer"">
                Te puede interesar alguna de las siguientes recetas
                ${consultarInfoComida(usuarios[i].comida, usuarios[i].email)}
                <div id="titleFood${usuarios[i].email}"></div>

              </div>
            </div>


            <div class="collapse multi-collapse" id="multiCollapseExample2">
              <div id=peli" class="card card-body bg-secondary-subtle">
                Tu pelicula favorita la puedes ver en:
                ${consultarInfoPelicula(
                  usuarios[i].pelicula,
                  usuarios[i].email
                )}
                <div id="titlePelicula${usuarios[i].email}"></div>
              </div>
            </div>


          <div class="collapse multi-collapse" id="multiCollapseExample3">
            <div class="card card-body bg-success-subtle">
              El coctel que te podria gustar de acuerdo a tu gusto podria ser...
              
            
              ${consultarInfoLicor(usuarios[i].alcohol, usuarios[i].email)}
              <div id="titleLicor${usuarios[i].email}"></div>

            </div>
          </div>

        </div>

      </div>
     
    </div>
</div>
  `;

    seccionUsuarios.append(card);
  }
}

function cerrarSesion() {
  console.log("cerrar sesion...");

  let usuarioGuardado = localStorage.getItem("usuarioAutoIni");

  let usuGuardado = JSON.parse(usuarioGuardado);
  let emailUsu = "";

  if (usuGuardado != null) {
    emailUsu = usuGuardado.email;
  }

  Swal.fire({
    title: "Seguro que deseas Cerrar Sesión " + emailUsu + " ?",
    text: "Para Cerrar Sesion click en 'estoy seguo'",
    icon: "warning",
    confirmButtonText: "Estoy Seguro",
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      if (usuGuardado != null) {
        localStorage.removeItem("usuarioAutoIni");
      }

      Swal.fire({
        title: "Sesion Cerrada Correctamente",
        text: "",
        icon: "success",
        confirmButtonText: "Genial!",
      });
      window.location.href = "../index.html";
    }
  });
}

function editarUsuario(campo, posicionUsuario) {
  let infoUsuario = JSON.parse(localStorage.getItem("listaUsuarios"));
  infoUsuario = infoUsuario[posicionUsuario];
  console.log(infoUsuario);
  console.log(listaUsuarios);
  let usuarios = JSON.parse(listaUsuarios);
  let usuarioAlmacenado = JSON.parse(localStorage.getItem("usuarioAutoIni"));
  console.log(usuarioAlmacenado);
  let cerrarSesion = false;
  if (usuarioAlmacenado != null) {
    console.log("hay un usuario almacenado...");
    console.log(usuarioAlmacenado.email, " / " + infoUsuario.email);
    if (usuarioAlmacenado.email == infoUsuario.email) {
      //Dejar el aler de abajo...
      console.log(
        "Va a  modificar un usuario almacenado y se tendra que modificar el usuario almacenado..."
      );
      cerrarSesion = true;
    }
  } else {
    console.log("no hay un usuario almacenado");
  }
  infoUsuario.email;
  usuarioAlmacenado;
  switch (campo) {
    case "id":
      //console.log("se va a editar un usuario en el campo ", campo);
      Swal.fire({
        title: "Editando campo " + campo + " : " + infoUsuario.id,
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        showLoaderOnConfirm: true,
        preConfirm: (modificacion) => {
          infoUsuario.id = modificacion;
          console.log(infoUsuario);
          usuarios[posicionUsuario] = infoUsuario;
          console.log(usuarios);
          localStorage.setItem("listaUsuarios", JSON.stringify(usuarios));
          return console.log("retornando algo...", modificacion);
        },
        allowOutsideClick: () => !Swal.isLoading(),
      })
        .then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: ` se guardo correctamente(?)`,
              icon: "success",
              showConfirmButton: false,
            });
            setTimeout(() => {
              window.location.reload();
            }, "1300");
          }
        })
        .then(() => {});
      break;
    case "nombres":
      //console.log("se va a editar un usuario en el campo ", campo);
      Swal.fire({
        title: "Editando campo " + campo + " : " + infoUsuario.nombres,
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        showLoaderOnConfirm: true,
        preConfirm: (modificacion) => {
          infoUsuario.nombres = modificacion;
          console.log(infoUsuario);
          usuarios[posicionUsuario] = infoUsuario;
          console.log(usuarios);
          localStorage.setItem("listaUsuarios", JSON.stringify(usuarios));
          return console.log("retornando algo...", modificacion);
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: ` se guardo correctamente(?)`,
            icon: "success",
            showConfirmButton: false,
          });
          setTimeout(() => {
            window.location.reload();
          }, "1300");
        }
      });
      break;
    case "apellidos":
      //console.log("se va a editar un usuario en el campo ", campo);
      Swal.fire({
        title: "Editando campo " + campo + " : " + infoUsuario.apellidos,
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        showLoaderOnConfirm: true,
        preConfirm: (modificacion) => {
          infoUsuario.apellidos = modificacion;
          console.log(infoUsuario);
          usuarios[posicionUsuario] = infoUsuario;
          console.log(usuarios);
          localStorage.setItem("listaUsuarios", JSON.stringify(usuarios));
          return console.log("retornando algo...", modificacion);
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: ` se guardo correctamente(?)`,
            icon: "success",
            showConfirmButton: false,
          });
          setTimeout(() => {
            window.location.reload();
          }, "1300");
        }
      });
      break;
    case "edad":
      //console.log("se va a editar un usuario en el campo ", campo);
      Swal.fire({
        title: "Editando campo " + campo + " : " + infoUsuario.edad,
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        showLoaderOnConfirm: true,
        preConfirm: (modificacion) => {
          infoUsuario.edad = modificacion;
          console.log(infoUsuario);
          usuarios[posicionUsuario] = infoUsuario;
          console.log(usuarios);
          localStorage.setItem("listaUsuarios", JSON.stringify(usuarios));
          return console.log("retornando algo...", modificacion);
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: ` se guardo correctamente(?)`,
            icon: "success",
            showConfirmButton: false,
          });
          setTimeout(() => {
            window.location.reload();
          }, "1300");
        }
      });
      break;
    case "email":
      Swal.fire({
        title: "Editando campo " + campo + " : " + infoUsuario.email,
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        showLoaderOnConfirm: true,
        preConfirm: (modificacion) => {
          infoUsuario.email = modificacion;
          console.log(infoUsuario);
          usuarios[posicionUsuario] = infoUsuario;

          console.log(usuarios);
          localStorage.setItem("listaUsuarios", JSON.stringify(usuarios));

          return console.log("retornando algo...", modificacion);
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: ` se guardo correctamente(?)`,
            icon: "success",
            showConfirmButton: false,
          });
          if (!cerrarSesion) {
            setTimeout(() => {
              window.location.reload();
            }, "1300");
          } else {
            localStorage.removeItem("usuarioAutoIni");
            let infoUsu = { email: infoUsuario.email, pass: infoUsuario.pass };
            console.log(infoUsu);
            localStorage.setItem("usuarioAutoIni", JSON.stringify(infoUsu));
            setTimeout(() => {
              window.location.reload();
            }, "1300");
          }
        }
      });
      break;
    case "pelicula":
      //console.log("se va a editar un usuario en el campo ", campo);
      Swal.fire({
        title: "Editando campo " + campo + " : " + infoUsuario.pelicula,
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        showLoaderOnConfirm: true,
        preConfirm: (modificacion) => {
          infoUsuario.pelicula = modificacion;
          console.log(infoUsuario);
          usuarios[posicionUsuario] = infoUsuario;
          console.log(usuarios);
          localStorage.setItem("listaUsuarios", JSON.stringify(usuarios));
          return console.log("retornando algo...", modificacion);
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: ` se guardo correctamente(?)`,
            icon: "success",
            showConfirmButton: false,
          });
          setTimeout(() => {
            window.location.reload();
          }, "1300");
        }
      });
      break;
    case "comida":
      //console.log("se va a editar un usuario en el campo ", campo);
      Swal.fire({
        title: "Editando campo " + campo + " : " + infoUsuario.comida,
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        showLoaderOnConfirm: true,
        preConfirm: (modificacion) => {
          infoUsuario.comida = modificacion;
          console.log(infoUsuario);
          usuarios[posicionUsuario] = infoUsuario;
          console.log(usuarios);
          localStorage.setItem("listaUsuarios", JSON.stringify(usuarios));
          return console.log("retornando algo...", modificacion);
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: ` se guardo correctamente(?)`,
            icon: "success",
            showConfirmButton: false,
          });
          setTimeout(() => {
            window.location.reload();
          }, "1300");
        }
      });
      break;
    case "alcohol":
      //console.log("se va a editar un usuario en el campo ", campo);
      Swal.fire({
        title: "Editando campo " + campo + " : " + infoUsuario.alcohol,
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        showLoaderOnConfirm: true,
        preConfirm: (modificacion) => {
          infoUsuario.alcohol = modificacion;
          console.log(infoUsuario);
          usuarios[posicionUsuario] = infoUsuario;
          console.log(usuarios);
          localStorage.setItem("listaUsuarios", JSON.stringify(usuarios));
          return console.log("retornando algo...", modificacion);
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: ` se guardo correctamente(?)`,
            icon: "success",
            showConfirmButton: false,
          });
          setTimeout(() => {
            window.location.reload();
          }, "1300");
        }
      });
      break;
  }
}

function eliminarUsuario(posicionUsuario) {
  console.log("eliminarUsuario que esta el la posicion => ", posicionUsuario);

  let obtenerListaUsuarios = JSON.parse(localStorage.getItem("listaUsuarios"));
  let nuevaLista = obtenerListaUsuarios.filter(
    (usuarios) => usuarios != obtenerListaUsuarios[posicionUsuario]
  );

  localStorage.removeItem("listaUsuarios");
  localStorage.setItem("listaUsuarios", JSON.stringify(nuevaLista));

  Swal.fire({
    title: ` usuario eliminado exitosamente`,
    icon: "success",
    showConfirmButton: false,
  });
  setTimeout(() => {
    window.location.reload();
  }, "1300");
}
let listaPeliculas;
let cantidadStremingAPP = [];
function consultarInfoPelicula(peliculaUsu, email) {
  /*
    Si se terminan las peticiones para las peliculas, descomentar la lineas de options y comentar 
    las que se estaban usando... !!!!!!!
  */

  // const options = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Key": "6668e552e5msh3d407443f84287cp196fd4jsnde73b4ddb5fb",
  //     "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
  //   },
  // };

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "2fe12c38f3mshc1c1fe0c08cf54bp163238jsn24eb0ed4215a",
      "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
    },
  };

  fetch(
    "https://streaming-availability.p.rapidapi.com/v2/search/title?title=" +
      peliculaUsu +
      "&country=us&output_language=en",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      listaPeliculas = response["result"];

      let contenedorTitulo = document.getElementById("titlePelicula" + email); //padre

      for (let z = 0; z < listaPeliculas.length; z++) {
        let streamingAPP = listaPeliculas[z].streamingInfo.us;
        let cantidadStremingAPP = [];
        console.log(listaPeliculas[z].streamingInfo.us);
        for (let key in streamingAPP) {
          cantidadStremingAPP.push(key);
        }
        let palabra;
        let listaTipo = [];

        for (let i = 0; i < cantidadStremingAPP.length; i++) {
          palabra = cantidadStremingAPP[i];
          listaTipo.push(listaPeliculas[z].streamingInfo.us[palabra]);

          let tituloSub = document.createElement("h5");
          for (let k = 0; k <= listaTipo.length; k++) {
            let tipo;
            tipo = listaPeliculas[z].streamingInfo.us[palabra][k].type;
            precio = listaTipo[i][k].price.formatted;

            tituloSub.innerHTML = palabra + " - " + tipo + " precio " + precio;
            contenedorTitulo.appendChild(tituloSub);
          }
          tipo = "";
        }

        streamingAPP;
        cantidadStremingAPP = [];
        palabra;
        listaTipo = [];
      }
    })
    .catch((err) => console.error(err));

  return " : ";
}

let listaRecetas;
let recetas = "";

function consultarInfoComida(comidaUsu, email) {
  console.log("consultandooo -> ", comidaUsu);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "6668e552e5msh3d407443f84287cp196fd4jsnde73b4ddb5fb",
      "X-RapidAPI-Host": "recipe-by-api-ninjas.p.rapidapi.com",
    },
  };

  fetch(
    "https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=" + comidaUsu,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      listaRecetas = response;
      let contenedorTitulo = document.getElementById("titleFood" + email); //padre

      for (let i = 0; i <= listaRecetas.length; i++) {
        let tituloSub = document.createElement("h5");
        let parrafoIngredients = document.createElement("li");
        let parrafoInstructions = document.createElement("p");
        tituloSub.innerHTML = listaRecetas[i].title;
        parrafoIngredients.innerHTML = listaRecetas[i].ingredients;
        parrafoInstructions.innerHTML = listaRecetas[i].instructions;
        contenedorTitulo.appendChild(tituloSub);
        contenedorTitulo.appendChild(parrafoIngredients);
        contenedorTitulo.appendChild(parrafoInstructions);
      }
    })
    .catch((err) => console.error(err));

  return " : ";
}
let listaLicores;
function consultarInfoLicor(licorUsu, email) {
  console.log("consultandooo -> ", licorUsu);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "6668e552e5msh3d407443f84287cp196fd4jsnde73b4ddb5fb",
      "X-RapidAPI-Host": "recipe-by-api-ninjas.p.rapidapi.com",
    },
  };

  fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + licorUsu)
    .then((response) => response.json())
    .then((response) => {
      listaLicores = response["drinks"];
      let contenedorTitulo = document.getElementById("titleLicor" + email);

      for (let i = 0; i <= listaLicores.length; i++) {
        let tituloSub = document.createElement("h5");
        let imgLicor = document.createElement("img");
        tituloSub.innerHTML = listaLicores[i].strDrink;
        imgLicor.innerHTML = listaLicores[i].strDrinkThumb;
        contenedorTitulo.appendChild(tituloSub);
        contenedorTitulo.appendChild(imgLicor);
      }
    })
    .catch((err) => console.error(err));

  return " : ";
}
