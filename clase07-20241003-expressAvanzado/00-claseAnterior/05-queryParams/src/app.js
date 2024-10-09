// Importar el módulo express para crear un servidor web
import express from "express";

// Definir el puerto en el que el servidor escuchará las solicitudes
const PORT = 3000;

// Crear una instancia de la aplicación Express
const app = express();

// Definir la ruta raíz ("/") y manejar las solicitudes GET
app.get("/", (req, res) => {
    // Desestructurar el parámetro 'nombre' de la consulta (query)
    let { nombre } = req.query;
    // Crear un saludo que incluye el nombre si está presente, o una cadena vacía si no
    let saludo = `Hola ${nombre ? nombre : ""}`;

    // Enviar una respuesta que incluye los parámetros de consulta y el saludo
    res.send({
        queryParams: req.query,
        saludo
    });
});

// Definir un array de usuarios como base de datos en memoria
let usuarios = [
    { id: 1, nombre: "Luciana", email: "luciana@test.com", password: "123", rol: "user" },
    { id: 2, nombre: "Juan", email: "juan@test.com", password: "123", rol: "user" },
    { id: 4, nombre: "Juan", email: "juan1@test.com", password: "123", rol: "user" },
    { id: 5, nombre: "Juan", email: "juan2@test.com", password: "123", rol: "user" },
    { id: 3, nombre: "Romina", email: "romina@test.com", password: "123", rol: "admin" },
    { id: 6, nombre: "Juan", email: "juan3@test.com", password: "123", rol: "user" },
];

// Definir la ruta "/usuarios" y manejar las solicitudes GET
app.get("/usuarios", (req, res) => {
    // Desestructurar los parámetros 'nombre' y 'email' de la consulta
    let { nombre, email } = req.query;
    // Inicializar la respuesta con todos los usuarios
    let respuesta = usuarios;

    // Filtrar usuarios por nombre si se proporciona en la consulta
    if (nombre) {
        respuesta = respuesta.filter(u => u.nombre.toLowerCase() === nombre.toLowerCase());
    }
    
    // Filtrar usuarios por email si se proporciona en la consulta
    if (email) {
        respuesta = respuesta.filter(u => u.email.toLowerCase() === email.toLowerCase());
    }

    // Enviar la lista filtrada de usuarios como respuesta
    res.send(respuesta);
});

// Definir la ruta "/usuarios/:id" y manejar las solicitudes GET para obtener un usuario específico por ID
app.get("/usuarios/:id", (req, res) => {
    // Desestructurar el parámetro 'id' de la URL
    let { id } = req.params;
    console.log(typeof id, id); // Mostrar el tipo y valor del ID en consola

    // Convertir el ID a número
    id = Number(id);
    
    // Verificar si el ID es un número válido
    if (isNaN(id)) {
        return res.send(`Ingrese un id numérico`); // Enviar un mensaje de error si no es numérico
    }

    // Buscar el usuario por ID en el array de usuarios
    let usuario = usuarios.find(u => u.id === id);
    
    // Verificar si se encontró el usuario
    if (!usuario) {
        return res.send(`No existen usuarios con id ${id}`); // Enviar un mensaje si no se encuentra el usuario
    }

    // Enviar el usuario encontrado como respuesta
    res.send(usuario);
});

// Hacer que la aplicación escuche en el puerto definido y mostrar un mensaje en consola
app.listen(PORT, () => {
    console.log(`Server online en puerto ${PORT}`);
});

/*
Importación del Módulo Express:
import express from "express";
Se importa el módulo express, que permite crear aplicaciones web y gestionar rutas de manera sencilla.
Definición del Puerto:
const PORT = 3000;
Se define una constante PORT que indica en qué puerto escuchará el servidor (3000).
Creación de la Aplicación Express:
const app = express();
Se crea una instancia de la aplicación Express utilizando express(). 
Esta instancia se utilizará para definir rutas y manejar solicitudes.
Ruta Raíz (/):
Se define una ruta para manejar solicitudes GET a la raíz del servidor.
Se desestructura el parámetro nombre desde los parámetros de consulta (req.query).
Se crea un saludo que incluye el nombre si está presente; de lo contrario, se utiliza una cadena vacía.
Se envía una respuesta que incluye los parámetros de consulta y el saludo.
Base de Datos Simulada:
Se define un array usuarios que actúa como una base de datos en memoria con información sobre varios usuarios.
Ruta /usuarios:
Se define una ruta para manejar solicitudes GET a /usuarios.
Se desestructuran los parámetros nombre y email desde los parámetros de consulta.
La respuesta inicial se establece como todos los usuarios.
Si se proporciona un nombre, se filtran los usuarios por ese nombre.
Si se proporciona un email, se filtran los usuarios por ese email.
Se envía la lista filtrada de usuarios como respuesta.
Ruta /usuarios/:id:
Se define una ruta para manejar solicitudes GET a /usuarios/:id, donde :id es un parámetro dinámico.
Se desestructura el parámetro id desde los parámetros de la URL (req.params).
Se convierte el ID a número.
Se verifica si el ID es numérico; si no lo es, se envía un mensaje de error.
Se busca al usuario por ID en el array de usuarios.
Si no se encuentra al usuario, se envía un mensaje indicando que no existe.
Si se encuentra al usuario, se envía el objeto del usuario como respuesta.
Escuchar Solicitudes:
app.listen(PORT, () => {...});
La aplicación escucha en el puerto definido (PORT) y muestra un mensaje en consola indicando que el servidor está online.
Resumen
Este código proporciona una estructura básica para un servidor web utilizando Express.js. 
Permite saludar a los usuarios mediante parámetros de consulta y gestionar una lista de usuarios con opciones para filtrar por nombre o email y obtener información específica por ID. 
*/