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

/* Editar producto */

const formularioProductoEditar =
    document.getElementById("form-producto-editar");


if (formularioProductoEditar) {

    const parametrosEditar =
        new URLSearchParams(window.location.search);

    const idProductoEditar =
        parametrosEditar.get("id");

    const productoEditar =
        productos.find(function(producto) {

            return producto.id === idProductoEditar;

        });


    if (!productoEditar) {

        formularioProductoEditar.innerHTML =
            "<p>No se encontró el producto que quieres editar.</p>";

    } else {

        /* Cargar datos */

        document.getElementById("codigo").value =
            productoEditar.id;

        document.getElementById("nombre").value =
            productoEditar.nombre;

        document.getElementById("categoria").value =
            productoEditar.categoria;

        document.getElementById("fabricante").value =
            productoEditar.fabricante;

        document.getElementById("precio").value =
            productoEditar.precio;

        document.getElementById("stock").value =
            productoEditar.stock;

        document.getElementById("stock-critico").value =
            productoEditar.stockCritico ?? "";

        document.getElementById("imagen").value =
            productoEditar.imagen;

        document.getElementById("descripcion").value =
            productoEditar.descripcion;


        function mostrarErrorEditar(campo, mensaje) {

            const error =
                document.getElementById("error-" + campo);

            if (error) {

                error.textContent =
                    mensaje;

            }

        }


        function limpiarErrorEditar(campo) {

            const error =
                document.getElementById("error-" + campo);

            if (error) {

                error.textContent =
                    "";

            }

        }


        formularioProductoEditar.addEventListener(
            "submit",
            function(evento) {

                evento.preventDefault();


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
                    "nombre",
                    "categoria",
                    "fabricante",
                    "precio",
                    "stock",
                    "stock-critico",
                    "descripcion"
                ];


                campos.forEach(function(campo) {

                    limpiarErrorEditar(campo);

                });


                document.getElementById(
                    "producto-editado"
                ).textContent = "";


                /* Nombre */

                if (nombre === "") {

                    mostrarErrorEditar(
                        "nombre",
                        "Ingresa el nombre del producto."
                    );

                    formularioValido = false;

                } else if (nombre.length > 100) {

                    mostrarErrorEditar(
                        "nombre",
                        "El nombre no puede superar los 100 caracteres."
                    );

                    formularioValido = false;

                }


                /* Categoría */

                if (categoria === "") {

                    mostrarErrorEditar(
                        "categoria",
                        "Selecciona una categoría."
                    );

                    formularioValido = false;

                }


                /* Fabricante */

                if (fabricante === "") {

                    mostrarErrorEditar(
                        "fabricante",
                        "Ingresa el fabricante."
                    );

                    formularioValido = false;

                }


                /* Precio */

                if (precio === "") {

                    mostrarErrorEditar(
                        "precio",
                        "Ingresa el precio."
                    );

                    formularioValido = false;

                } else if (Number(precio) < 0) {

                    mostrarErrorEditar(
                        "precio",
                        "El precio no puede ser negativo."
                    );

                    formularioValido = false;

                }


                /* Stock */

                if (stock === "") {

                    mostrarErrorEditar(
                        "stock",
                        "Ingresa el stock."
                    );

                    formularioValido = false;

                } else if (
                    Number(stock) < 0 ||
                    !Number.isInteger(Number(stock))
                ) {

                    mostrarErrorEditar(
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

                    mostrarErrorEditar(
                        "stock-critico",
                        "El stock crítico debe ser un número entero mayor o igual a 0."
                    );

                    formularioValido = false;

                }


                /* Descripción */

                if (descripcion.length > 500) {

                    mostrarErrorEditar(
                        "descripcion",
                        "La descripción no puede superar los 500 caracteres."
                    );

                    formularioValido = false;

                }


                if (!formularioValido) {

                    return;

                }


                /* Guardar cambios */

                productoEditar.nombre =
                    nombre;

                productoEditar.categoria =
                    categoria;

                productoEditar.fabricante =
                    fabricante;

                productoEditar.precio =
                    Number(precio);

                productoEditar.stock =
                    Number(stock);

                productoEditar.stockCritico =
                    stockCritico === ""
                        ? null
                        : Number(stockCritico);

                productoEditar.imagen =
                    imagen;

                productoEditar.descripcion =
                    descripcion;


                localStorage.setItem(
                    "productosLevelUp",
                    JSON.stringify(productos)
                );


                document.getElementById(
                    "producto-editado"
                ).textContent =
                    "Producto actualizado correctamente.";


                if (
                    productoEditar.stockCritico !== null &&
                    productoEditar.stock <=
                    productoEditar.stockCritico
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

}

/* Panel admin: detalle de producto */

const adminDetalleNombre =
    document.getElementById("admin-detalle-nombre");


if (adminDetalleNombre) {

    const parametrosDetalle =
        new URLSearchParams(window.location.search);

    const idProductoDetalle =
        parametrosDetalle.get("id");


    const productoDetalleAdmin =
        productos.find(function(producto) {

            return producto.id === idProductoDetalle;

        });


    if (!productoDetalleAdmin) {

        adminDetalleNombre.textContent =
            "Producto no encontrado";

        document.getElementById(
            "admin-detalle-editar"
        ).style.display =
            "none";


    } else {

        adminDetalleNombre.textContent =
            productoDetalleAdmin.nombre;


        document.getElementById(
            "admin-detalle-editar"
        ).href =
            "producto-editar.html?id=" +
            productoDetalleAdmin.id;


        const imagenDetalle =
            document.getElementById(
                "admin-detalle-imagen"
            );


        if (productoDetalleAdmin.imagen) {

            imagenDetalle.src =
                "../" + productoDetalleAdmin.imagen;

        } else {

            imagenDetalle.src =
                "../assets/img/foto1.png";

        }


        imagenDetalle.alt =
            productoDetalleAdmin.nombre;


        document.getElementById(
            "admin-detalle-codigo"
        ).textContent =
            productoDetalleAdmin.id;


        document.getElementById(
            "admin-detalle-categoria"
        ).textContent =
            productoDetalleAdmin.categoria;


        document.getElementById(
            "admin-detalle-fabricante"
        ).textContent =
            productoDetalleAdmin.fabricante;


        document.getElementById(
            "admin-detalle-precio"
        ).textContent =
            "$" +
            productoDetalleAdmin.precio.toLocaleString("es-CL");


        document.getElementById(
            "admin-detalle-stock"
        ).textContent =
            productoDetalleAdmin.stock;


        document.getElementById(
            "admin-detalle-stock-critico"
        ).textContent =
            productoDetalleAdmin.stockCritico ?? 0;


        document.getElementById(
            "admin-detalle-descripcion"
        ).textContent =
            productoDetalleAdmin.descripcion;


        /* Alerta de stock crítico */

        const alertaStock =
            document.getElementById(
                "admin-detalle-alerta"
            );


        if (
            productoDetalleAdmin.stockCritico !== null &&
            productoDetalleAdmin.stockCritico !== undefined &&
            productoDetalleAdmin.stock <=
            productoDetalleAdmin.stockCritico
        ) {

            alertaStock.textContent =
                "Stock crítico: quedan pocas unidades.";

        } else {

            alertaStock.textContent =
                "";

        }

    }

}