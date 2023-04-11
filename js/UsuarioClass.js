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
    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append(
      "Authorization",
      "Basic " /*+ base64.encode(username + ":" + password)*/
    );
    headers.append("Origin", "http://localhost:5501");

    fetch("https://jfh09.github.io/JSON_API_DB_SITIO_JS/datos.json", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(listaUsuarios), // data can be `string` or {object}!
      mode: "cors",
      credentials: "include",

      headers: headers,
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
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

  traerUsuarios() {
    let listaUsuarios = "";
    fetch("https://jfh09.github.io/JSON_API_DB_SITIO_JS/datos.json")
      .then((response) => response.json())
      .then((data) => {
        for (let i in data) {
          console.log(data[i]);
          listaUsuarios = data[i];
        }
      })
      .then(() => {
        this.imprimirListaUsuarios(...this.listaUsuarios);
      });
  }
}
