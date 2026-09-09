/* Registro */

const formulario = document.getElementById("form-registro");

if (formulario) {

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


    const region = document.getElementById("region");
    const comuna = document.getElementById("comuna");
    const inputFechaNacimiento = document.getElementById("fecha-nacimiento");


    /* Fecha máxima para registrarse */

    const hoy = new Date();

    const fechaMaxima = new Date(
        hoy.getFullYear() - 18,
        hoy.getMonth(),
        hoy.getDate()
    );

    const anioMaximo = fechaMaxima.getFullYear();

    const mesMaximo = String(
        fechaMaxima.getMonth() + 1
    ).padStart(2, "0");

    const diaMaximo = String(
        fechaMaxima.getDate()
    ).padStart(2, "0");

    inputFechaNacimiento.max =
        `${anioMaximo}-${mesMaximo}-${diaMaximo}`;


    /* Regiones */

    function cargarRegiones() {

        regiones.forEach(function(item) {

            region.innerHTML += `
                <option value="${item.nombre}">
                    ${item.nombre}
                </option>
            `;

        });

    }


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


    cargarRegiones();


    /* Validación del RUN */

    function validarRun(run) {

        const formatoRun =
            /^[0-9]{6,8}[0-9Kk]$/;


        if (!formatoRun.test(run)) {

            return false;
        }


        const cuerpo =
            run.slice(0, -1);

        const digitoIngresado =
            run.slice(-1).toUpperCase();


        let suma = 0;
        let multiplicador = 2;


        for (let i = cuerpo.length - 1; i >= 0; i--) {

            suma += Number(cuerpo[i]) * multiplicador;

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


    /* Validación de edad */

    function esMayorDeEdad(fechaNacimiento) {

        const nacimiento =
            new Date(fechaNacimiento + "T00:00:00");

        const hoy =
            new Date();


        let edad =
            hoy.getFullYear() -
            nacimiento.getFullYear();


        const diferenciaMes =
            hoy.getMonth() -
            nacimiento.getMonth();


        if (
            diferenciaMes < 0 ||
            (
                diferenciaMes === 0 &&
                hoy.getDate() < nacimiento.getDate()
            )
        ) {

            edad--;
        }


        return edad >= 18;
    }


    /* Relación entre campos y mensajes */

    function obtenerCampo(campo) {

        const camposEspeciales = {
            repetir: "repetir-contrasena",
            fecha: "fecha-nacimiento"
        };


        const idCampo =
            camposEspeciales[campo] || campo;


        return document.getElementById(idCampo);
    }


    function mostrarError(campo, mensaje) {

        const input =
            obtenerCampo(campo);

        const error =
            document.getElementById("error-" + campo);


        input.classList.add("campo-error");

        error.textContent = mensaje;
    }


    function limpiarError(campo) {

        const input =
            obtenerCampo(campo);

        const error =
            document.getElementById("error-" + campo);


        input.classList.remove("campo-error");

        error.textContent = "";
    }


    /* Validaciones del formulario */

    formulario.addEventListener("submit", function(evento) {

        evento.preventDefault();


        const run =
            document.getElementById("run").value.trim();

        const nombre =
            document.getElementById("nombre").value.trim();

        const apellidos =
            document.getElementById("apellidos").value.trim();

        const correo =
            document.getElementById("correo").value.trim();

        const contrasena =
            document.getElementById("contrasena").value;

        const repetirContrasena =
            document.getElementById("repetir-contrasena").value;

        const fechaNacimiento =
            document.getElementById("fecha-nacimiento").value;

        const direccion =
            document.getElementById("direccion").value.trim();


        let formularioValido = true;


        const campos = [
            "run",
            "nombre",
            "apellidos",
            "correo",
            "contrasena",
            "repetir",
            "fecha",
            "region",
            "comuna",
            "direccion"
        ];


        campos.forEach(function(campo) {

            limpiarError(campo);

        });


        document.getElementById("registro-exitoso").textContent = "";


        /* RUN */

        if (run === "") {

            mostrarError(
                "run",
                "Ingresa tu RUN."
            );

            formularioValido = false;

        } else if (!validarRun(run)) {

            mostrarError(
                "run",
                "El RUN ingresado no es válido."
            );

            formularioValido = false;
        }


        /* Nombre */

        if (nombre === "") {

            mostrarError(
                "nombre",
                "Ingresa tu nombre."
            );

            formularioValido = false;

        } else if (nombre.length > 50) {

            mostrarError(
                "nombre",
                "El nombre no puede superar los 50 caracteres."
            );

            formularioValido = false;
        }


        /* Apellidos */

        if (apellidos === "") {

            mostrarError(
                "apellidos",
                "Ingresa tus apellidos."
            );

            formularioValido = false;

        } else if (apellidos.length > 100) {

            mostrarError(
                "apellidos",
                "Los apellidos no pueden superar los 100 caracteres."
            );

            formularioValido = false;
        }


        /* Correo */

        const correoPermitido =
            /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;


        if (correo === "") {

            mostrarError(
                "correo",
                "Ingresa tu correo electrónico."
            );

            formularioValido = false;

        }  else if (correo.length > 100) {

            mostrarError(
                "correo",
                "El correo no puede superar los 100 caracteres."
            );

            formularioValido = false;
    
        }else if (!correoPermitido.test(correo)) {

            mostrarError(
                "correo",
                "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com."
            );

            formularioValido = false;
        }


        /* Contraseña */

        if (contrasena === "") {

            mostrarError(
                "contrasena",
                "Ingresa una contraseña."
            );

            formularioValido = false;

        } else if (
            contrasena.length < 4 ||
            contrasena.length > 10
        ) {

            mostrarError(
                "contrasena",
                "La contraseña debe tener entre 4 y 10 caracteres."
            );

            formularioValido = false;
        }


        /* Repetir contraseña */

        if (repetirContrasena === "") {

            mostrarError(
                "repetir",
                "Repite tu contraseña."
            );

            formularioValido = false;

        } else if (
            repetirContrasena !== contrasena
        ) {

            mostrarError(
                "repetir",
                "Las contraseñas no coinciden."
            );

            formularioValido = false;
        }


        /* Fecha */

        if (fechaNacimiento === "") {

            mostrarError(
                "fecha",
                "Selecciona tu fecha de nacimiento."
            );

            formularioValido = false;

        } else if (!esMayorDeEdad(fechaNacimiento)) {

            mostrarError(
                "fecha",
                "Debes tener al menos 18 años para registrarte."
            );

            formularioValido = false;
        }


        /* Región */

        if (region.value === "") {

            mostrarError(
                "region",
                "Selecciona una región."
            );

            formularioValido = false;
        }


        /* Comuna */

        if (comuna.value === "") {

            mostrarError(
                "comuna",
                "Selecciona una comuna."
            );

            formularioValido = false;
        }


        /* Dirección */

        if (direccion === "") {

            mostrarError(
                "direccion",
                "Ingresa tu dirección."
            );

            formularioValido = false;

        } else if (direccion.length > 300) {

            mostrarError(
                "direccion",
                "La dirección no puede superar los 300 caracteres."
            );

            formularioValido = false;
        }


        if (!formularioValido) {

            return;
        }


        const nuevoUsuario = {
            run: run.toUpperCase(),
            nombre: nombre,
            apellidos: apellidos,
            correo: correo,
            contrasena: contrasena,
            fechaNacimiento: fechaNacimiento,
            region: region.value,
            comuna: comuna.value,
            direccion: direccion,
            tipo: "Cliente"
        };


        let usuarios =
            JSON.parse(
                localStorage.getItem("usuariosLevelUp")
            ) || [];


        const runRegistrado =
            usuarios.find(function(usuario) {

                return usuario.run === nuevoUsuario.run;

            });


        if (runRegistrado) {

            mostrarError(
                "run",
                "Este RUN ya se encuentra registrado."
            );

            return;
        }


        usuarios.push(nuevoUsuario);


        localStorage.setItem(
            "usuariosLevelUp",
            JSON.stringify(usuarios)
        );


        document.getElementById("registro-exitoso").textContent =
            "Cuenta creada correctamente.";


        formulario.reset();


        comuna.innerHTML = `
            <option value="">
                Selecciona una comuna
            </option>
        `;

        comuna.disabled = true;

        /* Ir al login */

        setTimeout(function() {

            window.location.href = "login.html";

        }, 1500);
    });

}

/* Login */

const formularioLogin = document.getElementById("form-login");

if (formularioLogin) {

    function mostrarErrorLogin(campo, mensaje) {

        const input =
            document.getElementById(campo);

        const error =
            document.getElementById("error-" + campo);


        input.classList.add("campo-error");

        error.textContent = mensaje;
    }


    function limpiarErrorLogin(campo) {

        const input =
            document.getElementById(campo);

        const error =
            document.getElementById("error-" + campo);


        input.classList.remove("campo-error");

        error.textContent = "";
    }


    formularioLogin.addEventListener("submit", function(evento) {

        evento.preventDefault();


        const correo =
            document.getElementById("correo").value.trim();

        const contrasena =
            document.getElementById("contrasena").value;


        let formularioValido = true;


        limpiarErrorLogin("correo");
        limpiarErrorLogin("contrasena");

        document.getElementById("login-error").textContent = "";


        /* Correo */

        const correoPermitido =
            /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

        if (correo === "") {

            mostrarErrorLogin(
                "correo",
                "Ingresa tu correo electrónico."
            );

            formularioValido = false;

        } else if (correo.length > 100) {

            mostrarErrorLogin(
                "correo",
                "El correo no puede superar los 100 caracteres."
            );

            formularioValido = false;

        } else if (!correoPermitido.test(correo)) {

            mostrarErrorLogin(
                "correo",
                "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com."
            );

            formularioValido = false;
        }


        /* Contraseña */

        if (contrasena === "") {

            mostrarErrorLogin(
                "contrasena",
                "Ingresa tu contraseña."
            );

            formularioValido = false;

        } else if (
            contrasena.length < 4 ||
            contrasena.length > 10
        ) {

            mostrarErrorLogin(
                "contrasena",
                "La contraseña debe tener entre 4 y 10 caracteres."
            );

            formularioValido = false;
        }


        if (!formularioValido) {

            return;
        }


        /* Buscar el usuario en los registrados */

        const usuarios =
            JSON.parse(localStorage.getItem("usuariosLevelUp")) || [];

        const usuarioEncontrado =
            usuarios.find(function(usuario) {

                return (
                    usuario.correo.toLowerCase() === correo.toLowerCase() &&
                    usuario.contrasena === contrasena
                );

            });


        if (!usuarioEncontrado) {

            document.getElementById("login-error").textContent =
                "Correo o contraseña incorrectos.";

            return;
        }


        /* Guardar la sesión activa */

        localStorage.setItem(
            "sesionLevelUp",
            JSON.stringify({
                run: usuarioEncontrado.run,
                nombre: usuarioEncontrado.nombre,
                correo: usuarioEncontrado.correo,
                tipo: usuarioEncontrado.tipo
            })
        );


        window.location.href = "index.html";

    });

}

/* Contacto */

const formularioContacto = document.getElementById("form-contacto");

if (formularioContacto) {

    function mostrarErrorContacto(campo, mensaje) {

        const input =
            document.getElementById(campo);

        const error =
            document.getElementById("error-" + campo);


        input.classList.add("campo-error");

        error.textContent = mensaje;
    }


    function limpiarErrorContacto(campo) {

        const input =
            document.getElementById(campo);

        const error =
            document.getElementById("error-" + campo);


        input.classList.remove("campo-error");

        error.textContent = "";
    }


    formularioContacto.addEventListener("submit", function(evento) {

        evento.preventDefault();


        const nombre =
            document.getElementById("nombre").value.trim();

        const correo =
            document.getElementById("correo").value.trim();

        const comentario =
            document.getElementById("comentario").value.trim();


        let formularioValido = true;


        limpiarErrorContacto("nombre");
        limpiarErrorContacto("correo");
        limpiarErrorContacto("comentario");

        document.getElementById("contacto-exitoso").textContent = "";


        /* Nombre */

        if (nombre === "") {

            mostrarErrorContacto(
                "nombre",
                "Ingresa tu nombre."
            );

            formularioValido = false;

        } else if (nombre.length > 100) {

            mostrarErrorContacto(
                "nombre",
                "El nombre no puede superar los 100 caracteres."
            );

            formularioValido = false;
        }


        /* Correo */

        const correoPermitido =
            /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;


        if (correo === "") {

            mostrarErrorContacto(
                "correo",
                "Ingresa tu correo electrónico."
            );

            formularioValido = false;

        } else if (correo.length > 100) {

            mostrarErrorContacto(
                "correo",
                "El correo no puede superar los 100 caracteres."
            );

            formularioValido = false;

        } else if (!correoPermitido.test(correo)) {

            mostrarErrorContacto(
                "correo",
                "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com."
            );

            formularioValido = false;
        }


        /* Comentario */

        if (comentario === "") {

            mostrarErrorContacto(
                "comentario",
                "Escribe tu comentario."
            );

            formularioValido = false;

        } else if (comentario.length > 500) {

            mostrarErrorContacto(
                "comentario",
                "El comentario no puede superar los 500 caracteres."
            );

            formularioValido = false;
        }


        if (!formularioValido) {

            return;
        }


        document.getElementById("contacto-exitoso").textContent =
            "Mensaje enviado correctamente.";


        formularioContacto.reset();

    });

}