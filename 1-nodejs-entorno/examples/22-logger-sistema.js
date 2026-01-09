// Ejemplo práctico: Sistema de logging con módulos nativos

const fs = require('fs/promises');
const path = require('path');
const os = require('os');

// Sistema de logging simple
class Logger {
  constructor(logDir = 'logs') {
    this.logDir = logDir;
    this.logFile = path.join(logDir, `log-${this.obtenerFecha()}.txt`);
  }

  async inicializar() {
    try {
      await fs.mkdir(this.logDir, { recursive: true });
      console.log('✓ Logger inicializado');
      await this.info('Logger inicializado correctamente');
    } catch (error) {
      console.error('Error al crear directorio de logs:', error);
    }
  }

  obtenerFecha() {
    const fecha = new Date();
    return fecha.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  async escribir(nivel, mensaje) {
    const timestamp = new Date().toISOString();
    const linea = `[${timestamp}] [${nivel}] ${mensaje}\n`;
    
    try {
      await fs.appendFile(this.logFile, linea);
      console.log(`Log escrito: [${nivel}] ${mensaje}`);
    } catch (error) {
      console.error('Error al escribir log:', error);
    }
  }

  async info(mensaje) {
    await this.escribir('INFO', mensaje);
  }

  async error(mensaje) {
    await this.escribir('ERROR', mensaje);
  }

  async warn(mensaje) {
    await this.escribir('WARN', mensaje);
  }

  async leerLogs() {
    try {
      const contenido = await fs.readFile(this.logFile, 'utf8');
      return contenido;
    } catch (error) {
      console.error('Error al leer logs:', error);
      return null;
    }
  }

  async obtenerEstadisticas() {
    try {
      const stats = await fs.stat(this.logFile);
      return {
        tamaño: stats.size,
        creado: stats.birthtime,
        modificado: stats.mtime
      };
    } catch (error) {
      return null;
    }
  }
}

// Monitor del sistema
class MonitorSistema {
  static obtenerInfoMemoria() {
    const total = os.totalmem();
    const libre = os.freemem();
    const usado = total - libre;
    
    return {
      totalGB: (total / 1024 / 1024 / 1024).toFixed(2),
      libreGB: (libre / 1024 / 1024 / 1024).toFixed(2),
      usadoGB: (usado / 1024 / 1024 / 1024).toFixed(2),
      porcentajeUso: ((usado / total) * 100).toFixed(2)
    };
  }

  static obtenerInfoCPU() {
    const cpus = os.cpus();
    return {
      cantidad: cpus.length,
      modelo: cpus[0].model,
      velocidad: cpus[0].speed
    };
  }

  static obtenerInfoSistema() {
    return {
      plataforma: os.platform(),
      arquitectura: os.arch(),
      version: os.release(),
      hostname: os.hostname(),
      uptimeHoras: (os.uptime() / 60 / 60).toFixed(2)
    };
  }

  static async generarReporte(logger) {
    const reporte = {
      fecha: new Date().toISOString(),
      sistema: this.obtenerInfoSistema(),
      cpu: this.obtenerInfoCPU(),
      memoria: this.obtenerInfoMemoria()
    };

    // Guardar reporte en archivo
    const reportesDir = 'reportes';
    const nombreArchivo = `reporte-${Date.now()}.json`;
    const rutaArchivo = path.join(reportesDir, nombreArchivo);

    await fs.mkdir(reportesDir, { recursive: true });
    await fs.writeFile(rutaArchivo, JSON.stringify(reporte, null, 2));

    if (logger) {
      await logger.info(`Reporte generado: ${nombreArchivo}`);
    }
    
    console.log('\n✓ Reporte generado:', rutaArchivo);
    return reporte;
  }
}

// Uso del sistema
async function main() {
  console.log("=== SISTEMA DE LOGGING Y MONITOREO ===\n");

  // Crear logger
  const logger = new Logger();
  await logger.inicializar();

  // Escribir varios logs
  await logger.info('Aplicación iniciada');
  await logger.info(`Usuario: ${os.userInfo().username}`);
  await logger.info(`Plataforma: ${os.platform()}`);
  await logger.warn('Este es un mensaje de advertencia');

  // Simular un error
  try {
    throw new Error('Error simulado para demostración');
  } catch (error) {
    await logger.error(`Error capturado: ${error.message}`);
  }

  // Mostrar logs
  console.log('\n=== CONTENIDO DEL LOG ===');
  const logs = await logger.leerLogs();
  console.log(logs);

  // Estadísticas del log
  const stats = await logger.obtenerEstadisticas();
  if (stats) {
    console.log('=== ESTADÍSTICAS DEL LOG ===');
    console.log('Tamaño:', stats.tamaño, 'bytes');
    console.log('Creado:', stats.creado);
  }

  // Generar reporte del sistema
  console.log('\n=== GENERANDO REPORTE DEL SISTEMA ===');
  const reporte = await MonitorSistema.generarReporte(logger);
  
  console.log('\n=== INFORMACIÓN DEL SISTEMA ===');
  console.log('Sistema:', reporte.sistema);
  console.log('CPU:', reporte.cpu);
  console.log('Memoria:', reporte.memoria);

  await logger.info('Aplicación finalizada');
  console.log('\n✓ Proceso completado');
}

main().catch(console.error);
