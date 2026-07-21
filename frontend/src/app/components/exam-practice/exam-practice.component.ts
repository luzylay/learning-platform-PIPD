import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  syllabusConcept: string;
  topicCode: string;
}

@Component({
  selector: 'app-exam-practice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exam-practice.component.html',
  styleUrl: './exam-practice.component.css'
})
export class ExamPracticeComponent implements OnInit {
  questions: Question[] = [];
  currentQuestionIndex = 0;
  selectedOptionIndex: number | null = null;
  isSubmitted = false;
  score = 0;
  isFinished = false;
  hasStarted = false;
  isLoading = false;

  username = 'Estudiante OIT 1';
  savedScores: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadScores();
  }

  loadScores() {
    this.apiService.getScores().subscribe({
      next: (scores) => {
        this.savedScores = scores;
      },
      error: () => {
        this.savedScores = [
          { username: 'Estudiante Alfa', score: 14, totalQuestions: 16, timestamp: new Date() },
          { username: 'Estudiante Beta', score: 12, totalQuestions: 16, timestamp: new Date() }
        ];
      }
    });
  }

  getTopicCode(concept: string): string {
    const conceptMap: { [key: string]: string } = {
      "Mecánica Cuántica": "Q1-2",
      "Fibra Óptica vs Vidrio": "Q1-2",
      "Modelos Mentales": "Q3-4",
      "Ciclo de Vida de Software": "Q3-4",
      "Big Data": "Q5-6",
      "Cloud Computing": "Q5-6",
      "Diseño Centrado en el Usuario": "Q7-8",
      "Flujo de Diseño GUI": "Q7-8",
      "TensorFlow + Arduino": "Q9-13",
      "Transformadas de Fourier": "Q10-15",
      "Ventajas de Pandas": "Q11-12",
      "PySerial y Arduino": "Q11-12",
      "Clasificación de formas": "Q9-13",
      "Monitoreo con Gráficas": "Q11-12",
      "Filtros Pasa-Bajos": "Q10-15",
      "Detección de Rostros": "Q16"
    };
    return conceptMap[concept] || '';
  }

  startExam() {
    this.isLoading = true;
    this.apiService.getExamQuestions().subscribe({
      next: (questions: any[]) => {
        this.questions = questions.map(q => ({
          id: q.id,
          text: q.text,
          options: q.options || (q.optionsRaw ? q.optionsRaw.split('|') : []),
          correctOptionIndex: q.correctOptionIndex,
          explanation: q.explanation,
          syllabusConcept: q.syllabusConcept,
          topicCode: this.getTopicCode(q.syllabusConcept)
        }));
        this.hasStarted = true;
        this.isLoading = false;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.isFinished = false;
        this.isSubmitted = false;
        this.selectedOptionIndex = null;
      },
      error: () => {
        this.loadFallbackQuestions();
        this.hasStarted = true;
        this.isLoading = false;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.isFinished = false;
        this.isSubmitted = false;
        this.selectedOptionIndex = null;
      }
    });
  }

  loadFallbackQuestions() {
    this.questions = [
      {
        id: 1,
        text: "¿Qué principio cuántico establece que una partícula puede existir en múltiples estados simultáneamente hasta que es medida?",
        options: ["Cuantización", "Superposición", "Entrelazamiento", "Dualidad onda-partícula"],
        correctOptionIndex: 1,
        explanation: "La superposición cuántica permite que partículas como los cúbits representen múltiples estados (0 y 1) al mismo tiempo en el espacio de Hilbert.",
        syllabusConcept: "Mecánica Cuántica",
        topicCode: "Q1-2"
      },
      {
        id: 2,
        text: "¿Cuál es la principal ventaja física de la fibra óptica de sílice purificada en comparación con la fibra de vidrio convencional?",
        options: ["Mayor susceptibilidad a EMI", "Instalación sumamente rígida", "Mínima atenuación de la luz (aprox. 0.2 dB/km)", "Mayor coste y peso"],
        correctOptionIndex: 2,
        explanation: "La fibra óptica de alta pureza posee una atenuación extremadamente baja (~0.2 dB/km a 1550 nm), permitiendo transmisiones de larga distancia sin repetidores.",
        syllabusConcept: "Fibra Óptica vs Vidrio",
        topicCode: "Q1-2"
      },
      {
        id: 3,
        text: "Tres características definitorias de un 'modelo mental' en interacción humano-computadora son:",
        options: ["Estático, objetivo y absoluto", "Subjetivo, dinámico y simplificador", "Binario, lineal y matemático", "Ergonómico, electromagnético y reflectivo"],
        correctOptionIndex: 1,
        explanation: "Un modelo mental es subjetivo (varía por persona), dinámico (evoluciona con la práctica) y simplificador (reduce la complejidad real de la ingeniería de software).",
        syllabusConcept: "Modelos Mentales",
        topicCode: "Q3-4"
      },
      {
        id: 4,
        text: "¿En qué fase del ciclo de vida del desarrollo de software (SDLC) se crean wireframes, prototipos y el diseño de la arquitectura del sistema?",
        options: ["Planificación", "Análisis", "Diseño", "Pruebas"],
        correctOptionIndex: 2,
        explanation: "La fase de Diseño se encarga de definir la arquitectura, esquemas de bases de datos, y wireframes de interfaces de usuario.",
        syllabusConcept: "Ciclo de Vida de Software",
        topicCode: "Q3-4"
      },
      {
        id: 5,
        text: "¿Cuáles son las llamadas '5 V' que caracterizan la naturaleza del Big Data?",
        options: ["Vector, Valor, Vórtice, Varianza, Visual", "Volumen, Velocidad, Variedad, Veracidad, Valor", "Vidrio, Velocidad, Vector, Volatilidad, Vórtice", "Variables, Varianza, Validación, Vínculo, Vapor"],
        correctOptionIndex: 1,
        explanation: "Las 5 V son Volumen (tamaño de datos), Velocidad (tiempo real), Variedad (tipos de datos), Veracidad (calidad) y Valor (utilidad para el negocio).",
        syllabusConcept: "Big Data",
        topicCode: "Q5-6"
      },
      {
        id: 6,
        text: "El servicio AWS EC2 (servidores virtuales escalables) se clasifica típicamente dentro de qué modelo de servicio Cloud:",
        options: ["SaaS", "PaaS", "IaaS", "FaaS"],
        correctOptionIndex: 2,
        explanation: "IaaS (Infrastructure as a Service) proporciona recursos de computación fundamentales como servidores virtuales, almacenamiento y redes.",
        syllabusConcept: "Cloud Computing",
        topicCode: "Q5-6"
      },
      {
        id: 7,
        text: "¿Cuál es la filosofía principal del Diseño Centrado en el Usuario (DCU)?",
        options: ["Poner al programador en el centro del desarrollo", "Diseñar interfaces según las restricciones puramente de hardware", "Poner las necesidades, capacidades y limitaciones del usuario final en el centro del proceso", "Reducir los costes de producción mediante el uso de plantillas genéricas"],
        correctOptionIndex: 2,
        explanation: "El DCU es un enfoque iterativo regido por la ISO 9241-210 que ubica al usuario y sus necesidades reales como la prioridad absoluta de diseño.",
        syllabusConcept: "Diseño Centrado en el Usuario",
        topicCode: "Q7-8"
      },
      {
        id: 8,
        text: "En el flujo de diseño de la interfaz gráfica de usuario (GUI), ¿qué actividad sigue directamente a la creación de wireframes iniciales?",
        options: ["Despliegue final en producción", "Creación de prototipos de baja fidelidad y pruebas de usabilidad", "Codificación de controladores en .NET", "Entrenamiento del modelo en TensorFlow"],
        correctOptionIndex: 1,
        explanation: "Tras los wireframes iniciales, se elaboran prototipos interactivos rápidos de baja fidelidad para recolectar opiniones tempranas de los usuarios.",
        syllabusConcept: "Flujo de Diseño GUI",
        topicCode: "Q7-8"
      },
      {
        id: 9,
        text: "Para ejecutar un modelo de TensorFlow en un microcontrolador como Arduino, ¿qué variante optimizada de TensorFlow se requiere debido a limitaciones de memoria?",
        options: ["TensorFlow GPU", "TensorFlow Lite for Microcontrollers", "Keras Core", "TensorFlow Serverless"],
        correctOptionIndex: 1,
        explanation: "TensorFlow Lite para Microcontroladores permite ejecutar inferencias de modelos entrenados directamente en hardware con unos pocos kilobytes de memoria mediante cuantificación INT8.",
        syllabusConcept: "TensorFlow + Arduino",
        topicCode: "Q9-13"
      },
      {
        id: 10,
        text: "¿Qué algoritmo eficiente se utiliza en SciPy para calcular las transformadas de Fourier que descomponen señales en el dominio del tiempo al de frecuencia?",
        options: ["SVM", "K-Means", "FFT (Fast Fourier Transform)", "Butterworth Filter"],
        correctOptionIndex: 2,
        explanation: "La FFT (Transformada Rápida de Fourier) es el algoritmo optimizado implementado en scipy.fft para resolver transformadas de Fourier discretas rápidamente.",
        syllabusConcept: "Transformadas de Fourier",
        topicCode: "Q10-15"
      },
      {
        id: 11,
        text: "¿Cuál es la estructura de datos bidimensional indexada principal que ofrece Pandas para la manipulación y limpieza de datos en proyectos de IA?",
        options: ["Numpy Array", "Python Dictionary", "DataFrame", "Tuple"],
        correctOptionIndex: 2,
        explanation: "El DataFrame es el objeto tabular bidimensional indexado insignia de Pandas para manejar datos heterogéneos estructurados.",
        syllabusConcept: "Ventajas de Pandas",
        topicCode: "Q11-12"
      },
      {
        id: 12,
        text: "Al comunicar Python y Arduino mediante PySerial, ¿por qué es crítico llamar a time.sleep(2) directamente después de abrir la conexión serial?",
        options: ["Para descargar el firmware del Arduino", "Para esperar a que la placa se reinicie (auto-reset) y establezca la comunicación", "Para calibrar los sensores analógicos", "Para liberar la memoria caché de Windows"],
        correctOptionIndex: 1,
        explanation: "Casi todas las placas Arduino se reinician físicamente mediante la línea DTR al abrir la conexión serial; un retraso de 2 segundos evita que se envíen comandos durante el reinicio.",
        syllabusConcept: "PySerial y Arduino",
        topicCode: "Q11-12"
      },
      {
        id: 13,
        text: "En OpenCV, ¿qué técnica se usa típicamente para detectar el número de vértices de una figura y poder clasificarla como triángulo (3) o cuadrado (4)?",
        options: ["Haar Cascade Classifier", "Aproximación de polígonos usando cv2.approxPolyDP sobre contornos", "Transformada de Fourier 2D", "Redes Neuronales Recurrentes"],
        correctOptionIndex: 1,
        explanation: "cv2.approxPolyDP reduce los puntos de un contorno basándose en la distancia a un polígono simplificado con Douglas-Peucker, permitiendo contar los vértices resultantes.",
        syllabusConcept: "Clasificación de formas",
        topicCode: "Q9-13"
      },
      {
        id: 14,
        text: "Al monitorizar datos analógicos seriales en un script de Python, ¿qué librería se usa comúnmente para graficar en tiempo real las variables leídas?",
        options: ["TensorFlow", "FastAPI", "Matplotlib (en modo interactivo plt.ion())", "PySerial"],
        correctOptionIndex: 2,
        explanation: "Matplotlib con plt.ion() habilita el modo interactivo que permite actualizar dinámicamente gráficos de sensores sin bloquear la consola de lectura.",
        syllabusConcept: "Monitoreo con Gráficas",
        topicCode: "Q11-12"
      },
      {
        id: 15,
        text: "¿Qué tipo de filtro SciPy se utiliza habitualmente para suavizar una señal ruidosa eliminando los componentes de alta frecuencia?",
        options: ["Filtro Pasa-Altos (High-Pass)", "Filtro Pasa-Bajos (Low-Pass)", "Filtro Rechaza-Banda (Band-Stop)", "Transformada FFT"],
        correctOptionIndex: 1,
        explanation: "Un filtro pasa-bajos Butterwoth atenúa las frecuencias por encima de la frecuencia de corte definida, eliminando ruidos rápidos de alta frecuencia sin alterar el desfase de fase con filtfilt.",
        syllabusConcept: "Filtros Pasa-Bajos",
        topicCode: "Q10-15"
      },
      {
        id: 16,
        text: "¿Qué clasificador pre-entrenado basado en machine learning clásico utiliza OpenCV comúnmente para detectar la presencia y posición de rostros en tiempo real?",
        options: ["SciPy Butter Filter", "Haar Cascade Classifier (Cascada de Haar)", "K-Nearest Neighbors", "Linear Regression"],
        correctOptionIndex: 1,
        explanation: "Los clasificadores Haar Cascades son modelos de Viola-Jones basados en rasgos rectangulares rápidos de evaluar a través de la Imagen Integral O(1).",
        syllabusConcept: "Detección de Rostros",
        topicCode: "Q16"
      }
    ];
  }

  selectOption(index: number) {
    if (this.isSubmitted) return;
    this.selectedOptionIndex = index;
  }

  submitAnswer() {
    if (this.selectedOptionIndex === null || this.isSubmitted) return;
    this.isSubmitted = true;
    if (this.selectedOptionIndex === this.questions[this.currentQuestionIndex].correctOptionIndex) {
      this.score++;
    }
  }

  nextQuestion() {
    this.isSubmitted = false;
    this.selectedOptionIndex = null;
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.finishExam();
    }
  }

  finishExam() {
    this.isFinished = true;
    this.apiService.submitScore(this.username, this.score, this.questions.length).subscribe({
      next: () => this.loadScores(),
      error: () => this.loadScores() // reload even if mock fallback
    });
  }

  restartExam() {
    this.hasStarted = false;
    this.isFinished = false;
  }
}
