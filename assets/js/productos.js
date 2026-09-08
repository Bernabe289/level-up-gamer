/* catálogo base de LEVEL-UP */

const productos = [
    {
        id: "JM001",
        nombre: "Catan",
        categoria: "Juegos de Mesa",
        precio: 29990,
        imagen: "assets/img/catan.jpg",
        descripcion: "Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3 a 4 jugadores.",
        fabricante: "CATAN Studio",
        stock: 12
    },

    {
        id: "JM002",
        nombre: "Carcassonne",
        categoria: "Juegos de Mesa",
        precio: 24990,
        imagen: "assets/img/carcassonne.jpg",
        descripcion: "Juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval de Carcassonne.",
        fabricante: "Z-Man Games",
        stock: 9
    },

    {
        id: "AC001",
        nombre: "Control Inalámbrico Xbox Series X",
        categoria: "Accesorios",
        precio: 59990,
        imagen: "assets/img/control-xbox.jpg",
        descripcion: "Control inalámbrico compatible con consolas Xbox y PC, con respuesta táctil mejorada y botones mapeables.",
        fabricante: "Microsoft",
        stock: 15
    },

    {
        id: "AC002",
        nombre: "Auriculares Gamer HyperX Cloud II",
        categoria: "Accesorios",
        precio: 79990,
        imagen: "assets/img/hyperx-cloud2.jpg",
        descripcion: "Auriculares con sonido envolvente, micrófono desmontable y almohadillas diseñadas para largas sesiones de juego.",
        fabricante: "HyperX",
        stock: 8
    },

    {
        id: "CO001",
        nombre: "PlayStation 5",
        categoria: "Consolas",
        precio: 549990,
        imagen: "assets/img/ps5.jpg",
        descripcion: "Consola de última generación de Sony con gráficos de alta calidad y tiempos de carga ultrarrápidos.",
        fabricante: "Sony",
        stock: 5
    },

    {
        id: "CG001",
        nombre: "PC Gamer ASUS ROG Strix",
        categoria: "Computadores Gamers",
        precio: 1299990,
        imagen: "assets/img/asus-rog-strix.jpg",
        descripcion: "Equipo gamer de alto rendimiento diseñado para ofrecer una experiencia fluida en juegos exigentes.",
        fabricante: "ASUS",
        stock: 4
    },

    {
        id: "SG001",
        nombre: "Silla Gamer Secretlab Titan",
        categoria: "Sillas Gamers",
        precio: 349990,
        imagen: "assets/img/secretlab-titan.jpg",
        descripcion: "Silla gamer ergonómica y ajustable, diseñada para mantener la comodidad durante sesiones prolongadas.",
        fabricante: "Secretlab",
        stock: 7
    },

    {
        id: "MS001",
        nombre: "Mouse Gamer Logitech G502 HERO",
        categoria: "Mouse",
        precio: 49990,
        imagen: "assets/img/logitech-g502.jpg",
        descripcion: "Mouse gamer con sensor de alta precisión y botones personalizables para un mayor control.",
        fabricante: "Logitech",
        stock: 18
    },

    {
        id: "MP001",
        nombre: "Mousepad Razer Goliathus Extended Chroma",
        categoria: "Mousepad",
        precio: 29990,
        imagen: "assets/img/razer-goliathus.jpg",
        descripcion: "Mousepad extendido con superficie uniforme e iluminación RGB personalizable.",
        fabricante: "Razer",
        stock: 20
    },

    {
        id: "PP001",
        nombre: "Polera Gamer Personalizada Level-Up",
        categoria: "Poleras Personalizadas",
        precio: 14990,
        imagen: "assets/img/polera-levelup.jpg",
        descripcion: "Polera gamer personalizable con gamer tag o diseño favorito.",
        fabricante: "Level-Up Gamer",
        stock: 25
    }
];


/* misma tarjeta para el home y el catálogo */

function crearTarjetaProducto(producto) {

    return `
        <article class="producto-card">

            <a href="detalle-producto.html?id=${producto.id}">
                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}">
            </a>

            <p class="producto-categoria">
                ${producto.categoria}
            </p>

            <h3>
                <a href="detalle-producto.html?id=${producto.id}">
                    ${producto.nombre}
                </a>
            </h3>

            <p class="producto-precio">
                $${producto.precio.toLocaleString("es-CL")}
            </p>

            <button
                type="button"
                class="boton-agregar"
                data-id="${producto.id}">
                Añadir al carrito
            </button>

        </article>
    `;
}


