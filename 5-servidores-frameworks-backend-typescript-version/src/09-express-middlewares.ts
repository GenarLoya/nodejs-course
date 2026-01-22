// Express middlewares basicos
import express, { Request, Response, NextFunction } from "express";
import { DateTime } from "luxon";

const app = express();

const loggerBasico = (req: Request, res: Response, next: NextFunction) => {
  const inicio = DateTime.now();
  const id = Math.random().toString(16).slice(2, 10);
  console.log(`[${inicio.toString()}] -> ${req.method} ${req.url} - ID: ${id}`);

  // ✅ CORRECTO: usar res.on("finish")
  res.on("finish", () => {
    const fin = DateTime.now();
    console.log(
      `[${inicio.toString()}] <- ${req.method} ${req.url} - ${res.statusCode} - ${fin.toMillis() - inicio.toMillis()}ms - ID: ${id}`,
    );
  });

  next();
};

app.use(loggerBasico);

const antesDeCadaPeticion = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(`-> Antes de la petición`);
  next();
};

app.use(antesDeCadaPeticion);

const despuesDeCadaPeticion = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(`-> Después de la petición`);
  next();
};

app.get("/api/saludo", (req: Request, res: Response, next: NextFunction) => {
  console.log("Procesando la ruta /api/saludo");
  res.status(200).json({
    mensaje: "¡Hola desde Express con middlewares!",
  });
  next();
});

app.use(despuesDeCadaPeticion);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor Express corriendo en http://localhost:${PORT}`);
});
