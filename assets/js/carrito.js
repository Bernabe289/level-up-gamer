/* =========================
   CARRITO DE COMPRAS
========================= */



let carrito =
    JSON.parse(localStorage.getItem("carrito")) || [];


/* =========================
   GUARDAR CARRITO
========================= */

function guardarCarrito() {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}


/* AGREGAR PRODUCTO */

function agregarAlCarrito(idProducto, cantidad = 1) {

    const producto =
        productos.find(function(producto) {

            return producto.id === idProducto;

        });


    if (!producto) {
        return;
    }


    const productoEnCarrito =
        carrito.find(function(item) {

            return item.id === idProducto;

        });


    /* Si ya existe, aumenta cantidad */

    if (productoEnCarrito) {

        productoEnCarrito.cantidad += cantidad;


        /* No permite superar el stock */

        if (productoEnCarrito.cantidad > producto.stock) {

            productoEnCarrito.cantidad =
                producto.stock;

        }

    } else {

        /* Si no existe, lo agrega */

        carrito.push({
            id: producto.id,
            cantidad: cantidad
        });

    }


    guardarCarrito();

    actualizarContadorCarrito();

    mostrarCarrito();

}


/* =========================
   CONTADOR NAVBAR
========================= */

function actualizarContadorCarrito() {

    const contador =
        document.getElementById("contador-carrito");


    if (!contador) {
        return;
    }


    let cantidadTotal = 0;


    carrito.forEach(function(item) {

        cantidadTotal += item.cantidad;

    });


    contador.textContent =
        cantidadTotal;

}


/* =========================
   MOSTRAR CARRITO
========================= */

function mostrarCarrito() {

    const listaCarrito =
        document.getElementById("lista-carrito");


    /* Si no estamos en carrito.html,
       no hace nada */

    if (!listaCarrito) {
        return;
    }


    /* CARRITO VACÍO */

    if (carrito.length === 0) {

        listaCarrito.innerHTML = `
            <p class="carrito-vacio">
                Tu carrito está vacío.
            </p>
        `;

        actualizarResumen();

        return;
    }


    listaCarrito.innerHTML = "";


    carrito.forEach(function(item) {

        const producto =
            productos.find(function(producto) {

                return producto.id === item.id;

            });


        if (!producto) {
            return;
        }


        const subtotalProducto =
            producto.precio * item.cantidad;


        listaCarrito.innerHTML += `

            <article class="item-carrito">


                <!-- IMAGEN -->

                <div class="item-carrito-imagen">

                    <img
                        src="${producto.imagen}"
                        alt="${producto.nombre}">

                </div>



                <!-- INFORMACIÓN -->

                <div class="item-carrito-info">

                    <h3>
                        ${producto.nombre}
                    </h3>


                    <p class="item-carrito-precio">

                        $${producto.precio.toLocaleString("es-CL")}
                        c/u ·

                        $${subtotalProducto.toLocaleString("es-CL")}

                    </p>


                    <div class="item-carrito-cantidad">

                        <label
                            for="cantidad-${producto.id}">

                            Cantidad (máx. ${producto.stock})

                        </label>


                        <input
                            id="cantidad-${producto.id}"
                            class="cantidad-carrito"
                            data-id="${producto.id}"
                            type="number"
                            min="1"
                            max="${producto.stock}"
                            value="${item.cantidad}">

                    </div>

                </div>



                <!-- ELIMINAR -->

                <button
                    type="button"
                    class="boton-eliminar"
                    data-id="${producto.id}">

                    Eliminar

                </button>


            </article>

        `;

    });


    actualizarResumen();

}


/* =========================
   CAMBIAR CANTIDAD
========================= */

function cambiarCantidad(idProducto, nuevaCantidad) {

    const item =
        carrito.find(function(item) {

            return item.id === idProducto;

        });


    const producto =
        productos.find(function(producto) {

            return producto.id === idProducto;

        });


    if (!item || !producto) {
        return;
    }


    /* Evita cantidades menores a 1 */

    if (nuevaCantidad < 1) {

        nuevaCantidad = 1;

    }


    /* Evita superar stock */

    if (nuevaCantidad > producto.stock) {

        nuevaCantidad =
            producto.stock;

    }


    item.cantidad =
        nuevaCantidad;


    guardarCarrito();

    actualizarContadorCarrito();

    mostrarCarrito();

}


/* =========================
   ELIMINAR PRODUCTO
========================= */

function eliminarDelCarrito(idProducto) {

    carrito =
        carrito.filter(function(item) {

            return item.id !== idProducto;

        });


    guardarCarrito();

    actualizarContadorCarrito();

    mostrarCarrito();

}


/* =========================
   RESUMEN
========================= */

function actualizarResumen() {

    const subtotalElemento =
        document.getElementById("subtotal-carrito");

    const descuentoElemento =
        document.getElementById("descuento-carrito");

    const totalElemento =
        document.getElementById("total-carrito");


    if (
        !subtotalElemento ||
        !descuentoElemento ||
        !totalElemento
    ) {
        return;
    }


    let subtotal = 0;


    carrito.forEach(function(item) {

        const producto =
            productos.find(function(producto) {

                return producto.id === item.id;

            });


        if (producto) {

            subtotal +=
                producto.precio * item.cantidad;

        }

    });


    /*
       Por ahora el descuento es 0.
       Más adelante lo conectaremos
       con el inicio de sesión Duoc.
    */

    const descuento = 0;

    const total =
        subtotal - descuento;


    subtotalElemento.textContent =
        "$" + subtotal.toLocaleString("es-CL");


    descuentoElemento.textContent =
        "-$" + descuento.toLocaleString("es-CL");


    totalElemento.textContent =
        "$" + total.toLocaleString("es-CL");

}


/* =========================
   BOTONES AÑADIR
========================= */

document.addEventListener(
    "click",
    function(event) {

        const botonAgregar =
            event.target.closest(".boton-agregar");


        if (!botonAgregar) {
            return;
        }


        const idProducto =
            botonAgregar.dataset.id;


        if (!idProducto) {
            return;
        }


        let cantidad = 1;


        /*
           Si estamos en el detalle,
           toma la cantidad elegida.
        */

        if (
            botonAgregar.id ===
            "boton-detalle-carrito"
        ) {

            const inputCantidad =
                document.getElementById("cantidad");


            if (inputCantidad) {

                cantidad =
                    parseInt(inputCantidad.value);

            }

        }


        agregarAlCarrito(
            idProducto,
            cantidad
        );

    }
);


/* =========================
   BOTONES DEL CARRITO
========================= */

const listaCarrito =
    document.getElementById("lista-carrito");


if (listaCarrito) {


    /* ELIMINAR */

    listaCarrito.addEventListener(
        "click",
        function(event) {

            const botonEliminar =
                event.target.closest(".boton-eliminar");


            if (!botonEliminar) {
                return;
            }


            eliminarDelCarrito(
                botonEliminar.dataset.id
            );

        }
    );



    /* CAMBIAR CANTIDAD */

    listaCarrito.addEventListener(
        "change",
        function(event) {

            if (
                !event.target.classList.contains(
                    "cantidad-carrito"
                )
            ) {
                return;
            }


            const idProducto =
                event.target.dataset.id;


            const nuevaCantidad =
                parseInt(event.target.value);


            cambiarCantidad(
                idProducto,
                nuevaCantidad
            );

        }
    );

}


/* =========================
   INICIO
========================= */

actualizarContadorCarrito();

mostrarCarrito();