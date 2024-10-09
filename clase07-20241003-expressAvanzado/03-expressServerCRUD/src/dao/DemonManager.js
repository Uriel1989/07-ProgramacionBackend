// Importar el módulo fs para manejar el sistema de archivos
import fs from "fs";

// Definir la clase DemonManager
export class DemonManager {
    // Propiedad estática privada para almacenar la ruta del archivo
    static #path = "";

    // Método estático para establecer la ruta del archivo
    static setPath(rutaArchivo = "") {
        this.#path = rutaArchivo; // Asignar la ruta proporcionada a la propiedad privada #path
    }

    // Método estático asíncrono para obtener los personajes desde el archivo
    static async getPersonajes() {
        // Verificar si el archivo existe
        if (fs.existsSync(this.#path)) {
            // Leer el contenido del archivo y parsearlo a un objeto JavaScript
            return JSON.parse(await fs.promises.readFile(this.#path, { encoding: "utf-8" }));
        } else {
            // Si el archivo no existe, devolver un array vacío
            return [];
        }
    }

    // Método estático privado asíncrono para grabar datos en el archivo
    static async #grabaArchivo(datos = "") {
        // Verificar que los datos sean de tipo string
        if (typeof datos != "string") {
            throw new Error(`error método grabaArchivo - argumento con formato inválido`); // Lanzar un error si el formato es inválido
        }
        // Escribir los datos en el archivo especificado por #path
        await fs.promises.writeFile(this.#path, datos);
    }
}

/*
Importación del Módulo fs:
import fs from "fs";
Se importa el módulo fs, que permite interactuar con el sistema de archivos de Node.js.
Definición de la Clase DemonManager:
export class DemonManager { ... }
Se define una clase llamada DemonManager. La palabra clave export permite que esta clase sea utilizada en otros módulos o archivos que la importen.
Propiedad Estática Privada #path:
static #path = "";
Se declara una propiedad estática privada llamada #path, que se utiliza para almacenar la ruta del archivo. 
Al ser privada, no puede ser accedida directamente desde fuera de la clase.
Método Estático setPath(rutaArchivo = ""):
Este método permite establecer la ruta del archivo.
Se asigna la ruta proporcionada a la propiedad privada #path.
Método Estático Asíncrono getPersonajes():
Este método se utiliza para obtener los personajes desde el archivo especificado por #path.
Primero, verifica si el archivo existe utilizando fs.existsSync().
Si el archivo existe, lee su contenido utilizando fs.promises.readFile() y lo parsea de JSON a un objeto JavaScript utilizando JSON.parse().
Si el archivo no existe, devuelve un array vacío.
Método Estático Privado Asíncrono #grabaArchivo(datos = ""):
Este método se utiliza para grabar datos en el archivo especificado por #path.
Se verifica que los datos sean de tipo string; si no lo son, se lanza un error con un mensaje descriptivo.
Si los datos son válidos, se escribe en el archivo utilizando fs.promises.writeFile().
Resumen
Este código proporciona una estructura básica para gestionar personajes almacenados en un archivo JSON mediante la clase DemonManager. 
Permite establecer la ruta del archivo, obtener los personajes desde ese archivo y grabar datos en él. 
La implementación utiliza métodos estáticos y privados para mantener una buena encapsulación y manejo de errores. 
*/