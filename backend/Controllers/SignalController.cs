using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace OIT1_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SignalController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public SignalController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        /// <summary>
        /// Interactuar con FFT en tiempo real via microservicio
        /// </summary>
        [HttpPost("analyze")]
        public async Task<IActionResult> AnalyzeSignal([FromBody] SignalAnalysisRequest request)
        {
            try
            {
                var client = _httpClientFactory.CreateClient("PythonAPI");
                var response = await client.PostAsJsonAsync("/fourier-analyze", request);
                
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadFromJsonAsync<object>();
                    return Ok(result);
                }
                return BadRequest("Error al analizar la señal en el microservicio Python.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error de comunicación: {ex.Message}");
            }
        }

        /// <summary>
        /// Interactuar con filtro pasa-bajos en tiempo real via microservicio
        /// </summary>
        [HttpPost("filter")]
        public async Task<IActionResult> FilterSignal([FromBody] SignalFilterRequest request)
        {
            try
            {
                var client = _httpClientFactory.CreateClient("PythonAPI");
                var response = await client.PostAsJsonAsync("/low-pass-filter", request);
                
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadFromJsonAsync<object>();
                    return Ok(result);
                }
                return BadRequest("Error al filtrar la señal en el microservicio Python.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error de comunicación: {ex.Message}");
            }
        }

        /// <summary>
        /// Pregunta 10: Transformadas de Fourier
        /// </summary>
        [HttpGet("fourier-transform")]
        public IActionResult GetFourierInfo()
        {
            return Ok(new
            {
                question = "Transformadas de Fourier en SciPy",
                definition = "Descomponen señales en frecuencias componentes",
                key_concepts = new[]
                {
                    "FFT (Fast Fourier Transform): Algoritmo eficiente para calcular transformadas",
                    "Espectro de frecuencia: Representación de frecuencias presentes",
                    "Frecuencia de muestreo: Puntos por segundo (Hz)",
                    "Filtrado: Eliminar frecuencias no deseadas"
                },
                scipy_usage = new
                {
                    import = "from scipy import fft, signal",
                    code = @"
import numpy as np
from scipy import fft, signal
import matplotlib.pyplot as plt

# Datos del sensor (ejemplo)
tiempo = np.linspace(0, 10, 1000)
señal = np.sin(2*np.pi*0.5*tiempo) + 0.5*np.random.randn(1000)

# Calcular FFT
freqs = fft.fftfreq(len(señal))
fft_data = fft.fft(señal)

# Aplicar filtro pasa-bajos
frecuencia_corte = 2  # Hz
fs = 100  # Frecuencia de muestreo
nyquist = fs / 2
normalizado = frecuencia_corte / nyquist
b, a = signal.butter(4, normalizado, btype='low')
señal_filtrada = signal.filtfilt(b, a, señal)

# Visualizar resultados
plt.figure(figsize=(12, 6))
plt.subplot(2,1,1)
plt.plot(tiempo, señal, 'b-', label='Original')
plt.subplot(2,1,2)
plt.plot(tiempo, señal_filtrada, 'r-', label='Filtrada')
plt.show()"
                },
                utility = new[]
                {
                    "Análisis de señales de sensores",
                    "Eliminación de ruido",
                    "Detección de patrones",
                    "Compresión de datos",
                    "Procesamiento de audio y video"
                }
            });
        }

        /// <summary>
        /// Pregunta 14: Sensor + DataFrame + Gráfica
        /// </summary>
        [HttpGet("sensor-monitoring")]
        public IActionResult GetSensorMonitoring()
        {
            return Ok(new
            {
                question = "Monitoreo de sensor en tiempo real",
                code = @"
import serial
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime
import time

# Configurar conexión serial
arduino = serial.Serial('COM3', 9600, timeout=1)
time.sleep(2)  # Esperar inicialización

# Crear DataFrame para almacenar datos
df = pd.DataFrame(columns=['timestamp', 'temperature'])

# Configurar gráfica
plt.ion()
fig, ax = plt.subplots()

while True:
    # Leer dato del Arduino
    data = arduino.readline().decode().strip()
    if data:
        # Almacenar en DataFrame
        df = pd.concat([df, pd.DataFrame({
            'timestamp': [datetime.now()],
            'temperature': [float(data)]
        })], ignore_index=True)
        
        # Mantener últimos 100 puntos
        df = df.tail(100)
        
        # Actualizar gráfica
        ax.clear()
        ax.plot(df['timestamp'], df['temperature'], 'b-')
        ax.set_title('Temperatura en Tiempo Real')
        ax.set_xlabel('Tiempo')
        ax.set_ylabel('°C')
        ax.grid(True)
        plt.pause(0.1)
    
    time.sleep(0.5)"
            });
        }

        /// <summary>
        /// Pregunta 15: Filtro pasa-bajos con SciPy
        /// </summary>
        [HttpGet("low-pass-filter")]
        public IActionResult GetLowPassFilter()
        {
            return Ok(new
            {
                question = "Filtro pasa-bajos con SciPy",
                explanation = "Elimina frecuencias altas (ruido) manteniendo las bajas",
                code = @"
import numpy as np
from scipy import signal
import matplotlib.pyplot as plt

# Datos de ejemplo (señal con ruido)
tiempo = np.linspace(0, 10, 1000)
señal_original = np.sin(2*np.pi*0.5*tiempo) + 0.5*np.random.randn(1000)

# Diseñar filtro pasa-bajos
frecuencia_corte = 2  # Frecuencia de corte en Hz
fs = 100  # Frecuencia de muestreo
nyquist = fs / 2
normalizado = frecuencia_corte / nyquist

# Crear filtro Butterworth de orden 4
b, a = signal.butter(4, normalizado, btype='low')
señal_filtrada = signal.filtfilt(b, a, señal_original)

# Visualización
plt.figure(figsize=(12, 8))

plt.subplot(3, 1, 1)
plt.plot(tiempo, señal_original, 'b-', label='Señal Original')
plt.title('Señal Original con Ruido')
plt.grid(True)

plt.subplot(3, 1, 2)
plt.plot(tiempo, señal_filtrada, 'r-', label='Señal Filtrada')
plt.title('Señal después del filtro pasa-bajos')
plt.grid(True)

plt.subplot(3, 1, 3)
# Comparación
plt.plot(tiempo, señal_original, 'b-', alpha=0.5, label='Original')
plt.plot(tiempo, señal_filtrada, 'r-', label='Filtrada')
plt.title('Comparación')
plt.legend()
plt.grid(True)

plt.tight_layout()
plt.show()",
                applications = new[]
                {
                    "Eliminación de ruido en sensores",
                    "Procesamiento de audio",
                    "Análisis de señales biomédicas",
                    "Mejora de calidad de señales"
                }
            });
        }
    }

    public class SignalAnalysisRequest
    {
        public double[] SignalValues { get; set; } = Array.Empty<double>();
        public double SamplingRate { get; set; } = 100.0;
    }

    public class SignalFilterRequest
    {
        public double[] SignalValues { get; set; } = Array.Empty<double>();
        public double CutoffFrequency { get; set; } = 2.0;
        public double SamplingRate { get; set; } = 100.0;
    }
}
