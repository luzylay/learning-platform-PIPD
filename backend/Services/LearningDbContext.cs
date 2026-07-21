using Microsoft.EntityFrameworkCore;
using OIT1_API.Models;
using System.Collections.Generic;

namespace OIT1_API.Services
{
    public class LearningDbContext : DbContext
    {
        public LearningDbContext(DbContextOptions<LearningDbContext> options) : base(options)
        {
        }

        public DbSet<ExamQuestion> Questions { get; set; }
        public DbSet<UserScore> UserScores { get; set; }

        public static void SeedData(LearningDbContext context)
        {
            context.Database.EnsureCreated();

            if (!context.Questions.Any())
            {
                var seedQuestions = new List<ExamQuestion>
                {
                    new ExamQuestion
                    {
                        Text = "¿Qué principio cuántico establece que una partícula puede existir en múltiples estados simultáneamente hasta que es medida?",
                        Options = new List<string> { "Cuantización", "Superposición", "Entrelazamiento", "Dualidad onda-partícula" },
                        CorrectOptionIndex = 1,
                        Explanation = "La superposición cuántica permite que partículas como los cúbits representen múltiples estados (0 y 1) al mismo tiempo.",
                        SyllabusConcept = "Mecánica Cuántica"
                    },
                    new ExamQuestion
                    {
                        Text = "¿Cuál es la principal ventaja física de la fibra óptica de sílice purificada en comparación con la fibra de vidrio convencional?",
                        Options = new List<string> { "Mayor susceptibilidad a EMI", "Instalación sumamente rígida", "Mínima atenuación de la luz (aprox. 0.2 dB/km)", "Mayor coste y peso" },
                        CorrectOptionIndex = 2,
                        Explanation = "La fibra óptica de alta pureza posee una atenuación extremadamente baja (~0.2 dB/km), permitiendo transmisiones de larga distancia sin repetidores.",
                        SyllabusConcept = "Fibra Óptica vs Vidrio"
                    },
                    new ExamQuestion
                    {
                        Text = "Tres características definitorias de un 'modelo mental' en interacción humano-computadora son:",
                        Options = new List<string> { "Estático, objetivo y absoluto", "Subjetivo, dinámico y simplificador", "Binario, lineal y matemático", "Ergonómico, electromagnético y reflectivo" },
                        CorrectOptionIndex = 1,
                        Explanation = "Un modelo mental es subjetivo (varía por persona), dinámico (evoluciona con la práctica) y simplificador (reduce la complejidad real).",
                        SyllabusConcept = "Modelos Mentales"
                    },
                    new ExamQuestion
                    {
                        Text = "¿En qué fase del ciclo de vida del desarrollo de software (SDLC) se crean wireframes, prototipos y el diseño de la arquitectura del sistema?",
                        Options = new List<string> { "Planificación", "Análisis", "Diseño", "Pruebas" },
                        CorrectOptionIndex = 2,
                        Explanation = "La fase de Diseño se encarga de definir la arquitectura, esquemas de bases de datos, y wireframes de interfaces de usuario.",
                        SyllabusConcept = "Ciclo de Vida de Software"
                    },
                    new ExamQuestion
                    {
                        Text = "¿Cuáles son las llamadas '5 V' que caracterizan la naturaleza del Big Data?",
                        Options = new List<string> { "Vector, Valor, Vórtice, Varianza, Visual", "Volumen, Velocidad, Variedad, Veracidad, Valor", "Vidrio, Velocidad, Vector, Volatilidad, Vórtice", "Variables, Varianza, Validación, Vínculo, Vapor" },
                        CorrectOptionIndex = 1,
                        Explanation = "Las 5 V son Volumen (tamaño de datos), Velocidad (tiempo real), Variedad (tipos de datos), Veracidad (calidad) y Valor (utilidad para el negocio).",
                        SyllabusConcept = "Big Data"
                    },
                    new ExamQuestion
                    {
                        Text = "El servicio AWS EC2 (servidores virtuales escalables) se clasifica típicamente dentro de qué modelo de servicio Cloud:",
                        Options = new List<string> { "SaaS", "PaaS", "IaaS", "FaaS" },
                        CorrectOptionIndex = 2,
                        Explanation = "IaaS (Infrastructure as a Service) proporciona recursos de computación fundamentales como servidores virtuales, almacenamiento y redes.",
                        SyllabusConcept = "Cloud Computing"
                    },
                    new ExamQuestion
                    {
                        Text = "¿Cuál es la filosofía principal del Diseño Centrado en el Usuario (DCU)?",
                        Options = new List<string> { "Poner al programador en el centro del desarrollo", "Diseñar interfaces según las restricciones puramente de hardware", "Poner las necesidades, capacidades y limitaciones del usuario final en el centro del proceso", "Reducir los costes de producción mediante el uso de plantillas genéricas" },
                        CorrectOptionIndex = 2,
                        Explanation = "El DCU es un enfoque iterativo que ubica al usuario y sus necesidades reales como la prioridad absoluta de diseño.",
                        SyllabusConcept = "Diseño Centrado en el Usuario"
                    },
                    new ExamQuestion
                    {
                        Text = "En el flujo de diseño de la interfaz gráfica de usuario (GUI), ¿qué actividad sigue directamente a la creación de wireframes iniciales?",
                        Options = new List<string> { "Despliegue final en producción", "Creación de prototipos de baja fidelidad y pruebas de usabilidad", "Codificación de controladores en .NET", "Entrenamiento del modelo en TensorFlow" },
                        CorrectOptionIndex = 1,
                        Explanation = "Tras los wireframes iniciales, se elaboran prototipos interactivos rápidos de baja fidelidad para recolectar opiniones tempranas de los usuarios.",
                        SyllabusConcept = "Flujo de Diseño GUI"
                    },
                    new ExamQuestion
                    {
                        Text = "Para ejecutar un modelo de TensorFlow en un microcontrolador como Arduino, ¿qué variante optimizada de TensorFlow se requiere debido a limitaciones de memoria?",
                        Options = new List<string> { "TensorFlow GPU", "TensorFlow Lite for Microcontrollers", "Keras Core", "TensorFlow Serverless" },
                        CorrectOptionIndex = 1,
                        Explanation = "TensorFlow Lite para Microcontroladores permite ejecutar inferencias de modelos entrenados directamente en hardware con unos pocos kilobytes de memoria.",
                        SyllabusConcept = "TensorFlow + Arduino"
                    },
                    new ExamQuestion
                    {
                        Text = "¿Qué algoritmo eficiente se utiliza en SciPy para calcular las transformadas de Fourier que descomponen señales en el dominio del tiempo al de frecuencia?",
                        Options = new List<string> { "SVM", "K-Means", "FFT (Fast Fourier Transform)", "Butterworth Filter" },
                        CorrectOptionIndex = 2,
                        Explanation = "La FFT (Transformada Rápida de Fourier) es el algoritmo optimizado implementado en scipy.fft para resolver transformadas de Fourier discretas rápidamente.",
                        SyllabusConcept = "Transformadas de Fourier"
                    },
                    new ExamQuestion
                    {
                        Text = "¿Cuál es la estructura de datos bidimensional indexada principal que ofrece Pandas para la manipulación y limpieza de datos en proyectos de IA?",
                        Options = new List<string> { "Numpy Array", "Python Dictionary", "DataFrame", "Tuple" },
                        CorrectOptionIndex = 2,
                        Explanation = "El DataFrame es el objeto tabular bidimensional indexado insignia de Pandas para manejar datos heterogéneos estructurados.",
                        SyllabusConcept = "Ventajas de Pandas"
                    },
                    new ExamQuestion
                    {
                        Text = "Al comunicar Python y Arduino mediante PySerial, ¿por qué es crítico llamar a `time.sleep(2)` directamente después de abrir la conexión serial?",
                        Options = new List<string> { "Para descargar el firmware del Arduino", "Para esperar a que la placa se reinicie (auto-reset) y establezca la comunicación", "Para calibrar los sensores analógicos", "Para liberar la memoria caché de Windows" },
                        CorrectOptionIndex = 1,
                        Explanation = "Casi todas las placas Arduino se reinician automáticamente al abrir la conexión serial; un retraso evita que se envíen datos mientras arranca el bootloader.",
                        SyllabusConcept = "PySerial y Arduino"
                    },
                    new ExamQuestion
                    {
                        Text = "En OpenCV, ¿qué técnica se usa típicamente para detectar el número de vértices de una figura y poder clasificarla como triángulo (3) o cuadrado (4)?",
                        Options = new List<string> { "Haar Cascade Classifier", "Aproximación de polígonos usando cv2.approxPolyDP sobre contornos", "Transformada de Fourier 2D", "Redes Neuronales Recurrentes" },
                        CorrectOptionIndex = 1,
                        Explanation = "cv2.approxPolyDP reduce los puntos de un contorno basándose en la distancia a un polígono simplificado, permitiendo contar los vértices resultantes.",
                        SyllabusConcept = "Clasificación de formas"
                    },
                    new ExamQuestion
                    {
                        Text = "Al monitorizar datos analógicos seriales en un script de Python, ¿qué librería se usa comúnmente para graficar en tiempo real las variables leídas?",
                        Options = new List<string> { "TensorFlow", "FastAPI", "Matplotlib (en modo interactivo plt.ion())", "PySerial" },
                        CorrectOptionIndex = 2,
                        Explanation = "Matplotlib con plt.ion() habilita el modo interactivo que permite actualizar dinámicamente gráficos de sensores sin bloquear la consola de lectura.",
                        SyllabusConcept = "Monitoreo con Gráficas"
                    },
                    new ExamQuestion
                    {
                        Text = "¿Qué tipo de filtro SciPy se utiliza habitualmente para suavizar una señal ruidosa eliminando los componentes de alta frecuencia?",
                        Options = new List<string> { "Filtro Pasa-Altos (High-Pass)", "Filtro Pasa-Bajos (Low-Pass)", "Filtro Rechaza-Banda (Band-Stop)", "Transformada FFT" },
                        CorrectOptionIndex = 1,
                        Explanation = "Un filtro pasa-bajos atenúa las frecuencias por encima de la frecuencia de corte definida, eliminando ruidos rápidos de alta frecuencia.",
                        SyllabusConcept = "Filtros Pasa-Bajos"
                    },
                    new ExamQuestion
                    {
                        Text = "¿Qué clasificador pre-entrenado basado en machine learning clásico utiliza OpenCV comúnmente para detectar la presencia y posición de rostros en tiempo real?",
                        Options = new List<string> { "SciPy Butter Filter", "Haar Cascade Classifier (Cascada de Haar)", "K-Nearest Neighbors", "Linear Regression" },
                        CorrectOptionIndex = 1,
                        Explanation = "Los clasificadores Haar Cascades son modelos basados en rasgos rectangulares rápidos de evaluar y eficaces para la detección de objetos como caras en vídeo.",
                        SyllabusConcept = "Detección de Rostros"
                    }
                };

                context.Questions.AddRange(seedQuestions);
                context.SaveChanges();
            }
        }
    }
}
