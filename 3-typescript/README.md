# Curso de Node.js - Módulo 3: TypeScript para desarrollo backend

## 3.1 Introducción a TypeScript

### **¿Qué es TypeScript?**

TypeScript es un superset de JavaScript desarrollado por Microsoft. Esto significa que todo código JavaScript válido también es TypeScript, pero añade características extra pensadas para mejorar la calidad, mantenibilidad y escalabilidad del código, especialmente en proyectos grandes.

### **Diferencias entre TypeScript y JavaScript**
- **Tipado Estático**: TypeScript permite definir tipos de datos para variables, parámetros y retornos de funciones, lo que ayuda a detectar errores en tiempo de compilación.
- **Compilación**: El código TypeScript se compila a JavaScript antes de ejecutarse, lo que garantiza compatibilidad con cualquier entorno que soporte JavaScript.
- **Características Avanzadas**: TypeScript incluye características modernas como interfaces, enumeraciones, decoradores y más, que no están disponibles en JavaScript puro.

### **Ventajas de usar TypeScript en el desarrollo backend**
- **Detección Temprana de Errores**: El tipado estático ayuda a identificar errores antes de ejecutar el código.
- **Mejor Mantenibilidad**: El uso de tipos y estructuras claras facilita la comprensión del código a largo plazo.
- **Autocompletado y Refactorización**: Los editores de código pueden ofrecer mejores sugerencias y herramientas de refactorización gracias a la información de tipos.
- **Escalabilidad**: TypeScript es ideal para proyectos grandes y equipos de desarrollo, ya que facilita la colaboración y el mantenimiento del código.

## 3.2 Configuración inicial de TypeScript en Node.js

### **Instalación de TypeScript**

Para configurar TypeScript en un proyecto Node.js, primero necesitamos instalar las dependencias necesarias:

```bash
npm init -y 
npm i -D typescript tsx @types/node
npx tsc --init
```

**Paquetes instalados:**
- `typescript`: El compilador de TypeScript
- `tsx`: Herramienta para ejecutar archivos TypeScript directamente sin compilar manualmente
- `@types/node`: Definiciones de tipos para las APIs nativas de Node.js

### **Configuración del archivo tsconfig.json**

El archivo `tsconfig.json` controla cómo TypeScript compila nuestro código. Configuración básica recomendada:

```json
{
  "compilerOptions": {
    "rootDir": "./src",           // Directorio fuente
    "outDir": "./build",           // Directorio de salida compilado
    "module": "esnext",            // Sistema de módulos moderno
    "target": "esnext",            // Versión de JavaScript objetivo
    "types": ["node"],             // Incluir tipos de Node.js
    "moduleResolution": "bundler", // Resolución de módulos
    "sourceMap": true,             // Generar mapas de origen para debugging
    "strict": true,                // Habilitar todas las verificaciones estrictas
    "esModuleInterop": true,       // Compatibilidad con módulos ES
    "skipLibCheck": true,          // Acelerar compilación
  },
  "include": ["src/**/*"],         // Archivos a incluir
  "exclude": ["node_modules", "build"] // Archivos a excluir
}
```

### **Estructura del proyecto**

```
3-typescript/
├── src/                    # Código fuente TypeScript (.ts)
│   ├── 01-hola-typescript.ts
│   ├── 02-objetos-interfaces.ts
│   └── ...
├── build/                  # Código compilado JavaScript (.js)
├── node_modules/
├── package.json
└── tsconfig.json
```

### **Comandos útiles**

```bash
# Compilar TypeScript a JavaScript
npx tsc

# Ejecutar archivo TypeScript directamente
npx tsx src/01-hola-typescript.ts

# Compilar en modo watch (recompila automáticamente)
npx tsc --watch
```

---

## Ejemplos de la Sección 3.2

### **01 - Hola TypeScript** (`src/01-hola-typescript.ts`)
Introducción básica a TypeScript con:
- Variables con tipos explícitos (`string`, `number`, `boolean`)
- Funciones con tipos en parámetros y retorno
- Detección de errores en tiempo de compilación

**Ejecutar:**
```bash
npx tsx src/01-hola-typescript.ts
```

---

### **02 - Objetos, Interfaces y Types** (`src/02-objetos-interfaces.ts`)
Cómo estructurar datos con interfaces y types:
- Definición de interfaces para objetos
- Definición de types para objetos
- Propiedades requeridas y opcionales
- Funciones que reciben objetos tipados
- Comparación entre `interface` y `type`
- Ventajas de `type`: uniones de valores literales
- Ejemplos con `Usuario`, `Producto`, `Cliente` y `Pedido`

**Ejecutar:**
```bash
npx tsx src/02-objetos-interfaces.ts
```

---

### **03 - Arrays y Funciones** (`src/03-arrays-funciones.ts`)
Trabajo con colecciones y funciones tipadas:
- Arrays de tipos primitivos
- Arrays de objetos con interfaces
- Funciones con tipos de retorno
- Parámetros opcionales y valores por defecto
- Ejemplo práctico con lista de tareas

**Ejecutar:**
```bash
npx tsx src/03-arrays-funciones.ts
```

---

### **04 - Compilación** (`src/04-compilacion.ts`)
Entendiendo el proceso de compilación:
- Cómo TypeScript se compila a JavaScript
- Archivos generados (.js, .d.ts, .js.map)
- Diferencia entre `tsc` y `tsx`
- Ejemplo práctico con cálculos matemáticos

**Compilar y ejecutar:**
```bash
npx tsc
node build/04-compilacion.js
```

**O ejecutar directamente:**
```bash
npx tsx src/04-compilacion.ts
```

---

### **05 - Módulos de Node.js** (`src/05-modulos-node.ts`)
Integración de TypeScript con módulos nativos de Node.js:
- Uso de `fs` (sistema de archivos)
- Uso de `path` (manejo de rutas)
- Uso de `os` (información del sistema)
- Funciones tipadas que usan módulos nativos

**Ejecutar:**
```bash
npx tsx src/05-modulos-node.ts
```

---

### **06 - Type vs Interface** (`src/06-type-vs-interface.ts`)
Diferencias y similitudes entre `type` e `interface`:
- Similitudes: ambos definen estructuras de objetos
- `interface` se puede extender con `extends`
- `interface` se puede reabrir (declaration merging)
- `type` permite uniones (`|`) e intersecciones (`&`)
- `type` puede crear aliases de cualquier tipo
- Cuándo usar cada uno

**Ejecutar:**
```bash
npx tsx src/06-type-vs-interface.ts
```

**Resumen rápido:**
- **Interface**: Mejor para objetos, clases y APIs públicas
- **Type**: Mejor para tipos complejos, uniones y aliases

---

## Resumen

En esta sección aprendiste a:
- ✅ Instalar y configurar TypeScript en un proyecto Node.js
- ✅ Configurar el archivo `tsconfig.json`
- ✅ Usar tipos básicos (string, number, boolean)
- ✅ Definir interfaces para estructurar objetos
- ✅ Tipar arrays y funciones
- ✅ Compilar TypeScript a JavaScript
- ✅ Integrar TypeScript con módulos nativos de Node.js
- ✅ Entender la diferencia entre `type` e `interface`

**Próximo paso:** En la sección 3.3 profundizaremos en el sistema de tipado de TypeScript con tipos más avanzados.
