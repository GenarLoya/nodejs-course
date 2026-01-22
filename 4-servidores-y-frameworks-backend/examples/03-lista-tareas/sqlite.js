require("dotenv").config({ quiet: true });

const Database = require("better-sqlite3");

// Ruta de la base de datos (ej: ./db.sqlite o :memory:)
const dbPath = process.env.DB_PATH;

if (!dbPath) {
  throw new Error("DB_PATH is not defined in the environment variables");
}

// Abrir la base de datos
const db = new Database(dbPath);

// Activar claves foráneas
db.pragma("foreign_keys = ON");

module.exports = db;
