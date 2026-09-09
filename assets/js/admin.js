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


/* Lista de productos */

const listaProductosAdmin =
    document.getElementById("lista-productos-admin");


if (listaProductosAdmin) {

    productos.forEach(function(producto) {

        listaProductosAdmin.innerHTML += `
            <tr>

                <td>
                    ${producto.id}
                </td>

                <td>
                    ${producto.nombre}
                </td>

                <td>
                    ${producto.categoria}
                </td>

                <td>
                    $${producto.precio.toLocaleString("es-CL")}
                </td>

                <td>
                    ${producto.stock}
                </td>

                <td>

                    <a
                        href="producto-detalle.html?id=${producto.id}"
                        class="admin-accion">
                        Ver
                    </a>

                    <a
                        href="producto-editar.html?id=${producto.id}"
                        class="admin-accion">
                        Editar
                    </a>

                </td>

            </tr>
        `;

    });

}


/* Nuevo producto */

const formularioProductoNuevo =
    document.getElementById("form-producto-nuevo");


if (formularioProductoNuevo) {

    function mostrarErrorProducto(campo, mensaje) {

        const error =
            document.getElementById("error-" + campo);

        if (error) {

            error.textContent =
                mensaje;

        }

    }


    function limpiarErrorProducto(campo) {

        const error =
            document.getElementById("error-" + campo);

        if (error) {

            error.textContent =
                "";

        }

    }


    formularioProductoNuevo.addEventListener(
        "submit",
        function(evento) {

            evento.preventDefault();


            const codigo =
                document.getElementById("codigo").value.trim();

            const nombre =
                document.getElementById("nombre").value.trim();

            const categoria =
                document.getElementById("categoria").value;

            const fabricante =
                document.getElementById("fabricante").value.trim();

            const precio =
                document.getElementById("precio").value;

            const stock =
                document.getElementById("stock").value;

            const stockCritico =
                document.getElementById("stock-critico").value;

            const imagen =
                document.getElementById("imagen").value.trim();

            const descripcion =
                document.getElementById("descripcion").value.trim();


            let formularioValido = true;


            const campos = [
                "codigo",
                "nombre",
                "categoria",
                "fabricante",
                "precio",
                "stock",
                "stock-critico",
                "descripcion"
            ];


            campos.forEach(function(campo) {

                limpiarErrorProducto(campo);

            });


            document.getElementById(
                "producto-exitoso"
            ).textContent = "";


            /* Código */

            if (codigo === "") {

                mostrarErrorProducto(
                    "codigo",
                    "Ingresa el código del producto."
                );

                formularioValido = false;

            } else if (codigo.length < 3) {

                mostrarErrorProducto(
                    "codigo",
                    "El código debe tener al menos 3 caracteres."
                );

                formularioValido = false;

            } else {

                const codigoExiste =
                    productos.find(function(producto) {

                        return producto.id.toLowerCase() ===
                            codigo.toLowerCase();

                    });


                if (codigoExiste) {

                    mostrarErrorProducto(
                        "codigo",
                        "Este código ya está registrado."
                    );

                    formularioValido = false;

                }

            }


            /* Nombre */

            if (nombre === "") {

                mostrarErrorProducto(
                    "nombre",
                    "Ingresa el nombre del producto."
                );

                formularioValido = false;

            } else if (nombre.length > 100) {

                mostrarErrorProducto(
                    "nombre",
                    "El nombre no puede superar los 100 caracteres."
                );

                formularioValido = false;

            }


            /* Categoría */

            if (categoria === "") {

                mostrarErrorProducto(
                    "categoria",
                    "Selecciona una categoría."
                );

                formularioValido = false;

            }


            /* Fabricante */

            if (fabricante === "") {

                mostrarErrorProducto(
                    "fabricante",
                    "Ingresa el fabricante."
                );

                formularioValido = false;

            }


            /* Precio */

            if (precio === "") {

                mostrarErrorProducto(
                    "precio",
                    "Ingresa el precio."
                );

                formularioValido = false;

            } else if (Number(precio) < 0) {

                mostrarErrorProducto(
                    "precio",
                    "El precio no puede ser negativo."
                );

                formularioValido = false;

            }


            /* Stock */

            if (stock === "") {

                mostrarErrorProducto(
                    "stock",
                    "Ingresa el stock."
                );

                formularioValido = false;

            } else if (
                Number(stock) < 0 ||
                !Number.isInteger(Number(stock))
            ) {

                mostrarErrorProducto(
                    "stock",
                    "El stock debe ser un número entero mayor o igual a 0."
                );

                formularioValido = false;

            }


            /* Stock crítico */

            if (
                stockCritico !== "" &&
                (
                    Number(stockCritico) < 0 ||
                    !Number.isInteger(Number(stockCritico))
                )
            ) {

                mostrarErrorProducto(
                    "stock-critico",
                    "El stock crítico debe ser un número entero mayor o igual a 0."
                );

                formularioValido = false;

            }


            /* Descripción */

            if (descripcion.length > 500) {

                mostrarErrorProducto(
                    "descripcion",
                    "La descripción no puede superar los 500 caracteres."
                );

                formularioValido = false;

            }


            if (!formularioValido) {

                return;

            }


            const nuevoProducto = {

                id: codigo.toUpperCase(),
                nombre: nombre,
                categoria: categoria,
                precio: Number(precio),
                imagen: imagen,
                descripcion: descripcion,
                fabricante: fabricante,
                stock: Number(stock),
                stockCritico:
                    stockCritico === ""
                        ? null
                        : Number(stockCritico)

            };


            productos.push(
                nuevoProducto
            );


            localStorage.setItem(
                "productosLevelUp",
                JSON.stringify(productos)
            );


            document.getElementById(
                "producto-exitoso"
            ).textContent =
                "Producto guardado correctamente.";


            if (
                nuevoProducto.stockCritico !== null &&
                nuevoProducto.stock <=
                nuevoProducto.stockCritico
            ) {

                alert(
                    "Advertencia: el producto está en nivel de stock crítico."
                );

            }


            setTimeout(function() {

                window.location.href =
                    "productos.html";

            }, 1000);

        }
    );

}