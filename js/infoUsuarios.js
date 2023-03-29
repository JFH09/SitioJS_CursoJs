const listaUsuarios = localStorage.getItem("listaUsuarios");
console.log(listaUsuarios);
const usuarios = JSON.parse(listaUsuarios);
console.log(usuarios);
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
      "\n comidaFavorita = " +
      usuarios[i].comidaFavorita +
      "\n telefono = " +
      usuarios[i].telefono
  );
}
//El ideal es renderizar esta informacion, mostrando como un tipo de cards, con las diferentes opciones y datos relacionados de las apis
