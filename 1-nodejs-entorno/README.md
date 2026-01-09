# Curso de Node.js - Módulo 1: Entorno de Node.js y Fundamentos de JavaScript

**¿Qué es JavaScript?**
JavaScript es un lenguaje de programación interpretado, dinámico y de alto nivel, utilizado principalmente para el desarrollo web. 

**¿Qué es Node.js?**

Node.js es un entorno de ejecución de JavaScript construido sobre el motor V8 de Chrome que permite ejecutar JavaScript fuera del navegador.

**Características principales:**
- Motor V8 (el mismo de Google Chrome)
- Event-driven (basado en eventos)
- Non-blocking I/O (operaciones asíncronas)
- Single-threaded con Event Loop

**Instalación y verificación:**

```bash
# Verificar versión de Node.js
node --version
# Salida: v20.11.0

# Verificar versión de npm
npm --version
# Salida: 10.2.4
```

**Ejecutar JavaScript con Node.js:**

1. **REPL (Read-Eval-Print-Loop)** - Consola interactiva:

```bash
# Iniciar REPL
node

> console.log("Hola desde Node.js")
Hola desde Node.js
> const suma = 2 + 2
> suma
4
> .exit  # Salir del REPL
```

2. **Ejecutar archivos JavaScript:**

```javascript
// archivo: hola.js
console.log("¡Hola desde Node.js!");

const nombre = "Genarold";
const edad = 25;

console.log(`Mi nombre es ${nombre} y tengo ${edad} años`);
```

```bash
# Ejecutar el archivo
node hola.js
# Salida: ¡Hola desde Node.js!
#         Mi nombre es Genarold y tengo 25 años
```

**Diferencias entre Node.js y el navegador:**

Aunque ambos ejecutan JavaScript, tienen propósitos diferentes:
- **Navegador**: diseñado para interactuar con páginas web (DOM, ventanas, eventos del usuario)
- **Node.js**: diseñado para operaciones de servidor (archivos, red, procesos del sistema)

```javascript
// ❌ No disponible en Node.js (solo en navegador)
// window          - Objeto global del navegador
// document        - Manipulación del DOM/HTML
// alert()         - Ventanas emergentes
// localStorage    - Almacenamiento local

// ✅ Solo en Node.js (no en navegador)
// global          - Objeto global de Node
// process         - Información del proceso y sistema
// __dirname       - Ruta del directorio actual
// __filename      - Ruta del archivo actual
// require()       - Importar módulos CommonJS

// ✅ Disponible en ambos
// console.log()   - Imprimir en consola
// setTimeout()    - Ejecutar código después de un tiempo
// setInterval()   - Ejecutar código repetidamente
```

**Introducción a npm (Node Package Manager):**

npm es el gestor de paquetes de Node.js que permite:
- Instalar librerías de terceros
- Gestionar dependencias del proyecto
- Ejecutar scripts personalizados
- Publicar tus propios paquetes
- Puedes visitar [npmjs.com](https://www.npmjs.com/) para explorar paquetes disponibles.

**Inicializar un proyecto con npm:**

```bash
# Crear carpeta del proyecto
mkdir mi-proyecto-node
cd mi-proyecto-node

# Inicializar proyecto (modo interactivo)
npm init

# O con valores por defecto
npm init -y

# Esto crea el archivo package.json
```

## 📂 Estructura de Ejemplos

### Tema 1.1: Node.js, npm y ejecución de JavaScript

- **01-hola-nodejs.js** - Primer script con Node.js
- **02-diferencias-node-browser.js** - Diferencias entre Node.js y navegador
- **03-primer-script.js** - Script completo con funciones

```bash
node examples/01-hola-nodejs.js
node examples/02-diferencias-node-browser.js
node examples/03-primer-script.js
```

### Tema 1.2: Fundamentos de JavaScript

- **04-variables.js** - Variables y constantes (const, let, var)
- **05-tipos-datos.js** - Tipos de datos primitivos
- **06-objetos.js** - Objetos y métodos
- **07-arrays.js** - Arrays y operaciones básicas
- **08-sets-maps.js** - Sets y Maps
- **09-funciones.js** - Funciones (declaración, expresión, arrow)
- **10-desestructuracion.js** - Desestructuración de objetos y arrays
- **11-spread-operator.js** - Spread operator
- **12-metodos-arrays.js** - Métodos de arrays (map, filter, reduce, etc.)
- **13-sistema-tareas.js** - Ejemplo práctico: Sistema de tareas

```bash
node examples/04-variables.js
node examples/05-tipos-datos.js
node examples/06-objetos.js
node examples/07-arrays.js
node examples/08-sets-maps.js
node examples/09-funciones.js
node examples/10-desestructuracion.js
node examples/11-spread-operator.js
node examples/12-metodos-arrays.js
node examples/13-sistema-tareas.js
```

### Tema 1.3: Asincronía en Node.js

- **14-asincronia-basica.js** - Código bloqueante vs no bloqueante
- **15-promesas.js** - Promesas (Promises)
- **16-async-await.js** - Async/Await
- **17-promise-all.js** - Promise.all, race, allSettled

```bash
node examples/14-asincronia-basica.js
node examples/15-promesas.js
node examples/16-async-await.js
node examples/17-promise-all.js
```

### Tema 1.4: Módulos nativos de Node.js

- **18-modulo-fs.js** - Módulo fs (File System) - Síncrono
- **19-modulo-fs-async.js** - Módulo fs con Promises - Asíncrono
- **20-modulo-path.js** - Módulo path (Manejo de rutas)
- **21-modulo-os.js** - Módulo os (Sistema operativo)
- **22-logger-sistema.js** - Ejemplo completo: Logger y monitor del sistema

```bash
node examples/18-modulo-fs.js
node examples/19-modulo-fs-async.js
node examples/20-modulo-path.js
node examples/21-modulo-os.js
node examples/22-logger-sistema.js
```

## 📝 Notas

- Todos los ejemplos son independientes y pueden ejecutarse por separado
- Los ejemplos que crean archivos (18, 19, 22)

## 🎯 Orden recomendado

Se recomienda seguir el orden numérico de los archivos, ya que cada uno construye sobre conceptos anteriores.
