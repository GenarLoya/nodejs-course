# Curso de Node.js - Módulo 2: npm y Gestión de Dependencias

## 2.1 ¿Qué es npm?

npm (Node Package Manager) es el gestor de paquetes predeterminado para Node.js. Permite a los desarrolladores instalar, compartir y gestionar bibliotecas y herramientas de terceros que facilitan el desarrollo de aplicaciones.

### Características principales de npm:
- **Gestión de Paquetes**: Facilita la instalación y actualización de paquetes.
- **Repositorio Centralizado**: Acceso a una vasta colección de paquetes en el registro de npm.
- **Gestión de Dependencias**: Maneja automáticamente las dependencias de los paquetes instalados.
- **Scripts Personalizados**: Permite definir scripts para automatizar tareas comunes.
- **Versionado Semántico**: Utiliza semver para gestionar versiones de paquetes.

### Apectos senciales de npm:
1. **Instalación de Paquetes**: Los paquetes se instalan desde el registro de npm utilizando comandos como `npm install <paquete>`.
2. **node_modules**: Directorio donde se almacenan los paquetes instalados.
3. **package.json**: Archivo que contiene metadatos del proyecto y las dependencias.
4. **package-lock.json**: Archivo que asegura versiones específicas de las dependencias para reproducibilidad.
5. **Scripts**: Comandos personalizados definidos en `package.json` para automatizar tareas.
6. **Dependencies**: Paquetes necesarios para que la aplicación funcione.
7. **DevDependencies**: Dependencias necesarias solo para el desarrollo, no para producción.

## Comandos basicos de npm:
1. `npm init`: Crea un nuevo archivo `package.json`, bajo ciertas preguntas de forma interactiva. Si se usa `-y` se aceptan todas las opciones por defecto.

2. `npm install <paquete>`: Instala un paquete y lo agrega a las dependencias en `package.json`.

  `npm i cowsay` instala el paquete cowsay y lo agrega a las dependencias. (ejemplo aqui)[/examples/1-cowsay.js]

3. `npm install <paquete> --save-dev`: Instala un paquete y lo agrega a las devDependencies en `package.json`.
4. `npm uninstall <paquete>`: Desinstala un paquete y lo elimina de las dependencias en `package.json`.
5. `npm update`: Actualiza todos los paquetes a sus últimas versiones según las restricciones en `package.json`.
6. `npm list`: Muestra una lista de todos los paquetes instalados en el proyecto.
7. `npm outdated`: Muestra una lista de paquetes que tienen versiones más recientes disponibles.
8. `npm run <script>`: Ejecuta un script definido en la sección "scripts" de `package.json`.

## Restricciones de versiones con Semver:
El versionado semántico (semver) utiliza un formato de tres números: `MAJOR.MINOR.PATCH`.
- **MAJOR**: Cambios incompatibles en la API.
- **MINOR**: Nuevas funcionalidades compatibles con versiones anteriores.
- **PATCH**: Correcciones de errores compatibles con versiones anteriores.

### Ejemplos de versiones semver:
- `0.0.1`: Libreria para enviar emails.
- `0.0.1` → `0.0.2`: Corrección de un error en la librería.
- `0.0.2` → `0.1.0`: Se añade la funcionalidad de adjuntar archivos.
- `0.1.0` → `1.0.0`: La funcion `sendEmail` ahora requiere que el parametro `from` sea obligatorio.

### Ejemplos de restricciones de versiones para npm:
Esto es mas claro al ejecutar npm update o npm outdated, donde se muestran las versiones actuales y las disponibles:

- `^1.2.3`: Actualiza a la última versión compatible con la versión mayor (1.x.x).
- `~1.2.3`: Actualiza a la última versión compatible con la versión menor (1.2.x).
- `1.2.3`: Instala exactamente la versión 1.2.3.

## package.json
El archivo `package.json` es un archivo de configuración esencial en proyectos Node.js que utilizan npm. Contiene metadatos sobre el proyecto y gestiona las dependencias y scripts.

### Estructura básica de package.json:
```json
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "description": "Descripción de mi proyecto",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Tu Nombre",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "typescript": "^4.3.5"
  }
}
```

### Campos comunes en package.json:
- `name`: Nombre del proyecto.
- `version`: Versión del proyecto.
- `description`: Breve descripción del proyecto.
- `main`: Punto de entrada principal del proyecto.
- `scripts`: Comandos personalizados para tareas comunes.
- `keywords`: Palabras clave relacionadas con el proyecto.
- `author`: Autor del proyecto.
- `license`: Licencia del proyecto.
- `dependencies`: Paquetes necesarios para que la aplicación funcione.
- `devDependencies`: Paquetes necesarios solo para el desarrollo.

### package-lock.json
El archivo `package-lock.json` se genera automáticamente al instalar paquetes con npm. Asegura que las instalaciones de dependencias sean reproducibles al bloquear las versiones exactas de cada paquete y sus dependencias.

### Scripts en package.json
Los scripts en `package.json` permiten definir comandos personalizados para automatizar tareas comunes. Se ejecutan usando `npm run <script>`.
Ejemplo:
```json
"scripts": {
  "start": "node index.js"
  "dev": "node --watch index.js",
}
```
Ejecutar:
```bash
npm run dev
npm start # o npm run start
```

## 2.2 Uso de npx
npx es una herramienta que viene incluida con npm y permite ejecutar paquetes de Node.js sin necesidad de instalarlos globalmente en el sistema. Esto es especialmente útil para ejecutar herramientas de línea de comandos que no se usan con frecuencia o para probar paquetes rápidamente.

### Características principales de npx:
- **Ejecución sin instalación global**: Permite ejecutar paquetes directamente desde el registro de npm sin instalarlos globalmente.
- **Uso de versiones específicas**: Facilita la ejecución de versiones específicas de paquetes sin afectar otras instalaciones.
- **Ejecución de scripts locales**: Permite ejecutar scripts definidos en el `package.json` del proyecto. 

### Ejemplos de uso de npx:
1. **Ejecutar un paquete sin instalarlo globalmente**:
```bash
npx cowsay "Hola desde npx!"
```

2. **Ejecutar una versión específica de un paquete**:
```bash
npx create-app@5.0.0 my-app
```
3. **Ejecutar scripts locales definidos en package.json**:
```bash
npm i -D serve
npx serve ./assets
```
