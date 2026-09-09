/* Panel admin: inicio */

const totalProductos =
    document.getElementById("total-productos");

const totalUsuarios =
    document.getElementById("total-usuarios");

const nombreAdmin =
    document.getElementById("nombre-admin");


if (totalProductos) {

    totalProductos.textContent =
        productos.length;

}


if (totalUsuarios) {

    const usuarios =
        JSON.parse(
            localStorage.getItem("usuariosLevelUp")
        ) || [];

    totalUsuarios.textContent =
        usuarios.length;

}


/* Nombre del administrador */

if (nombreAdmin) {

    const sesionAdmin =
        JSON.parse(
            localStorage.getItem("sesionLevelUp")
        );


    if (sesionAdmin) {

        nombreAdmin.textContent =
            sesionAdmin.nombre;

    }

}