class Usuario {
  constructor(
    id,
    pass,
    nombres,
    apellidos,
    email,
    edad,
    pelicula,
    comida,
    alcohol,
    img,
    ...listaUsuarios
  ) {
    this.id = id;
    this.pass = pass;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.email = email;
    this.edad = edad;
    this.pelicula = pelicula;
    this.comida = comida;
    this.alcohol = alcohol;
    this.img = img;
    this.listaUsuarios = listaUsuarios;
  }

  iniciarSesion(email, pass, recordarDatos, ...listaUsuarios) {
    console.log(
      "Buscando usuario...." +
        email +
        ",,,," +
        pass +
        "guardarUsuario?" +
        recordarDatos
    );

    const encontrar = listaUsuarios.find(
      (i) => i.email == email && i.pass == pass
    );

    if (encontrar) {
      console.log("Encontrar es => " + encontrar.email + encontrar.pass);
      if (recordarDatos) {
        let infoUsu = { email: email, pass: pass };
        localStorage.setItem("usuarioAutoIni", JSON.stringify(infoUsu));
      }

      Swal.fire({
        title: "Se Inicio Sesion correctamente!",
        text: "Bienvenido " + encontrar.id,
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "../pages/infoUsuarios.html";
        }
      });
    } else {
      Swal.fire({
        title: "No te encuentras registrado, registrate ahora!!!",
        text: " :)",
        icon: "warning",
        confirmButtonText: "Listo",
      });
    }
  }

  registrarUsuario(datos, ...listaUsuarios) {
    console.log(listaUsuarios);
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
  }

  imprimirListaUsuarios(...listaUsuarios) {
    listaUsuarios.map((x) =>
      alert(
        x.id +
          " " +
          x.pass +
          " " +
          x.nombres +
          " " +
          x.apellidos +
          " " +
          x.edad +
          " " +
          x.email +
          " " +
          x.pelicula +
          " " +
          x.comida +
          " " +
          x.alcohol +
          " " +
          x.img
      )
    );
  }
}
