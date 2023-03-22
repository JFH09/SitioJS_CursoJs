class Usuario {
  constructor(
    idUsuario,
    contraUsuario,
    nombres,
    apellidos,
    identificacionUsu,
    edad,
    genero,
    ...listaUsuarios
  ) {
    this.idUsuario = idUsuario;
    this.contraUsuario = contraUsuario;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.identificacionUsu = identificacionUsu;
    this.edad = edad;
    this.genero = genero;
    this.listaUsuarios = listaUsuarios;
  }

  iniciarSesion(idUsuario, contraUsuario, ...listaUsuarios) {
    console.log("Buscando usuario....");

    const encontrar = listaUsuarios.find(
      (i) => i.id == idUsuario && i.pass == contraUsuario
    );

    if (encontrar) {
      console.log("Encontrar es => " + encontrar.id + encontrar.pass);
      alert(" Puede iniciar sesion, se encontro el usuario ");
    } else {
      alert("No te encuentras registrado, registrate ahora!!! ");
    }
  }

  registrarUsuario(
    idUsuario,
    contraUsuario,
    nombres,
    apellidos,
    identificacionUsu,
    edad,
    genero
  ) {
    console.log(
      "Registrando usuario...." +
        idUsuario +
        contraUsuario +
        nombres +
        apellidos +
        edad
    );

    listaUsuarios.push({
      id: idUsuario,
      pass: contraUsuario,
      nombres: nombres,
      apellidos: apellidos,
      edad: edad,
      identificacionUsu: identificacionUsu,
      genero: genero,
    });

    alert("Se registro correctamente el usuario!!!!");
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
          x.identificacionUsu +
          " " +
          x.genero
      )
    );
  }
}