function mostrarProductos(lista, contenedor) {

    contenedor.innerHTML = lista
        .map(crearTarjetaProducto)
        .join("");

}


/* portada */

const productosDestacados =
    document.getElementById("productos-destacados");

if (productosDestacados) {

    const idsDestacados = [
        "AC001",
        "AC002",
        "CO001",
        "MS001"
    ];

    const destacados = productos.filter(function(producto) {

        return idsDestacados.includes(producto.id);

    });

    mostrarProductos(destacados, productosDestacados);
}


/* catálogo completo */

const listaProductos =
    document.getElementById("lista-productos");

const buscador =
    document.getElementById("buscar-producto");

const filtroCategoria =
    document.getElementById("filtro-categoria");

const ordenPrecio =
    document.getElementById("orden-precio");

const cantidadProductos =
    document.getElementById("cantidad-productos");


function aplicarFiltros() {

    let resultado = [...productos];

    const texto =
        buscador.value.trim().toLowerCase();

    const categoria =
        filtroCategoria.value;

    const orden =
        ordenPrecio.value;


    if (texto !== "") {

        resultado = resultado.filter(function(producto) {

            return producto.nombre
                .toLowerCase()
                .includes(texto);

        });

    }


    if (categoria !== "todos") {

        resultado = resultado.filter(function(producto) {

            return producto.categoria === categoria;

        });

    }


    if (orden === "menor") {

        resultado.sort(function(a, b) {

            return a.precio - b.precio;

        });

    }


    if (orden === "mayor") {

        resultado.sort(function(a, b) {

            return b.precio - a.precio;

        });

    }


    mostrarProductos(resultado, listaProductos);

    cantidadProductos.textContent =
        resultado.length === 1
            ? "1 producto"
            : `${resultado.length} productos`;
}


if (listaProductos) {

    mostrarProductos(productos, listaProductos);

    buscador.addEventListener(
        "input",
        aplicarFiltros
    );

    filtroCategoria.addEventListener(
        "change",
        aplicarFiltros
    );

    ordenPrecio.addEventListener(
        "change",
        aplicarFiltros
    );

}


/* detalle del producto */

const detalleNombre =
    document.getElementById("detalle-nombre");

if (detalleNombre) {

    const parametros =
        new URLSearchParams(window.location.search);

    const idProducto =
        parametros.get("id");


    const productoDetalle =
        productos.find(function(producto) {

            return producto.id === idProducto;

        });


    if (productoDetalle) {

        document.getElementById("detalle-imagen").src =
            productoDetalle.imagen;

        document.getElementById("detalle-imagen").alt =
            productoDetalle.nombre;


        document.getElementById("detalle-categoria").textContent =
            productoDetalle.categoria;


        document.getElementById("detalle-nombre").textContent =
            productoDetalle.nombre;


        document.getElementById("detalle-codigo").textContent =
            productoDetalle.id;


        document.getElementById("detalle-descripcion").textContent =
            productoDetalle.descripcion;


        document.getElementById("detalle-fabricante").textContent =
            productoDetalle.fabricante;


        document.getElementById("detalle-precio").textContent =
            "$" + productoDetalle.precio.toLocaleString("es-CL");


        document.getElementById("detalle-stock").textContent =
            productoDetalle.stock + " unidades disponibles";


        const cantidad =
            document.getElementById("cantidad");

        cantidad.max =
            productoDetalle.stock;


        const botonDetalle =
            document.getElementById("boton-detalle-carrito");

        botonDetalle.dataset.id =
            productoDetalle.id;


        document.title =
            productoDetalle.nombre + " - Level-Up Gamer";

    } else {

        detalleNombre.textContent =
            "Producto no encontrado";

        document.getElementById("detalle-descripcion").textContent =
            "No pudimos encontrar el producto seleccionado.";

        document.getElementById("boton-detalle-carrito").style.display =
            "none";
    }

}