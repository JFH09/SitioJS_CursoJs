const btnCerrarSesion = document.getElementById("cerrarSesion");

btnCerrarSesion.addEventListener("click", () => {
  cerrarSesion();
});
//let listaUsuarios = "";
/*En esta parte se renderizan los usuarios, pero en el estado actual si 
  se registra el usuario no se evidenciara renderizado ya que se empezo a cambiar de
  localStorage a json, se puede ver que en el localStorage se guarda la info, pero como
  se empezo a migrar el codigo se volveria confuso si dejo ambas funcionalidades...
*/
let listaUsuarios = localStorage.getItem("listaUsuarios");
mostrarInfoUsuarios();

function mostrarInfoUsuarios() {
  console.log(listaUsuarios);
  let usuarios = JSON.parse(listaUsuarios);
  console.log(usuarios.length);

  for (let i = 0; i < usuarios.length; i++) {
    console.log(i);
    alert(
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
          <h5 class="card-title"> ${usuarios[i].id}</h5>
          <h6 class="card-text"> ${
            usuarios[i].nombres + usuarios[i].apellidos
          }</h6>
          <p class="card-text"> ${usuarios[i].edad}</p>
          <p class="card-text">${usuarios[i].comida}</p>
          <p class="card-text">${usuarios[i].pelicula}</p>
          <p class="card-text">${usuarios[i].alcohol}</p>
          <p class="card-text"><small class="text-body-secondary">${
            usuarios[i].email
          }</small></p>
          <a href="#" class="btn btn-primary">Editar</a>
          <a href="#" class="btn btn-danger">Eliminar</a>
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
              <div class="card card-body bg-primary-subtle ">
                Tu comida favorita la puedes hacer asi...
              </div>
            </div>


            <div class="collapse multi-collapse" id="multiCollapseExample2">
              <div class="card card-body bg-secondary-subtle">
                Tu pelicula favorita la puedes ver en:
              </div>
            </div>


          <div class="collapse multi-collapse" id="multiCollapseExample3">
            <div class="card card-body bg-success-subtle">
              El coctel que te podria gustar de acuerdo a tu gusto podria ser...
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
