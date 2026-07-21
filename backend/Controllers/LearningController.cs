using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OIT1_API.Models;
using OIT1_API.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OIT1_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LearningController : ControllerBase
    {
        private readonly LearningDbContext _dbContext;

        public LearningController(LearningDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// <summary>
        /// Obtener todas las preguntas del examen desde PostgreSQL
        /// </summary>
        [HttpGet("exam-questions")]
        public async Task<IActionResult> GetExamQuestions()
        {
            var questions = await _dbContext.Questions.ToListAsync();
            return Ok(questions);
        }

        /// <summary>
        /// Guardar puntuación del examen en la base de datos
        /// </summary>
        [HttpPost("submit-score")]
        public async Task<IActionResult> SubmitScore([FromBody] UserScore score)
        {
            _dbContext.UserScores.Add(score);
            await _dbContext.SaveChangesAsync();
            return Ok(new { success = true, scoreId = score.Id });
        }

        /// <summary>
        /// Obtener puntuaciones recientes
        /// </summary>
        [HttpGet("scores")]
        public async Task<IActionResult> GetScores()
        {
            var scores = await _dbContext.UserScores
                .OrderByDescending(s => s.Timestamp)
                .Take(10)
                .ToListAsync();
            return Ok(scores);
        }

        /// <summary>
        /// Pregunta 3: Características del Modelo Mental
        /// </summary>
        [HttpGet("mental-model")]
        public IActionResult GetMentalModel()
        {
            return Ok(new
            {
                question = "3 características del modelo mental",
                characteristics = new[]
                {
                    new
                    {
                        name = "Subjetivo",
                        description = "Cada persona construye su propia representación mental del sistema basada en sus experiencias y conocimientos previos",
                        example = "Un programador y un diseñador perciben diferente una interfaz de usuario"
                    },
                    new
                    {
                        name = "Dinámico",
                        description = "Evoluciona y se adapta con nueva información, aprendizaje y práctica continua",
                        example = "Un usuario mejora su modelo mental de una aplicación con el uso diario"
                    },
                    new
                    {
                        name = "Simplificador",
                        description = "Reduce la complejidad de la realidad a conceptos manejables",
                        example = "Un usuario entiende 'guardar' como una acción simple, ignorando la complejidad técnica"
                    }
                },
                importance = "Afecta cómo los usuarios interactúan con sistemas y cómo los desarrolladores diseñan interfaces"
            });
        }

        /// <summary>
        /// Pregunta 4: Ciclo de Vida del Software
        /// </summary>
        [HttpGet("software-lifecycle")]
        public IActionResult GetSoftwareLifecycle()
        {
            return Ok(new
            {
                question = "Fases del ciclo de vida del software",
                phases = new[]
                {
                    new { phase = "1. Planificación", description = "Definir objetivos, alcance y recursos", duration = "1-2 semanas" },
                    new { phase = "2. Análisis", description = "Recopilar y documentar requisitos", duration = "2-3 semanas" },
                    new { phase = "3. Diseño", description = "Arquitectura, UI, bases de datos", duration = "2-4 semanas" },
                    new { phase = "4. Implementación", description = "Codificación y desarrollo", duration = "4-8 semanas" },
                    new { phase = "5. Pruebas", description = "Validación y verificación", duration = "2-3 semanas" },
                    new { phase = "6. Despliegue", description = "Instalación en producción", duration = "1 semana" },
                    new { phase = "7. Mantenimiento", description = "Corrección y mejoras continuas", duration = "Continuo" }
                },
                design_phase = new
                {
                    name = "Fase de Diseño (Desarrollada)",
                    activities = new[]
                    {
                        "Creación de wireframes y prototipos",
                        "Definición de arquitectura del sistema",
                        "Selección de tecnologías (frontend, backend, DB)",
                        "Diseño de patrones de diseño",
                        "Documentación técnica y de usuario",
                        "Validación con stakeholders"
                    },
                    deliverables = new[]
                    {
                        "Documento de diseño arquitectónico",
                        "Prototipos de interfaz",
                        "Modelo de datos",
                        "Plan de implementación"
                    }
                }
            });
        }

        /// <summary>
        /// Pregunta 5: Big Data
        /// </summary>
        [HttpGet("big-data")]
        public IActionResult GetBigData()
        {
            return Ok(new
            {
                question = "¿Qué es Big Data?",
                definition = "Conjuntos de datos masivos que no pueden ser procesados con métodos tradicionales",
                five_vs = new[]
                {
                    new { v = "Volumen", description = "Cantidad masiva de datos (TB, PB, EB)" },
                    new { v = "Velocidad", description = "Generación y procesamiento en tiempo real" },
                    new { v = "Variedad", description = "Datos estructurados, no estructurados y semiestructurados" },
                    new { v = "Veracidad", description = "Calidad y confiabilidad de los datos" },
                    new { v = "Valor", description = "Extraer insights y beneficios de los datos" }
                },
                technologies = new[]
                {
                    "Hadoop", "Spark", "NoSQL", "Data Lakes", "Stream Processing"
                },
                challenges = new[]
                {
                    "Almacenamiento eficiente",
                    "Procesamiento distribuido",
                    "Seguridad y privacidad",
                    "Integración de datos"
                }
            });
        }

        /// <summary>
        /// Pregunta 6: Cloud Computing
        /// </summary>
        [HttpGet("cloud-computing")]
        public IActionResult GetCloudComputing()
        {
            return Ok(new
            {
                question = "¿Qué es Cloud Computing?",
                definition = "Entrega de servicios de computación a través de internet",
                service_models = new[]
                {
                    new { model = "IaaS", description = "Infraestructura (servidores, almacenamiento)", examples = "AWS EC2, Azure VMs" },
                    new { model = "PaaS", description = "Plataforma (entornos de desarrollo)", examples = "Heroku, Google App Engine" },
                    new { model = "SaaS", description = "Software (aplicaciones listas para usar)", examples = "Gmail, Office 365" }
                },
                deployment_models = new[]
                {
                    new { model = "Pública", description = "Servicios para el público general" },
                    new { model = "Privada", description = "Uso exclusivo de una organización" },
                    new { model = "Híbrida", description = "Combinación de pública y privada" }
                },
                characteristics = new[]
                {
                    "Escalabilidad",
                    "Pago por uso",
                    "Acceso universal",
                    "Elasticidad",
                    "Automatización"
                },
                providers = new[] { "AWS", "Azure", "Google Cloud", "IBM Cloud" }
            });
        }

        /// <summary>
        /// Pregunta 7: Diseño Centrado en el Usuario
        /// </summary>
        [HttpGet("user-centered-design")]
        public IActionResult GetUserCenteredDesign()
        {
            return Ok(new
            {
                question = "Diseño Centrado en el Usuario (DCU)",
                definition = "Filosofía que pone al usuario en el centro del proceso de desarrollo",
                principles = new[]
                {
                    new { principle = "Investigación de usuarios", description = "Conocer necesidades y comportamientos" },
                    new { principle = "Diseño iterativo", description = "Prototipos y pruebas constantes" },
                    new { principle = "Participación activa", description = "Usuarios en el proceso de diseño" },
                    new { principle = "Evaluación continua", description = "Pruebas de usabilidad" }
                },
                for_interfaces = new[]
                {
                    "Menús intuitivos",
                    "Feedback visual",
                    "Accesibilidad",
                    "Consistencia visual"
                },
                for_peripherals = new[]
                {
                    "Ergonomía",
                    "Facilidad de conexión",
                    "Compatibilidad",
                    "Feedback táctil"
                },
                benefits = new[]
                {
                    "Mayor satisfacción",
                    "Menor curva de aprendizaje",
                    "Reducción de errores",
                    "Mayor productividad"
                }
            });
        }

        /// <summary>
        /// Pregunta 8: Diagrama de flujo del diseño GUI
        /// </summary>
        [HttpGet("gui-design-flow")]
        public IActionResult GetGUIDesignFlow()
        {
            return Ok(new
            {
                question = "Proceso de diseño de la GUI",
                flow = new[]
                {
                    new { step = 1, action = "Investigación de Usuario", description = "Entender necesidades y contexto" },
                    new { step = 2, action = "Análisis de Requisitos", description = "Definir funcionalidades necesarias" },
                    new { step = 3, action = "Creación de Wireframes", description = "Diseño de baja fidelidad" },
                    new { step = 4, action = "Prototipado (baja fidelidad)", description = "Pruebas tempranas" },
                    new { step = 5, action = "Pruebas de Usabilidad", description = "Feedback de usuarios reales" },
                    new { step = 6, action = "Iteración y Mejora", description = "Refinamiento continuo" },
                    new { step = 7, action = "Prototipado (alta fidelidad)", description = "Diseño detallado" },
                    new { step = 8, action = "Pruebas Finales", description = "Validación completa" },
                    new { step = 9, action = "Implementación", description = "Desarrollo final" }
                },
                characteristics = new[]
                {
                    "Iterativo: Ciclos de retroalimentación",
                    "Colaborativo: Participación de usuarios",
                    "Documentado: Registro de decisiones",
                    "Flexible: Adaptación a cambios"
                }
            });
        }
    }
}
