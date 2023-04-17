const btnCerrarSesion = document.getElementById("cerrarSesion");
const btnEditar = document.getElementById("editar");
btnCerrarSesion.addEventListener("click", () => {
  cerrarSesion();
});

// btnEditar.addEventListener("click", () => {
//   alert("Vamos a editar!!");
// });
//let listaUsuarios = "";
/*En esta parte se renderizan los usuarios, pero en el estado actual si 
  se registra el usuario no se evidenciara renderizado ya que se empezo a cambiar de
  localStorage a json, se puede ver que en el localStorage se guarda la info, pero como
  se empezo a migrar el codigo se volveria confuso si dejo ambas funcionalidades...
*/
let listaUsuarios = localStorage.getItem("listaUsuarios");

function mostrarInfoUsuarios() {
  console.log(listaUsuarios);
  let usuarios = JSON.parse(listaUsuarios);
  console.log(usuarios.length);

  for (let i = 0; i < usuarios.length; i++) {
    console.log(i);
    console.log(
      "Informacion Usuarios: " +
        "\n Id = " +
        usuarios[i].id +
        "\n nombres = " +
        usuarios[i].nombres +
        "\n apellidos = " +
        usuarios[i].apellidos +
        "\n edad = " +
        usuarios[i].edad +
        "\n comida = " +
        usuarios[i].comida +
        "\n telefono = " +
        usuarios[i].pelicula +
        "\n alcohol = " +
        usuarios[i].alcohol +
        "\n img = " +
        usuarios[i].img
    );
  }

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
                ${consultarInfoPelicula(usuarios[i].pelicula)}
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
    alert("hay un usuario almacenado...");
    console.log(usuarioAlmacenado.email, " / " + infoUsuario.email);
    if (usuarioAlmacenado.email == infoUsuario.email) {
      //Dejar el aler de abajo...
      alert(
        "Va a  modificar un usuario almacenado y se tendra que modificar el usuario almacenado..."
      );
      cerrarSesion = true;
    } else {
      alert("no esta modificando a un usuario almacenado");
    }
  } else {
    alert("no hay un usuario almacenado");
  }
  infoUsuario.email;
  usuarioAlmacenado;
  switch (campo) {
    case "id":
      console.log("se va a editar un usuario en el campo ", campo);
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
              //  imageUrl: result.value.avatar_url,
            });
            setTimeout(() => {
              window.location.reload();
            }, "1300");
          }
        })
        .then(() => {});
      break;
    case "nombres":
      console.log("se va a editar un usuario en el campo ", campo);
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
            //  imageUrl: result.value.avatar_url,
          });
          setTimeout(() => {
            window.location.reload();
          }, "1300");
        }
      });
      break;
    case "apellidos":
      console.log("se va a editar un usuario en el campo ", campo);
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
            //  imageUrl: result.value.avatar_url,
          });
          setTimeout(() => {
            window.location.reload();
          }, "1300");
        }
      });
      break;
    case "edad":
      console.log("se va a editar un usuario en el campo ", campo);
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
            //  imageUrl: result.value.avatar_url,
          });
          setTimeout(() => {
            window.location.reload();
          }, "1300");
        }
      });
      break;
    case "email":
      console.log("se va a editar un usuario en el campo ", campo);
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
            //  imageUrl: result.value.avatar_url,
          });
          if (!cerrarSesion) {
            alert("no se tiene que cerrar sesion");
            setTimeout(() => {
              window.location.reload();
            }, "1300");
          } else {
            alert("se modifico el usuario almacenado!!!");
            localStorage.removeItem("usuarioAutoIni");
            //cerrarSesion();
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
      console.log("se va a editar un usuario en el campo ", campo);
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
            //  imageUrl: result.value.avatar_url,
          });
          setTimeout(() => {
            window.location.reload();
          }, "1300");
        }
      });
      break;
    case "comida":
      console.log("se va a editar un usuario en el campo ", campo);
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
            //  imageUrl: result.value.avatar_url,
          });
          setTimeout(() => {
            window.location.reload();
          }, "1300");
        }
      });
      break;
    case "alcohol":
      console.log("se va a editar un usuario en el campo ", campo);
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
            //  imageUrl: result.value.avatar_url,
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
  console.log("nueva lista quedo -> ", nuevaLista);
  localStorage.removeItem("listaUsuarios");
  localStorage.setItem("listaUsuarios", JSON.stringify(nuevaLista));
  // alert("usuario eliminado exitosamente...");

  Swal.fire({
    title: ` usuario eliminado exitosamente`,
    icon: "success",
    showConfirmButton: false,
    //  imageUrl: result.value.avatar_url,
  });
  setTimeout(() => {
    window.location.reload();
  }, "1300");
}
let listaPeliculas = "";
function consultarInfoPelicula(peliculaUsu) {
  //console.log("consultandooo -> ", peliculaUsu);
  /*let ver = "";

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "6668e552e5msh3d407443f84287cp196fd4jsnde73b4ddb5fb",
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
      // for (let i in response) {
      //console.log(response[0].title);
      console.log(response);
      listaPeliculas = response;
      console.log(listaPeliculas);
      // }
    })
    .then(() => {
      ver = mostrarPeliculas(peliculaUsu);
    })
    .catch((err) => console.error(err));
*/
  return "FUNCIONAAAAA!!****";
}

function mostrarPeliculas() {
  console.log(listaPeliculas["result"]);
  let listaPeli = listaPeliculas["result"];
  let infoUsuario = document.getElementById("peli");
  console.log(listaPeli.title);
}
let listaRecetas;
let recetas = "";

function consultarInfoComida(comidaUsu, email) {
  console.log("consultandooo -> ", comidaUsu);

  let receta = "a";

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
      //console.log(response);
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
      //console.log(listaRecetas);
    })
    .catch((err) => console.error(err));

  return " : ";
}
let listaLicores;
function consultarInfoLicor(licorUsu, email) {
  console.log("consultandooo -> ", licorUsu);

  let receta = "a";

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "6668e552e5msh3d407443f84287cp196fd4jsnde73b4ddb5fb",
      "X-RapidAPI-Host": "recipe-by-api-ninjas.p.rapidapi.com",
    },
  };

  fetch("https://api.api-ninjas.com/v1/cocktail?query=" + licorUsu, options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      /*  listaLicores = response;
      let contenedorTitulo = document.getElementById("titleLicor" + email); //padre

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
      }*/
      //console.log(listaRecetas);
    })
    .catch((err) => console.error(err));

  return " : ";
}
