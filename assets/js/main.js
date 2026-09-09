/* Mostrar sesion */

const sesionUsuario =
    JSON.parse(localStorage.getItem("sesionLevelUp"));

const linkIngresar =
    document.getElementById("link-ingresar");

const linkRegistro =
    document.getElementById("link-registro");

const usuarioSesion =
    document.getElementById("usuario-sesion");

const nombreUsuario =
    document.getElementById("nombre-usuario");

const cerrarSesion =
    document.getElementById("cerrar-sesion");


if (
    sesionUsuario &&
    usuarioSesion &&
    nombreUsuario
) {

    if (linkIngresar) {
        linkIngresar.style.display = "none";
    }

    if (linkRegistro) {
        linkRegistro.style.display = "none";
    }

    usuarioSesion.style.display = "flex";

    nombreUsuario.textContent =
        "Bienvenido, " + sesionUsuario.nombre;
}


/* Cerrar sesion */

if (cerrarSesion) {

    cerrarSesion.addEventListener("click", function(evento) {

        evento.preventDefault();

        localStorage.removeItem("sesionLevelUp");

        window.location.href = "index.html";

    });

}