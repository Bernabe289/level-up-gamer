/* Protección del panel */

const sesionPanel =
    JSON.parse(
        localStorage.getItem("sesionLevelUp")
    );

const tipoSesionPanel =
    sesionPanel
        ? sesionPanel.tipo || "Cliente"
        : null;


if (!sesionPanel) {

    window.location.replace(
        "../login.html"
    );

} else if (
    tipoSesionPanel !== "Administrador" &&
    tipoSesionPanel !== "Vendedor"
) {

    window.location.replace(
        "../index.html"
    );

}


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

if (nombreAdmin && sesionPanel) {

    nombreAdmin.textContent =
        sesionPanel.nombre;

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
                imagen:
                    imagen === ""
                        ? "assets/img/foto1.png"
                        : imagen,
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
            productoEditar.imagen || "";

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


                if (categoria === "") {

                    mostrarErrorEditar(
                        "categoria",
                        "Selecciona una categoría."
                    );

                    formularioValido = false;

                }


                if (fabricante === "") {

                    mostrarErrorEditar(
                        "fabricante",
                        "Ingresa el fabricante."
                    );

                    formularioValido = false;

                }


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
                    imagen === ""
                        ? "assets/img/foto1.png"
                        : imagen;

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


/* Usuarios del administrador */

function obtenerUsuarios() {

    return JSON.parse(
        localStorage.getItem("usuariosLevelUp")
    ) || [];

}


function guardarUsuarios(usuarios) {

    localStorage.setItem(
        "usuariosLevelUp",
        JSON.stringify(usuarios)
    );

}


/* Lista de usuarios */

function mostrarUsuarios() {

    const tabla =
        document.getElementById("lista-usuarios-admin");


    if (!tabla) {
        return;
    }


    const usuarios =
        obtenerUsuarios();

    const totalUsuariosAdmin =
        document.getElementById("total-usuarios");

    const sinUsuarios =
        document.getElementById("sin-usuarios");


    if (totalUsuariosAdmin) {

        totalUsuariosAdmin.textContent =
            usuarios.length;

    }


    if (usuarios.length === 0) {

        tabla.innerHTML = "";

        if (sinUsuarios) {

            sinUsuarios.style.display =
                "block";

        }

        return;
    }


    if (sinUsuarios) {

        sinUsuarios.style.display =
            "none";

    }


    tabla.innerHTML = "";


    usuarios.forEach(function(usuario) {

        const tipoUsuario =
            usuario.tipo || "Cliente";


        tabla.innerHTML += `
            <tr>

                <td>
                    ${usuario.run}
                </td>

                <td>
                    ${usuario.nombre} ${usuario.apellidos}
                </td>

                <td>
                    ${usuario.correo}
                </td>

                <td>
                    ${tipoUsuario}
                </td>

                <td>

                    <a
                        href="usuario-detalle.html?run=${usuario.run}"
                        class="admin-accion">

                        Ver

                    </a>

                    <a
                        href="usuario-editar.html?run=${usuario.run}"
                        class="admin-accion">

                        Editar

                    </a>

                    <button
                        type="button"
                        class="admin-accion admin-accion-eliminar"
                        data-run="${usuario.run}">

                        Eliminar

                    </button>

                </td>

            </tr>
        `;

    });

}


/* Eliminar usuario */

document.addEventListener(
    "click",
    function(evento) {

        const botonEliminar =
            evento.target.closest(
                ".admin-accion-eliminar"
            );


        if (!botonEliminar) {
            return;
        }


        const run =
            botonEliminar.dataset.run;


        const confirmar =
            confirm(
                "¿Seguro que quieres eliminar este usuario?"
            );


        if (!confirmar) {
            return;
        }


        let usuarios =
            obtenerUsuarios();


        usuarios =
            usuarios.filter(function(usuario) {

                return usuario.run !== run;

            });


        guardarUsuarios(
            usuarios
        );


        mostrarUsuarios();

    }
);


mostrarUsuarios();


/* Nuevo usuario */

const formularioUsuario =
    document.getElementById("form-admin-usuario");


if (formularioUsuario) {

    const regiones = [
        {
            nombre: "Arica y Parinacota",
            comunas: ["Arica", "Camarones", "Putre", "General Lagos"]
        },
        {
            nombre: "Tarapacá",
            comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte"]
        },
        {
            nombre: "Antofagasta",
            comunas: ["Antofagasta", "Calama", "Tocopilla"]
        },
        {
            nombre: "Atacama",
            comunas: ["Copiapó", "Caldera", "Vallenar"]
        },
        {
            nombre: "Coquimbo",
            comunas: ["La Serena", "Coquimbo", "Ovalle"]
        },
        {
            nombre: "Valparaíso",
            comunas: [
                "Valparaíso",
                "Viña del Mar",
                "Quilpué",
                "Villa Alemana"
            ]
        },
        {
            nombre: "Metropolitana de Santiago",
            comunas: [
                "Santiago",
                "Maipú",
                "Puente Alto",
                "La Florida",
                "Las Condes",
                "Providencia",
                "Ñuñoa"
            ]
        },
        {
            nombre: "O'Higgins",
            comunas: [
                "Rancagua",
                "Machalí",
                "San Fernando"
            ]
        },
        {
            nombre: "Maule",
            comunas: [
                "Talca",
                "Curicó",
                "Linares"
            ]
        },
        {
            nombre: "Ñuble",
            comunas: [
                "Chillán",
                "Chillán Viejo",
                "San Carlos"
            ]
        },
        {
            nombre: "Biobío",
            comunas: [
                "Concepción",
                "Talcahuano",
                "Los Ángeles",
                "San Pedro de la Paz"
            ]
        },
        {
            nombre: "La Araucanía",
            comunas: [
                "Temuco",
                "Padre Las Casas",
                "Villarrica"
            ]
        },
        {
            nombre: "Los Ríos",
            comunas: [
                "Valdivia",
                "La Unión",
                "Río Bueno"
            ]
        },
        {
            nombre: "Los Lagos",
            comunas: [
                "Puerto Montt",
                "Osorno",
                "Castro"
            ]
        },
        {
            nombre: "Aysén",
            comunas: [
                "Coyhaique",
                "Aysén",
                "Chile Chico"
            ]
        },
        {
            nombre: "Magallanes y la Antártica Chilena",
            comunas: [
                "Punta Arenas",
                "Puerto Natales",
                "Porvenir"
            ]
        }
    ];


    const region =
        document.getElementById("admin-region");

    const comuna =
        document.getElementById("admin-comuna");


    regiones.forEach(function(item) {

        region.innerHTML += `
            <option value="${item.nombre}">
                ${item.nombre}
            </option>
        `;

    });


    region.addEventListener("change", function() {

        comuna.innerHTML = `
            <option value="">
                Selecciona una comuna
            </option>
        `;


        const regionSeleccionada =
            regiones.find(function(item) {

                return item.nombre === region.value;

            });


        if (!regionSeleccionada) {

            comuna.disabled = true;

            return;
        }


        comuna.disabled = false;


        regionSeleccionada.comunas.forEach(function(nombreComuna) {

            comuna.innerHTML += `
                <option value="${nombreComuna}">
                    ${nombreComuna}
                </option>
            `;

        });

    });


    function validarRunAdmin(run) {

        const formato =
            /^[0-9]{6,8}[0-9Kk]$/;


        if (!formato.test(run)) {

            return false;

        }


        const cuerpo =
            run.slice(0, -1);

        const digitoIngresado =
            run.slice(-1).toUpperCase();


        let suma = 0;
        let multiplicador = 2;


        for (let i = cuerpo.length - 1; i >= 0; i--) {

            suma +=
                Number(cuerpo[i]) * multiplicador;

            multiplicador++;


            if (multiplicador === 8) {

                multiplicador = 2;

            }

        }


        const resultado =
            11 - (suma % 11);


        let digitoCorrecto;


        if (resultado === 11) {

            digitoCorrecto = "0";

        } else if (resultado === 10) {

            digitoCorrecto = "K";

        } else {

            digitoCorrecto =
                resultado.toString();

        }


        return digitoIngresado === digitoCorrecto;

    }


    function mostrarErrorUsuario(campo, mensaje) {

        const error =
            document.getElementById(
                "error-admin-" + campo
            );


        if (error) {

            error.textContent =
                mensaje;

        }

    }


    function limpiarErrorUsuario(campo) {

        const error =
            document.getElementById(
                "error-admin-" + campo
            );


        if (error) {

            error.textContent =
                "";

        }

    }


    formularioUsuario.addEventListener(
        "submit",
        function(evento) {

            evento.preventDefault();


            const run =
                document.getElementById("admin-run")
                    .value
                    .trim()
                    .toUpperCase();

            const nombre =
                document.getElementById("admin-nombre")
                    .value
                    .trim();

            const apellidos =
                document.getElementById("admin-apellidos")
                    .value
                    .trim();

            const correo =
                document.getElementById("admin-correo")
                    .value
                    .trim();

            const fechaNacimiento =
                document.getElementById("admin-fecha")
                    .value;

            const tipo =
                document.getElementById("admin-tipo")
                    .value;

            const direccion =
                document.getElementById("admin-direccion")
                    .value
                    .trim();


            let formularioValido = true;


            const campos = [
                "run",
                "nombre",
                "apellidos",
                "correo",
                "tipo",
                "region",
                "comuna",
                "direccion"
            ];


            campos.forEach(function(campo) {

                limpiarErrorUsuario(campo);

            });


            document.getElementById(
                "admin-mensaje-exito"
            ).textContent = "";


            if (run === "") {

                mostrarErrorUsuario(
                    "run",
                    "Ingresa el RUN."
                );

                formularioValido = false;

            } else if (!validarRunAdmin(run)) {

                mostrarErrorUsuario(
                    "run",
                    "El RUN ingresado no es válido."
                );

                formularioValido = false;

            }


            if (nombre === "") {

                mostrarErrorUsuario(
                    "nombre",
                    "Ingresa el nombre."
                );

                formularioValido = false;

            } else if (nombre.length > 50) {

                mostrarErrorUsuario(
                    "nombre",
                    "El nombre no puede superar los 50 caracteres."
                );

                formularioValido = false;

            }


            if (apellidos === "") {

                mostrarErrorUsuario(
                    "apellidos",
                    "Ingresa los apellidos."
                );

                formularioValido = false;

            } else if (apellidos.length > 100) {

                mostrarErrorUsuario(
                    "apellidos",
                    "Los apellidos no pueden superar los 100 caracteres."
                );

                formularioValido = false;

            }


            const correoPermitido =
                /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;


            if (correo === "") {

                mostrarErrorUsuario(
                    "correo",
                    "Ingresa el correo electrónico."
                );

                formularioValido = false;

            } else if (correo.length > 100) {

                mostrarErrorUsuario(
                    "correo",
                    "El correo no puede superar los 100 caracteres."
                );

                formularioValido = false;

            } else if (!correoPermitido.test(correo)) {

                mostrarErrorUsuario(
                    "correo",
                    "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com."
                );

                formularioValido = false;

            }


            if (tipo === "") {

                mostrarErrorUsuario(
                    "tipo",
                    "Selecciona un tipo de usuario."
                );

                formularioValido = false;

            }


            if (region.value === "") {

                mostrarErrorUsuario(
                    "region",
                    "Selecciona una región."
                );

                formularioValido = false;

            }


            if (comuna.value === "") {

                mostrarErrorUsuario(
                    "comuna",
                    "Selecciona una comuna."
                );

                formularioValido = false;

            }


            if (direccion === "") {

                mostrarErrorUsuario(
                    "direccion",
                    "Ingresa la dirección."
                );

                formularioValido = false;

            } else if (direccion.length > 300) {

                mostrarErrorUsuario(
                    "direccion",
                    "La dirección no puede superar los 300 caracteres."
                );

                formularioValido = false;

            }


            if (!formularioValido) {

                return;

            }


            const usuarios =
                obtenerUsuarios();


            const usuarioRepetido =
                usuarios.find(function(usuario) {

                    return usuario.run === run;

                });


            if (usuarioRepetido) {

                mostrarErrorUsuario(
                    "run",
                    "Este RUN ya se encuentra registrado."
                );

                return;

            }


            const nuevoUsuario = {

                run: run,
                nombre: nombre,
                apellidos: apellidos,
                correo: correo,
                fechaNacimiento: fechaNacimiento,
                region: region.value,
                comuna: comuna.value,
                direccion: direccion,
                tipo: tipo

            };


            usuarios.push(
                nuevoUsuario
            );


            guardarUsuarios(
                usuarios
            );


            document.getElementById(
                "admin-mensaje-exito"
            ).textContent =
                "Usuario creado correctamente.";


            setTimeout(function() {

                window.location.href =
                    "usuarios.html";

            }, 1000);

        }
    );

}


/* Editar usuario */

const formularioEditarUsuario =
    document.getElementById("form-editar-usuario");


if (formularioEditarUsuario) {

    const regionesEditar = [

        {
            nombre: "Arica y Parinacota",
            comunas: [
                "Arica",
                "Camarones",
                "Putre",
                "General Lagos"
            ]
        },

        {
            nombre: "Tarapacá",
            comunas: [
                "Iquique",
                "Alto Hospicio",
                "Pozo Almonte"
            ]
        },

        {
            nombre: "Antofagasta",
            comunas: [
                "Antofagasta",
                "Calama",
                "Tocopilla"
            ]
        },

        {
            nombre: "Atacama",
            comunas: [
                "Copiapó",
                "Caldera",
                "Vallenar"
            ]
        },

        {
            nombre: "Coquimbo",
            comunas: [
                "La Serena",
                "Coquimbo",
                "Ovalle"
            ]
        },

        {
            nombre: "Valparaíso",
            comunas: [
                "Valparaíso",
                "Viña del Mar",
                "Quilpué",
                "Villa Alemana"
            ]
        },

        {
            nombre: "Metropolitana de Santiago",
            comunas: [
                "Santiago",
                "Maipú",
                "Puente Alto",
                "La Florida",
                "Las Condes",
                "Providencia",
                "Ñuñoa"
            ]
        },

        {
            nombre: "O'Higgins",
            comunas: [
                "Rancagua",
                "Machalí",
                "San Fernando"
            ]
        },

        {
            nombre: "Maule",
            comunas: [
                "Talca",
                "Curicó",
                "Linares"
            ]
        },

        {
            nombre: "Ñuble",
            comunas: [
                "Chillán",
                "Chillán Viejo",
                "San Carlos"
            ]
        },

        {
            nombre: "Biobío",
            comunas: [
                "Concepción",
                "Talcahuano",
                "Los Ángeles",
                "San Pedro de la Paz"
            ]
        },

        {
            nombre: "La Araucanía",
            comunas: [
                "Temuco",
                "Padre Las Casas",
                "Villarrica"
            ]
        },

        {
            nombre: "Los Ríos",
            comunas: [
                "Valdivia",
                "La Unión",
                "Río Bueno"
            ]
        },

        {
            nombre: "Los Lagos",
            comunas: [
                "Puerto Montt",
                "Osorno",
                "Castro"
            ]
        },

        {
            nombre: "Aysén",
            comunas: [
                "Coyhaique",
                "Aysén",
                "Chile Chico"
            ]
        },

        {
            nombre: "Magallanes y la Antártica Chilena",
            comunas: [
                "Punta Arenas",
                "Puerto Natales",
                "Porvenir"
            ]
        }

    ];


    const parametrosUsuario =
        new URLSearchParams(window.location.search);

    const runEditar =
        parametrosUsuario.get("run");


    const usuariosEditar =
        obtenerUsuarios();


    const posicionUsuario =
        usuariosEditar.findIndex(function(usuario) {

            return usuario.run === runEditar;

        });


    if (posicionUsuario === -1) {

        alert(
            "No se encontró el usuario."
        );

        window.location.href =
            "usuarios.html";

    } else {

        const usuarioEditar =
            usuariosEditar[posicionUsuario];


        const regionEditar =
            document.getElementById("editar-region");

        const comunaEditar =
            document.getElementById("editar-comuna");


        regionesEditar.forEach(function(item) {

            regionEditar.innerHTML += `
                <option value="${item.nombre}">
                    ${item.nombre}
                </option>
            `;

        });


        function cargarComunasEditar(
            nombreRegion,
            comunaSeleccionada
        ) {

            comunaEditar.innerHTML = `
                <option value="">
                    Selecciona una comuna
                </option>
            `;


            const regionEncontrada =
                regionesEditar.find(function(item) {

                    return item.nombre === nombreRegion;

                });


            if (!regionEncontrada) {

                comunaEditar.disabled = true;

                return;

            }


            comunaEditar.disabled = false;


            regionEncontrada.comunas.forEach(function(nombreComuna) {

                comunaEditar.innerHTML += `
                    <option value="${nombreComuna}">
                        ${nombreComuna}
                    </option>
                `;

            });


            comunaEditar.value =
                comunaSeleccionada || "";

        }


        document.getElementById("editar-run").value =
            usuarioEditar.run;

        document.getElementById("editar-nombre").value =
            usuarioEditar.nombre;

        document.getElementById("editar-apellidos").value =
            usuarioEditar.apellidos;

        document.getElementById("editar-correo").value =
            usuarioEditar.correo;

        document.getElementById("editar-fecha").value =
            usuarioEditar.fechaNacimiento || "";

        document.getElementById("editar-tipo").value =
            usuarioEditar.tipo || "Cliente";

        regionEditar.value =
            usuarioEditar.region || "";

        document.getElementById("editar-direccion").value =
            usuarioEditar.direccion || "";


        cargarComunasEditar(
            usuarioEditar.region,
            usuarioEditar.comuna
        );


        regionEditar.addEventListener(
            "change",
            function() {

                cargarComunasEditar(
                    regionEditar.value,
                    ""
                );

            }
        );


        function mostrarErrorEditarUsuario(
            campo,
            mensaje
        ) {

            const error =
                document.getElementById(
                    "error-editar-" + campo
                );


            if (error) {

                error.textContent =
                    mensaje;

            }

        }


        function limpiarErrorEditarUsuario(campo) {

            const error =
                document.getElementById(
                    "error-editar-" + campo
                );


            if (error) {

                error.textContent =
                    "";

            }

        }


        formularioEditarUsuario.addEventListener(
            "submit",
            function(evento) {

                evento.preventDefault();


                const nombre =
                    document.getElementById("editar-nombre")
                        .value
                        .trim();

                const apellidos =
                    document.getElementById("editar-apellidos")
                        .value
                        .trim();

                const correo =
                    document.getElementById("editar-correo")
                        .value
                        .trim();

                const fechaNacimiento =
                    document.getElementById("editar-fecha")
                        .value;

                const tipo =
                    document.getElementById("editar-tipo")
                        .value;

                const region =
                    regionEditar.value;

                const comuna =
                    comunaEditar.value;

                const direccion =
                    document.getElementById("editar-direccion")
                        .value
                        .trim();


                let formularioValido = true;


                const campos = [
                    "nombre",
                    "apellidos",
                    "correo",
                    "tipo",
                    "region",
                    "comuna",
                    "direccion"
                ];


                campos.forEach(function(campo) {

                    limpiarErrorEditarUsuario(
                        campo
                    );

                });


                document.getElementById(
                    "mensaje-editar"
                ).textContent = "";


                if (nombre === "") {

                    mostrarErrorEditarUsuario(
                        "nombre",
                        "Ingresa el nombre."
                    );

                    formularioValido = false;

                } else if (nombre.length > 50) {

                    mostrarErrorEditarUsuario(
                        "nombre",
                        "El nombre no puede superar los 50 caracteres."
                    );

                    formularioValido = false;

                }


                if (apellidos === "") {

                    mostrarErrorEditarUsuario(
                        "apellidos",
                        "Ingresa los apellidos."
                    );

                    formularioValido = false;

                } else if (apellidos.length > 100) {

                    mostrarErrorEditarUsuario(
                        "apellidos",
                        "Los apellidos no pueden superar los 100 caracteres."
                    );

                    formularioValido = false;

                }


                const correoPermitido =
                    /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;


                if (correo === "") {

                    mostrarErrorEditarUsuario(
                        "correo",
                        "Ingresa el correo electrónico."
                    );

                    formularioValido = false;

                } else if (correo.length > 100) {

                    mostrarErrorEditarUsuario(
                        "correo",
                        "El correo no puede superar los 100 caracteres."
                    );

                    formularioValido = false;

                } else if (!correoPermitido.test(correo)) {

                    mostrarErrorEditarUsuario(
                        "correo",
                        "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com."
                    );

                    formularioValido = false;

                }


                if (tipo === "") {

                    mostrarErrorEditarUsuario(
                        "tipo",
                        "Selecciona un tipo de usuario."
                    );

                    formularioValido = false;

                }


                if (region === "") {

                    mostrarErrorEditarUsuario(
                        "region",
                        "Selecciona una región."
                    );

                    formularioValido = false;

                }


                if (comuna === "") {

                    mostrarErrorEditarUsuario(
                        "comuna",
                        "Selecciona una comuna."
                    );

                    formularioValido = false;

                }


                if (direccion === "") {

                    mostrarErrorEditarUsuario(
                        "direccion",
                        "Ingresa la dirección."
                    );

                    formularioValido = false;

                } else if (direccion.length > 300) {

                    mostrarErrorEditarUsuario(
                        "direccion",
                        "La dirección no puede superar los 300 caracteres."
                    );

                    formularioValido = false;

                }


                if (!formularioValido) {

                    return;

                }


                usuariosEditar[posicionUsuario] = {

                    ...usuarioEditar,
                    nombre: nombre,
                    apellidos: apellidos,
                    correo: correo,
                    fechaNacimiento: fechaNacimiento,
                    tipo: tipo,
                    region: region,
                    comuna: comuna,
                    direccion: direccion

                };


                guardarUsuarios(
                    usuariosEditar
                );


                const sesionActual =
                    JSON.parse(
                        localStorage.getItem("sesionLevelUp")
                    );


                if (
                    sesionActual &&
                    sesionActual.run === usuarioEditar.run
                ) {

                    sesionActual.nombre =
                        nombre;

                    sesionActual.correo =
                        correo;

                    sesionActual.tipo =
                        tipo;


                    localStorage.setItem(
                        "sesionLevelUp",
                        JSON.stringify(sesionActual)
                    );

                }


                document.getElementById(
                    "mensaje-editar"
                ).textContent =
                    "Cambios guardados correctamente.";


                setTimeout(function() {

                    window.location.href =
                        "usuarios.html";

                }, 1000);

            }
        );

    }

}


/* Detalle de usuario */

const detalleUsuarioAdmin =
    document.getElementById("detalle-usuario");


if (detalleUsuarioAdmin) {

    const parametrosDetalleUsuario =
        new URLSearchParams(window.location.search);


    const runDetalleUsuario =
        parametrosDetalleUsuario.get("run");


    const usuariosDetalleAdmin =
        obtenerUsuarios();


    const usuarioDetalleAdmin =
        usuariosDetalleAdmin.find(function(usuario) {

            return usuario.run === runDetalleUsuario;

        });


    if (!usuarioDetalleAdmin) {

        alert(
            "No se encontró el usuario."
        );


        window.location.href =
            "usuarios.html";

    } else {

        document.getElementById(
            "detalle-run"
        ).textContent =
            usuarioDetalleAdmin.run;


        document.getElementById(
            "detalle-nombre"
        ).textContent =
            usuarioDetalleAdmin.nombre;


        document.getElementById(
            "detalle-apellidos"
        ).textContent =
            usuarioDetalleAdmin.apellidos;


        document.getElementById(
            "detalle-correo"
        ).textContent =
            usuarioDetalleAdmin.correo;


        document.getElementById(
            "detalle-fecha"
        ).textContent =
            usuarioDetalleAdmin.fechaNacimiento ||
            "No registrada";


        document.getElementById(
            "detalle-tipo"
        ).textContent =
            usuarioDetalleAdmin.tipo ||
            "Cliente";


        document.getElementById(
            "detalle-region"
        ).textContent =
            usuarioDetalleAdmin.region ||
            "No registrada";


        document.getElementById(
            "detalle-comuna"
        ).textContent =
            usuarioDetalleAdmin.comuna ||
            "No registrada";


        document.getElementById(
            "detalle-direccion"
        ).textContent =
            usuarioDetalleAdmin.direccion ||
            "No registrada";


        document.getElementById(
            "boton-editar-detalle"
        ).href =
            "usuario-editar.html?run=" +
            usuarioDetalleAdmin.run;

    }

}