// Importar el módulo express para crear un servidor web
import express from 'express';

// Definir el puerto en el que el servidor escuchará las solicitudes
const PORT = 3000;

// Crear una instancia de la aplicación Express
const app = express();

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());
// Middleware para parsear el cuerpo de las solicitudes con datos URL-encoded
app.use(express.urlencoded({ extended: true }));

// Definir la ruta raíz ("/") y manejar las solicitudes GET
app.get('/', (req, res) => {
    // Establecer el tipo de contenido de la respuesta como texto plano
    res.setHeader('Content-Type', 'text/plain');
    // Enviar una respuesta con estado 200 y un mensaje 'OK'
    res.status(200).send('OK');
});

// Definir un array de usuarios como base de datos en memoria
let usuarios = [
    { id: 1, nombre: "Luciana", email: "luciana@test.com", password: "123", rol: "user" },
    { id: 2, nombre: "Juan", email: "juan@test.com", password: "123", rol: "user" },
    { id: 3, nombre: "Romina", email: "romina@test.com", password: "123", rol: "admin" },
];

// Definir la ruta "/usuarios" y manejar las solicitudes GET
app.get("/usuarios", (req, res) => {
    // Enviar la lista de usuarios con estado 200
    res.status(200).send(usuarios);
});

// Definir la ruta "/usuarios" y manejar las solicitudes POST para agregar un nuevo usuario
app.post("/usuarios", (req, res) => {
    // Enviar la información del nuevo usuario recibido en el cuerpo de la solicitud con estado 201
    res.status(201).send({ nuevoUsuario: req.body });
});

// Definir la ruta "/usuarios/:id" y manejar las solicitudes GET para obtener un usuario específico por ID
app.get("/usuarios/:id", (req, res) => {
    // Simular un error aleatorio con una probabilidad del 50%
    if (Math.random() > 0.5) {
        return res.status(500).send(`Error inesperado. Reintente en unos minutos`);
    }

    // Desestructurar el parámetro 'id' de la URL
    let { id } = req.params;
    // Convertir el ID a número
    id = Number(id);
    
    // Verificar si el ID es un número válido
    if (isNaN(id)) {
        return res.status(400).send(`Error, el id debe ser numérico`); // Enviar un mensaje de error si no es numérico
    }

    // Buscar el usuario por ID en el array de usuarios
    let usuario = usuarios.find(u => u.id === id);
    
    // Verificar si se encontró al usuario
    if (!usuario) {
        return res.status(404).send(`No existen usuarios con id ${id}`); // Enviar un mensaje si no se encuentra el usuario
    }

    // Enviar el usuario encontrado como respuesta con estado 200
    res.status(200).send(usuario);
});

// Hacer que la aplicación escuche en el puerto definido y mostrar un mensaje en consola
const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});

/*
Importación del Módulo Express:
import express from 'express';
Se importa el módulo express, que permite crear aplicaciones web y gestionar rutas de manera sencilla.
Definición del Puerto:
const PORT = 3000;
Se define una constante PORT que indica en qué puerto escuchará el servidor (3000).
Creación de la Aplicación Express:
const app = express();
Se crea una instancia de la aplicación Express utilizando express(). Esta instancia se utilizará para definir rutas y manejar solicitudes.
Middleware:
app.use(express.json());
Este middleware permite que las solicitudes entrantes con cuerpos JSON sean parseadas automáticamente a objetos JavaScript.
app.use(express.urlencoded({ extended: true }));
Este middleware permite que las solicitudes entrantes con datos URL-encoded sean parseadas a objetos JavaScript. 
La opción extended: true permite usar librerías como qs para parsear los datos.
Ruta Raíz (/):
Se define una ruta para manejar solicitudes GET a la raíz del servidor.
Se establece el tipo de contenido de la respuesta como texto plano.
Se envía una respuesta con estado 200 y un mensaje 'OK'.
Base de Datos Simulada:
Se define un array usuarios que actúa como una base de datos en memoria con información sobre varios usuarios.
Ruta /usuarios (GET):
Se define una ruta para manejar solicitudes GET a /usuarios.
Se envía la lista completa de usuarios como respuesta con estado 200.
Ruta /usuarios (POST):
Se define una ruta para manejar solicitudes POST a /usuarios.
Se envía la información del nuevo usuario recibido en el cuerpo de la solicitud como respuesta con estado 201.
Ruta /usuarios/:id:
Se define una ruta para manejar solicitudes GET a /usuarios/:id, donde :id es un parámetro dinámico.
Se simula un error aleatorio con una probabilidad del 50%. Si ocurre este error, se envía un mensaje de error con estado 500.
Se desestructura el parámetro id desde los parámetros de la URL.
Se convierte el ID a número y se verifica si es válido; si no lo es, se envía un mensaje de error con estado 400.
Se busca al usuario por ID en el array de usuarios; si no se encuentra, se envía un mensaje con estado 404.
Si se encuentra al usuario, se envía su información como respuesta con estado 200.
Escuchar Solicitudes:
const server = app.listen(PORT, () => {...});
La aplicación escucha en el puerto definido (PORT) y muestra un mensaje en consola indicando que el servidor está escuchando.
Resumen
Este código proporciona una estructura básica para un servidor web utilizando Express.js. 
Permite gestionar usuarios mediante varias rutas, incluyendo la capacidad de obtener todos los usuarios, agregar nuevos usuarios y buscar usuarios específicos por ID. 
También incluye manejo básico de errores y respuestas adecuadas según diferentes situaciones.
*/