const contenedor = document.querySelector(".contenedor");
const enlaceIniciarSesionForm = document.querySelector(
  ".enlaceIniciarSesionForm"
);
const enlaceRegistroForm = document.querySelector(".enlaceRegistroForm");
const btnIniciarSesion = document.querySelector(".btnIniciarSesion");
const cerrarForm = document.querySelector(".icon-close");

const btnRegistrarse = document.querySelector(".btnRegistrarse");

enlaceRegistroForm.addEventListener("click", () => {
  contenedor.classList.add("active");
});

enlaceIniciarSesionForm.addEventListener("click", () => {
  contenedor.classList.remove("active");
});

btnIniciarSesion.addEventListener("click", () => {
  contenedor.classList.add("mostrarFormInicioSesion");
});

cerrarForm.addEventListener("click", () => {
  contenedor.classList.remove("mostrarFormInicioSesion");
});
