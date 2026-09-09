# LEVEL-UP GAMER

LEVEL-UP GAMER es una tienda web de productos gamer desarrollada como proyecto académico para la asignatura Desarrollo Fullstack II.

El sitio permite navegar por un catálogo de productos, revisar información detallada, utilizar un carrito de compras, registrarse, iniciar sesión y acceder a funcionalidades administrativas según el tipo de usuario.

---

## Objetivo del proyecto

El objetivo fue desarrollar una tienda web utilizando HTML, CSS y JavaScript, aplicando los contenidos aprendidos durante la asignatura.

El proyecto incluye navegación entre páginas, formularios con validaciones, manejo del DOM, almacenamiento local, sesiones de usuario, carrito de compras y un panel de administración.

---

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- LocalStorage
- Git
- GitHub
- Visual Studio Code
- Live Server

No se utilizó backend ni base de datos, por lo que la información se almacena localmente en el navegador mediante LocalStorage.

---

## Funcionalidades

### Tienda

- Página de inicio.
- Catálogo de productos.
- Filtro de productos por categoría.
- Búsqueda de productos.
- Ordenamiento por precio.
- Vista detallada de cada producto.
- Carrito de compras.
- Modificación de cantidades.
- Eliminación de productos del carrito.
- Cálculo automático de subtotal y total.
- Persistencia del carrito mediante LocalStorage.

### Usuarios

- Registro de usuarios.
- Validación de RUN chileno.
- Validación de correo electrónico.
- Validación de contraseña.
- Validación de mayoría de edad.
- Selección dinámica de región y comuna.
- Inicio de sesión.
- Sesión persistente utilizando LocalStorage.
- Cierre de sesión.
- Tipos de usuario:
  - Administrador.
  - Cliente.
  - Vendedor.

### Beneficio Duoc

Los usuarios registrados con correos pertenecientes a los dominios:

- `@duoc.cl`
- `@profesor.duoc.cl`

reciben automáticamente un 20% de descuento en el carrito de compras.

### Panel de administración

El proyecto incluye un panel independiente para administrar información del sistema.

#### Productos

- Listar productos.
- Crear productos.
- Editar productos.
- Ver detalle de productos.
- Controlar stock.
- Configurar stock crítico.
- Mostrar advertencias de stock crítico.
- Persistir los cambios mediante LocalStorage.

#### Usuarios

- Listar usuarios registrados.
- Crear usuarios.
- Editar usuarios.
- Ver detalle de usuarios.
- Eliminar usuarios.
- Asignar tipos de usuario.
- Administrar región, comuna y dirección.

### Sesiones y acceso

El sistema identifica el tipo de usuario al iniciar sesión y utiliza esa información para controlar el acceso al panel administrativo.

Los usuarios sin una sesión válida no pueden acceder directamente al panel administrativo.

---

## Blog y contacto

El sitio también contiene:

- Sección Nosotros.
- Blog.
- Artículos individuales.
- Contenido multimedia.
- Formulario de contacto.
- Validaciones personalizadas mediante JavaScript.

---

## Estructura del proyecto

```text
LEVEL-UP-GAMER/
│
├── index.html
├── productos.html
├── detalle-producto.html
├── carrito.html
├── registro.html
├── login.html
├── nosotros.html
├── blog.html
├── blog1.html
├── blog2.html
├── contacto.html
│
├── admin/
│   ├── index.html
│   ├── productos.html
│   ├── producto-nuevo.html
│   ├── producto-editar.html
│   ├── producto-detalle.html
│   ├── usuarios.html
│   ├── usuario-nuevo.html
│   ├── usuario-editar.html
│   └── usuario-detalle.html
│
└── assets/
    ├── css/
    │   ├── style.css
    │   └── admin.css
    │
    ├── js/
    │   ├── main.js
    │   ├── productos.js
    │   ├── carrito.js
    │   ├── validaciones.js
    │   └── admin.js
    │
    └── img/