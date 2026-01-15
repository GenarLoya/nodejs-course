import express from 'express';

const app = express();
app.use(express.json());

// Base de datos simulada
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  stock: number;
}

const productos: Producto[] = [
  { id: 1, nombre: 'Laptop', precio: 1200, categoria: 'electrónica', stock: 15 },
  { id: 2, nombre: 'Mouse', precio: 25, categoria: 'electrónica', stock: 50 },
  { id: 3, nombre: 'Teclado', precio: 45, categoria: 'electrónica', stock: 30 },
  { id: 4, nombre: 'Monitor', precio: 300, categoria: 'electrónica', stock: 20 },
  { id: 5, nombre: 'Silla', precio: 150, categoria: 'muebles', stock: 10 },
  { id: 6, nombre: 'Escritorio', precio: 200, categoria: 'muebles', stock: 8 },
];

// Ruta con parámetro de ruta (route param)
// Ejemplo: /api/productos/3
app.get('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);

  // Validar que sea un número
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      error: 'El ID debe ser un número',
    });
  }

  const producto = productos.find(p => p.id === id);

  if (!producto) {
    return res.status(404).json({
      success: false,
      error: 'Producto no encontrado',
    });
  }

  res.json({
    success: true,
    data: producto,
  });
});

// Múltiples parámetros de ruta
// Ejemplo: /api/categorias/electrónica/productos/2
app.get('/api/categorias/:categoria/productos/:id', (req, res) => {
  const { categoria, id } = req.params;
  const idNumero = parseInt(id);

  const producto = productos.find(
    p => p.id === idNumero && p.categoria === categoria
  );

  if (!producto) {
    return res.status(404).json({
      success: false,
      error: `Producto no encontrado en la categoría ${categoria}`,
    });
  }

  res.json({
    success: true,
    data: producto,
  });
});

// Query parameters (query strings)
// Ejemplo: /api/productos?categoria=electrónica&orden=precio&limite=3
app.get('/api/productos', (req, res) => {
  const { categoria, orden, limite, minPrecio, maxPrecio } = req.query;

  let resultado = [...productos];

  // Filtrar por categoría si se proporciona
  if (categoria && typeof categoria === 'string') {
    resultado = resultado.filter(p => p.categoria === categoria);
  }

  // Filtrar por precio mínimo
  if (minPrecio && typeof minPrecio === 'string') {
    const min = parseFloat(minPrecio);
    if (!isNaN(min)) {
      resultado = resultado.filter(p => p.precio >= min);
    }
  }

  // Filtrar por precio máximo
  if (maxPrecio && typeof maxPrecio === 'string') {
    const max = parseFloat(maxPrecio);
    if (!isNaN(max)) {
      resultado = resultado.filter(p => p.precio <= max);
    }
  }

  // Ordenar si se especifica
  if (orden === 'precio') {
    resultado.sort((a, b) => a.precio - b.precio);
  } else if (orden === 'precio-desc') {
    resultado.sort((a, b) => b.precio - a.precio);
  } else if (orden === 'nombre') {
    resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
  } else if (orden === 'stock') {
    resultado.sort((a, b) => b.stock - a.stock);
  }

  // Limitar cantidad de resultados
  if (limite && typeof limite === 'string') {
    const lim = parseInt(limite);
    if (!isNaN(lim) && lim > 0) {
      resultado = resultado.slice(0, lim);
    }
  }

  res.json({
    success: true,
    data: resultado,
    total: resultado.length,
    filtros: {
      categoria: categoria || 'todas',
      orden: orden || 'ninguno',
      limite: limite || 'sin límite',
      rangoPrecios: {
        min: minPrecio || 'sin mínimo',
        max: maxPrecio || 'sin máximo',
      },
    },
  });
});

// Buscar productos (combinando params y query)
// Ejemplo: /api/buscar/laptop?limite=5&orden=precio
app.get('/api/buscar/:termino', (req, res) => {
  const { termino } = req.params;
  const { limite, orden } = req.query;

  // Buscar en nombre (case insensitive)
  let resultado = productos.filter(p =>
    p.nombre.toLowerCase().includes(termino.toLowerCase())
  );

  // Ordenar si se especifica
  if (orden === 'precio') {
    resultado.sort((a, b) => a.precio - b.precio);
  } else if (orden === 'nombre') {
    resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  // Limitar resultados
  if (limite && typeof limite === 'string') {
    const lim = parseInt(limite);
    if (!isNaN(lim) && lim > 0) {
      resultado = resultado.slice(0, lim);
    }
  }

  res.json({
    success: true,
    termino,
    data: resultado,
    total: resultado.length,
  });
});

// Ruta de información con múltiples query params opcionales
// Ejemplo: /api/estadisticas?incluir=precios,stock&formato=detallado
app.get('/api/estadisticas', (req, res) => {
  const { incluir, formato } = req.query;

  const estadisticas: any = {
    totalProductos: productos.length,
  };

  // Incluir información adicional basada en query params
  if (incluir && typeof incluir === 'string') {
    const opciones = incluir.split(',');

    if (opciones.includes('precios')) {
      const precios = productos.map(p => p.precio);
      estadisticas.precios = {
        promedio: precios.reduce((a, b) => a + b, 0) / precios.length,
        minimo: Math.min(...precios),
        maximo: Math.max(...precios),
      };
    }

    if (opciones.includes('stock')) {
      const stockTotal = productos.reduce((sum, p) => sum + p.stock, 0);
      estadisticas.stock = {
        total: stockTotal,
        promedioPorProducto: stockTotal / productos.length,
      };
    }

    if (opciones.includes('categorias')) {
      const categorias = [...new Set(productos.map(p => p.categoria))];
      estadisticas.categorias = {
        lista: categorias,
        total: categorias.length,
      };
    }
  }

  // Formato de respuesta
  if (formato === 'detallado') {
    estadisticas.detallesPorCategoria = {};
    const categorias = [...new Set(productos.map(p => p.categoria))];

    categorias.forEach(cat => {
      const productosCat = productos.filter(p => p.categoria === cat);
      estadisticas.detallesPorCategoria[cat] = {
        cantidad: productosCat.length,
        precioPromedio:
          productosCat.reduce((sum, p) => sum + p.precio, 0) /
          productosCat.length,
      };
    });
  }

  res.json({
    success: true,
    data: estadisticas,
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log('\nEjemplos de rutas con parámetros:');
  console.log(`  http://localhost:${PORT}/api/productos/1`);
  console.log(`  http://localhost:${PORT}/api/categorias/electrónica/productos/2`);
  console.log('\nEjemplos con query strings:');
  console.log(`  http://localhost:${PORT}/api/productos?categoria=electrónica`);
  console.log(`  http://localhost:${PORT}/api/productos?orden=precio&limite=3`);
  console.log(`  http://localhost:${PORT}/api/productos?minPrecio=100&maxPrecio=500`);
  console.log('\nEjemplos combinados:');
  console.log(`  http://localhost:${PORT}/api/buscar/monitor?limite=5`);
  console.log(`  http://localhost:${PORT}/api/estadisticas?incluir=precios,stock&formato=detallado`);
});
