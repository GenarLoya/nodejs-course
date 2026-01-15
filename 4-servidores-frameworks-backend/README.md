# Curso de Node.js - Módulo 4: Servidores y Frameworks Backend

## 4.1 Servidor HTTP básico con Node.js
Aunque en el entorno de npm hay muchos frameworks para crear servidores web, es importante entender cómo funciona un servidor HTTP básico utilizando solo las capacidades nativas de Node.js. Esto nos ayudará a comprender mejor lo que hacen los frameworks por nosotros.

ir a [Ejemplo 01](./src/01-servidor-basico.ts)

### Conceptos basicos de un servidor HTTP
Un servidor HTTP es una aplicación que escucha solicitudes (requests) en un puerto específico y responde con datos (responses). En Node.js, podemos crear un servidor HTTP utilizando el módulo nativo `http`.

### Metodos HTTP comunes
- **GET**: Solicita datos del servidor.
- **POST**: Envía datos al servidor para crear un recurso.
- **PUT**: Actualiza un recurso existente en el servidor. 
- **DELETE**: Elimina un recurso del servidor.
- **PATCH**: Realiza una actualización parcial de un recurso.

### Codigos de estado HTTP
- **100-199**: Informativos
- **200-299**: Éxito (200 OK, 201 Created)
- **300-399**: Redirecciones
- **400-499**: Errores del cliente (400 Bad Request, 404 Not Found)
- **500-599**: Errores del servidor (500 Internal Server Error)

ir a [Ejemplo 02](./src/02-rutas-get.ts)

## 4.2 Introducción a Express.js
Express.js es un framework minimalista y flexible para Node.js que facilita la creación de aplicaciones web y APIs. Proporciona una serie de características robustas para el desarrollo de api rest.

ir a Ejemplos:
- [Ejemplo 03 - Servidor con Express](./src/03-express-basico.ts)
- [Ejemplo 04 - Rutas con Express](./src/04-rutas-metodos.ts)
- [Ejemplo 05 - Params y Query Strings](./src/05-params-query.ts)
- [Ejemplo 06 - request body](./src/06-request-body.ts)

### Ventajas de usar Express.js
- **Simplicidad**: Express tiene una sintaxis sencilla y fácil de aprender.
- **Middleware**: Permite el uso de middlewares para manejar solicitudes y respuestas.
- **Rutas**: Facilita la definición de rutas para manejar diferentes endpoints.
- **Comunidad**: Gran ecosistema de paquetes y una comunidad activa.

## 4.3 Validación de datos con Zod
Zod es una biblioteca de validación y análisis de esquemas para TypeScript y JavaScript. Nos permite definir esquemas para nuestros datos y validar que los datos entrantes cumplan con esos esquemas.

ir a [Ejemplo 07 - Validación con Zod](./src/07-zod-basico.ts)

### Cual es la utilidad de Zod?
Cuando desarrollamos APIs, es muy dificil asegurarnos de que los datos que un cliente envia sean correctos y cumplan con las expectativas de nuestro servidor. Zod nos ayuda a definir reglas claras para los datos y a validar automáticamente las solicitudes entrantes.

### Ventajas de usar Zod
- **Tipado Estático**: Zod se integra perfectamente con TypeScript, proporcionando tipos estáticos basados en los esquemas definidos.
- **Facilidad de Uso**: La sintaxis de Zod es intuitiva y fácil de aprender.
- **Validación Completa**: Permite validar objetos complejos, arrays y tipos personalizados.
- **Manejo de Errores**: Proporciona mensajes de error claros y detallados cuando la validación falla.

### Zod en Express
Podemos integrar Zod en nuestras rutas de Express para validar los datos entrantes antes de procesarlos.

ir a [Ejemplo 08 - Zod con Express](./src/08-zod-express.ts)

## 4.4 Middlewares en Express
Los middlewares son funciones que tienen acceso al objeto de solicitud (req), al objeto de respuesta (res) y a la siguiente función de middleware en el ciclo de solicitud/respuesta de la aplicación. Los middlewares pueden ejecutar código, realizar cambios en la solicitud y respuesta, finalizar el ciclo de solicitud/respuesta o llamar a la siguiente función de middleware.

ir a [Ejemplo 09 - Middlewares en Express](./src/09-middlewares.ts)

### Middlewares avanzados

ir a [Ejemplo 10 - Middlewares avanzados](./src/10-middlewares-avanzados.ts)

### Autenticación de usuarios mediante Middlewares

ir a [Ejemplo 11 - Autenticación con Middlewares](./src/11-jwt-tokens.ts)
