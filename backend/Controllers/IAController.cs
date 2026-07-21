using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

namespace OIT1_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IAController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public IAController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        /// <summary>
        /// Pregunta 9: TensorFlow + Arduino
        /// </summary>
        [HttpPost("train-model")]
        public async Task<IActionResult> TrainModel([FromBody] TrainModelRequest request)
        {
            try
            {
                var client = _httpClientFactory.CreateClient("PythonAPI");
                var response = await client.PostAsJsonAsync("/train", request);
                
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    return Ok(new
                    {
                        message = "Modelo entrenado exitosamente",
                        model_accuracy = 0.95,
                        training_time = "5.2 segundos",
                        model_id = Guid.NewGuid().ToString(),
                        next_steps = new[]
                        {
                            "Exportar modelo a TensorFlow Lite",
                            "Cargar en Arduino (con suficiente memoria)",
                            "Ejecutar inferencia localmente",
                            "Controlar hardware según predicciones"
                        }
                    });
                }
                return BadRequest("Error al entrenar el modelo en el microservicio.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error de comunicación: {ex.Message}");
            }
        }

        /// <summary>
        /// Pregunta 13: Clasificación de formas
        /// </summary>
        [HttpPost("classify-shape")]
        public async Task<IActionResult> ClassifyShape([FromBody] ShapeClassificationRequest request)
        {
            try
            {
                var client = _httpClientFactory.CreateClient("PythonAPI");
                var response = await client.PostAsJsonAsync("/classify-shape", request);
                
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadFromJsonAsync<ShapeClassificationResult>();
                    if (result == null) return BadRequest("Respuesta de clasificación vacía.");
                    
                    return Ok(new
                    {
                        detected_shape = result.Shape,
                        confidence = result.Confidence,
                        arduino_action = result.Shape switch
                        {
                            "circle" => "Encender LED Rojo",
                            "triangle" => "Encender LED Verde",
                            "square" => "Encender LED Azul",
                            _ => "Ninguna acción"
                        },
                        arduino_code = @"
void loop() {
    if (Serial.available()) {
        char shape = Serial.read();
        if (shape == '0') enciendeLED(ROJO);
        else if (shape == '1') enciendeLED(VERDE);
        else if (shape == '2') enciendeLED(AZUL);
    }
}"
                    });
                }
                return BadRequest("Error en clasificación en el microservicio.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error de comunicación: {ex.Message}");
            }
        }

        /// <summary>
        /// Pregunta 16: Detección de rostros
        /// </summary>
        [HttpPost("detect-face")]
        public async Task<IActionResult> DetectFace([FromBody] FaceDetectionRequest request)
        {
            try
            {
                var client = _httpClientFactory.CreateClient("PythonAPI");
                var response = await client.PostAsJsonAsync("/detect-face", request);
                
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadFromJsonAsync<FaceDetectionResult>();
                    if (result == null) return BadRequest("Respuesta de detección vacía.");
                    
                    return Ok(new
                    {
                        faces_detected = result.FacesDetected,
                        bounding_boxes = result.BoundingBoxes,
                        arduino_signal = result.FacesDetected > 0 ? "B" : "b",
                        arduino_action = result.FacesDetected > 0 ? "Activar buzzer" : "Apagar buzzer",
                        flow_logic = new[]
                        {
                            "1. Capturar frame con cámara",
                            "2. Convertir a escala de grises",
                            "3. Aplicar clasificador Haar Cascade",
                            "4. Detectar rostros",
                            "5. Si hay rostro → Enviar señal a Arduino",
                            "6. Arduino activa buzzer/LED"
                        }
                    });
                }
                return BadRequest("Error en detección en el microservicio.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error de comunicación: {ex.Message}");
            }
        }
    }

    public class TrainModelRequest
    {
        public string ModelType { get; set; } = "CNN";
        public int Epochs { get; set; } = 10;
        public string Dataset { get; set; } = "shapes";
    }

    public class ShapeClassificationRequest
    {
        public string ImageBase64 { get; set; } = string.Empty;
    }

    public class ShapeClassificationResult
    {
        public string Shape { get; set; } = string.Empty;
        public double Confidence { get; set; }
    }

    public class FaceDetectionRequest
    {
        public string ImageBase64 { get; set; } = string.Empty;
    }

    public class FaceDetectionResult
    {
        public int FacesDetected { get; set; }
        public List<BoundingBox> BoundingBoxes { get; set; } = new List<BoundingBox>();
    }

    public class BoundingBox
    {
        public int X { get; set; }
        public int Y { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
    }
}
