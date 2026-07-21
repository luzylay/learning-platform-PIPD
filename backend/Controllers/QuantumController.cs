using Microsoft.AspNetCore.Mvc;
using System;

namespace OIT1_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuantumController : ControllerBase
    {
        /// <summary>
        /// Pregunta 1: ¿Qué es cuántica?
        /// </summary>
        [HttpGet("explain")]
        public IActionResult ExplainQuantum()
        {
            return Ok(new
            {
                question = "¿Qué es cuántica?",
                answer = new
                {
                    definition = "La mecánica cuántica es la teoría física que describe el comportamiento de la materia y energía a escala atómica y subatómica.",
                    principles = new[]
                    {
                        "Cuantización: La energía existe en paquetes discretos llamados cuantos",
                        "Superposición: Una partícula puede estar en múltiples estados simultáneamente",
                        "Entrelazamiento: Partículas pueden estar correlacionadas instantáneamente",
                        "Dualidad onda-partícula: La materia se comporta como onda y partícula"
                    },
                    applications = new[]
                    {
                        "Computación cuántica",
                        "Criptografía cuántica",
                        "Sensores cuánticos",
                        "Teleportación cuántica"
                    },
                    key_formula = "E = hν (Energía de un fotón)"
                }
            });
        }

        /// <summary>
        /// Pregunta 2: Fibra Óptica vs Fibra de Vidrio
        /// </summary>
        [HttpGet("fiber-comparison")]
        public IActionResult CompareFiber()
        {
            return Ok(new
            {
                question = "Fibra Óptica vs Fibra de Vidrio convencional",
                fiber_optic = new
                {
                    description = "Núcleo de vidrio de alta pureza (sílice)",
                    transmission = "Reflexión total interna",
                    speed = "~200,000 km/s en el medio",
                    bandwidth = "Terabits/s",
                    attenuation = "0.2 dB/km",
                    advantages = new[]
                    {
                        "Inmune a interferencias electromagnéticas",
                        "Mayor ancho de banda",
                        "Menor atenuación",
                        "Mayor distancia de transmisión"
                    },
                    disadvantages = new[]
                    {
                        "Costo de producción más alto",
                        "Instalación más delicada",
                        "Requiere equipos especializados"
                    }
                },
                glass_fiber = new
                {
                    description = "Vidrio común con impurezas",
                    transmission = "Transmisión directa con pérdidas",
                    speed = "~150,000 km/s",
                    bandwidth = "Limitado (MHz)",
                    attenuation = "Mayor (dB/km)",
                    disadvantages = new[]
                    {
                        "Mayor pérdida de señal",
                        "Susceptible a interferencias",
                        "Distancia limitada"
                    }
                },
                comparison = new
                {
                    winner = "Fibra Óptica",
                    reason = "Superior en velocidad, capacidad y distancia, aunque más costosa"
                }
            });
        }

        /// <summary>
        /// Simulación cuántica - Visualización
        /// </summary>
        [HttpPost("simulate-qubit")]
        public IActionResult SimulateQubit([FromBody] QubitSimulationRequest request)
        {
            var random = new Random();
            var result = new
            {
                qubit_state = request.State,
                superposition = new double[] { 1/Math.Sqrt(2), 1/Math.Sqrt(2) },
                measurement = random.NextDouble() > 0.5 ? 0 : 1,
                probability_0 = 0.5,
                probability_1 = 0.5,
                entanglement = new
                {
                    qubit1 = random.Next(0, 2),
                    qubit2 = random.Next(0, 2),
                    is_entangled = true
                }
            };
            
            return Ok(result);
        }
    }

    public class QubitSimulationRequest
    {
        public string State { get; set; } = "|0⟩";
    }
}
