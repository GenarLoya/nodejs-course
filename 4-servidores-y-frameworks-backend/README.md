# 📦 Express.js + Zod + Dotenv + SQLite

## 🚀 Express.js

**Express.js** es un *framework minimalista de servidor web para Node.js* usado para construir **APIs y aplicaciones backend**.

### ¿Para qué sirve?

* Manejo de **rutas HTTP**
* Uso de **middlewares**
* Creación de **APIs REST**

### Características

* Simple y flexible
* Gran ecosistema
* Framework de facto en Node.js

### Ejemplo básico

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hola desde Express!');
});

app.listen(3000);
```

---

## 🧠 Zod

**Zod** es una librería de **validación de esquemas** para JavaScript y TypeScript que también **infiere tipos automáticamente**.

### ¿Qué hace?

* Valida datos (body, params, query)
* Evita lógica manual de validación
* Mejora la seguridad y mantenibilidad

### Características

* Ligera
* Sin dependencias
* Ideal para APIs

### Ejemplo de esquema

```js
const { z } = require('zod');

const UserSchema = z.object({
  name: z.string(),
  age: z.number().min(0)
});

const user = UserSchema.parse({ name: 'Ana', age: 25 });
```

---

## 🔗 Express + Zod

Zod se usa como **capa de validación antes de procesar la request**.

```js
const express = require('express');
const { z } = require('zod');

const app = express();
app.use(express.json());

const userSchema = z.object({
  name: z.string(),
  email: z.string().email()
});

app.post('/user', (req, res) => {
  const data = userSchema.parse(req.body);
  res.json(data);
});
```

---

## 🧪 Dotenv — Variables de entorno

**dotenv** carga variables desde un archivo `.env` a `process.env`.

### ¿Por qué usarlo?

* No hardcodear secretos
* Separar configuración por entorno
* Mayor seguridad

### Instalación

```bash
npm install dotenv
```

### Archivo `.env`

```env
PORT=3000
DB_PATH=./database.sqlite
```

### Uso

```js
require('dotenv').config();
// o
import 'dotenv/config';

console.log(process.env.PORT);
```

---

## 🗄️ SQLite

**SQLite** es una base de datos **ligera, embebida y sin servidor** que se guarda en un solo archivo `.sqlite`.

### ¿Por qué usar SQLite?

* No requiere servidor
* Ideal para proyectos pequeños y medianos
* Muy rápida
* Fácil de desplegar

---

## 📦 Librería recomendada: better-sqlite3

### Ventajas

* Muy rápida
* API simple
* Sin callbacks
* Perfecta para Express

### Instalación

```bash
npm install better-sqlite3
```

---

## 🔌 SQLite + Dotenv

```js
require('dotenv').config();
const Database = require('better-sqlite3');

const db = new Database(process.env.DB_PATH);

// Crear tabla si no existe
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  )
`).run();

module.exports = db;
```

---

## 📡 Express + SQLite

```js
const express = require('express');
const db = require('./db');

const app = express();

app.get('/users', (req, res) => {
  const users = db.prepare('SELECT * FROM users').all();
  res.json(users);
});
```

---

## 🔐 Express + Zod + SQLite (insert seguro)

Validas datos **antes de insertarlos**.

```js
const { z } = require('zod');
const db = require('./db');

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email()
});

app.post('/users', (req, res) => {
  const data = userSchema.parse(req.body);

  db.prepare(
    'INSERT INTO users (name, email) VALUES (?, ?)'
  ).run(data.name, data.email);

  res.status(201).json({ message: 'Usuario creado' });
});
```

✔ Validación
✔ Sin servidor
✔ SQL seguro
✔ Código limpio

---

## 🧩 Resumen del stack

| Herramienta    | Función                |
| -------------- | ---------------------- |
| **Express.js** | Servidor HTTP / API    |
| **Zod**        | Validación de datos    |
| **Dotenv**     | Variables de entorno   |
| **SQLite**     | Base de datos embebida |

---

### 🧠 ¿Cuándo elegir SQLite?

✅ Proyectos personales
✅ Prototipos
✅ APIs pequeñas/medianas
✅ Apps offline
❌ Sistemas con alta concurrencia masiva
