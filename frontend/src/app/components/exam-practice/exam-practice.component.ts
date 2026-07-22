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
        text: "¿En la física cuántica, cómo se expresa el estado de un cúbit |ψ⟩ en el espacio de Hilbert C² y qué restricción impone la Regla de Born sobre las amplitudes α y β?",
        options: [
          "|ψ⟩ = α|0⟩ - β|1⟩ donde |α| + |β| = 1",
          "|ψ⟩ = α|0⟩ + β|1⟩ donde |α|² + |β|² = 1",
          "|ψ⟩ = (α + β)(|0⟩ + |1⟩) donde α, β ∈ ℝ",
          "|ψ⟩ = α|0⟩ / β|1⟩ donde α · β = 0"
        ],
        correctOptionIndex: 1,
        explanation: "Un cúbit es una combinación lineal |ψ⟩ = α|0⟩ + β|1⟩ en C², donde α, β son amplitudes de probabilidad complejas y la Regla de Born exige que |α|² + |β|² = 1.",
        syllabusConcept: "Mecánica Cuántica",
        topicCode: "TEMA 1"
      },
      {
        id: 2,
        text: "¿Cuál es la diferencia física de operación fundamental entre la fibra óptica y la fibra de vidrio (GFRP)?",
        options: [
          "La fibra óptica transmite luz por Reflexión Total Interna; la fibra de vidrio es un material compuesto para refuerzo mecánico.",
          "Ambas transmiten pulsos electromagnéticos por difracción de rayos X.",
          "La fibra de vidrio transmite datos a 1550 nm y la fibra óptica se usa en chasis de automóviles.",
          "La fibra óptica funciona con resina epoxi y la fibra de vidrio con dióxido de silicio purísimo al 99.9%."
        ],
        correctOptionIndex: 0,
        explanation: "La Fibra Óptica transporta datos mediante la Reflexión Interna Total (TIR) en su núcleo de sílice. La Fibra de Vidrio (GFRP) es un polímero reforzado para resistencia estructural y aislamiento.",
        syllabusConcept: "Fibra Óptica vs Vidrio",
        topicCode: "TEMA 1"
      },
      {
        id: 3,
        text: "Según el estándar ISO/IEC/IEEE 12207, ¿cuál es la secuencia formal de las fases del Ciclo de Vida del Software (SDLC)?",
        options: [
          "Diseño ➔ Codificación ➔ Requisitos ➔ Mantenimiento ➔ Pruebas ➔ Despliegue",
          "Análisis/Requisitos ➔ Diseño de Arquitectura ➔ Implementación/Codificación ➔ Verificación y Validación ➔ Despliegue ➔ Mantenimiento",
          "Planificación ➔ Pruebas ➔ Despliegue ➔ Diseño ➔ Análisis ➔ Retiro",
          "Codificación ➔ Integración ➔ Pruebas ➔ Requisitos ➔ Auditoría CMMI ➔ Release"
        ],
        correctOptionIndex: 1,
        explanation: "El SDLC formal según ISO 12207 establece: 1. Requisitos (SRS), 2. Diseño (SDD), 3. Implementación, 4. V&V (Testing), 5. Despliegue (CD Pipeline) y 6. Mantenimiento.",
        syllabusConcept: "Ciclo de Vida de Software",
        topicCode: "TEMA 2"
      },
      {
        id: 4,
        text: "En ergonomía cognitiva (Donald Norman), ¿qué define el 'Golfo de Ejecución' y el 'Golfo de Evaluación'?",
        options: [
          "La velocidad de la CPU vs el consumo de memoria RAM del servidor.",
          "La distancia entre la intención del usuario y la acción permitida en la GUI vs la distancia entre el estado real del sistema y lo percibido.",
          "El tiempo de compilación en .NET vs el tiempo de despliegue en AWS EKS.",
          "La diferencia de ancho de banda entre TCP y UDP en un test de iperf3."
        ],
        correctOptionIndex: 1,
        explanation: "El Golfo de Ejecución mide la dificultad para traducir intenciones en acciones en pantalla; el Golfo de Evaluación mide la brecha para percibir e interpretar el estado del sistema.",
        syllabusConcept: "Modelos Mentales",
        topicCode: "TEMA 2"
      },
      {
        id: 5,
        text: "¿Qué caracteriza a una organización evaluada en el Nivel 3 de Madurez de CMMI (Defined / Definido)?",
        options: [
          "Procesos impredecibles, reactivos y no documentados.",
          "Procesos estandarizados a nivel de la organización con guías formales de adaptación (tailoring) para cada proyecto.",
          "Uso exclusivo de métricas cuantitativas estadísticas y control de procesos en tiempo real.",
          "Enfoque único en la optimización e innovación tecnológica continua sin procedimientos formales."
        ],
        correctOptionIndex: 1,
        explanation: "En CMMI Nivel 3, los procesos están caracterizados y descritos en estándares a nivel organizacional (PAL) y los proyectos individuales aplican 'Tailoring' controlado.",
        syllabusConcept: "CMMI Nivel 3",
        topicCode: "TEMA 3"
      },
      {
        id: 6,
        text: "¿Cuál es la diferencia clave de la norma ISO/IEC 27001 frente a ISO 9001 e ISO 25000?",
        options: [
          "ISO 27001 regula la satisfacción del cliente; ISO 9001 evalúa el código fuente.",
          "ISO 27001 establece un Sistema de Gestión de Seguridad de la Información (SGSI) protegiendo la Triada CIA (Confidencialidad, Integridad, Disponibilidad).",
          "ISO 27001 es un marco exclusivo para proyectos ágiles de Scrum.",
          "ISO 27001 mide el bitrate de enlaces de fibra óptica monomodo."
        ],
        correctOptionIndex: 1,
        explanation: "ISO 27001 se enfoca en la seguridad de la información (SGSI) garantizando Confidencialidad, Integridad y Disponibilidad (Triada CIA), mientras que ISO 9001 es Gestión de Calidad (SGC) e ISO 25000 (SQuaRE) mide calidad del producto software.",
        syllabusConcept: "Normas ISO",
        topicCode: "TEMA 3"
      },
      {
        id: 7,
        text: "En COBIT 2019, ¿cuál es la distinción fundamental entre 'Gobierno' y 'Gestión'?",
        options: [
          "Gobierno es ejecutado por los programadores; Gestión por los clientes.",
          "Gobierno evalúa, dirige y monitorea (EDM) a nivel directivo; Gestión planifica, construye, ejecuta y monitorea (APO, BAI, DSS, MEA) a nivel ejecutivo.",
          "Gobierno aplica pruebas iperf3; Gestión compila artefactos en Docker.",
          "No existe distinción; ambos términos son equivalentes en el marco ISACA."
        ],
        correctOptionIndex: 1,
        explanation: "COBIT separa explícitamente el Gobierno (EDM - Evaluar, Dirigir, Monitorear a cargo de la Junta Directiva) de la Gestión (APO, BAI, DSS, MEA a cargo de la dirección operativa).",
        syllabusConcept: "COBIT e ITIL",
        topicCode: "TEMA 3"
      },
      {
        id: 8,
        text: "¿Cuáles son las 5 etapas formales del proceso KDD (Knowledge Discovery in Databases)?",
        options: [
          "Sample ➔ Explore ➔ Modify ➔ Model ➔ Assess",
          "Selección ➔ Preprocesamiento (limpieza) ➔ Transformación ➔ Minería de Datos ➔ Interpretación / Evaluación",
          "Business Understanding ➔ Data Preparation ➔ Modeling ➔ Testing ➔ Deployment ➔ Maintenance",
          "Input ➔ Processing ➔ Output ➔ Feedback ➔ Storage"
        ],
        correctOptionIndex: 1,
        explanation: "KDD se estructura formalmente en: 1. Selección, 2. Preprocesamiento (Data Cleaning), 3. Transformación (PCA/Normalización), 4. Minería de Datos (Data Mining) y 5. Interpretación/Evaluación.",
        syllabusConcept: "Metodologías de Datos",
        topicCode: "TEMA 4"
      },
      {
        id: 9,
        text: "¿Cuáles son las 6 fases iterativas del estándar CRISP-DM para proyectos de minería de datos?",
        options: [
          "Business Understanding ➔ Data Understanding ➔ Data Preparation ➔ Modeling ➔ Evaluation ➔ Deployment",
          "Sample ➔ Explore ➔ Modify ➔ Model ➔ Assess ➔ Retain",
          "Plan ➔ Build ➔ Run ➔ Monitor ➔ Audit ➔ Report",
          "Requirements ➔ Design ➔ Code ➔ Test ➔ Release ➔ Operations"
        ],
        correctOptionIndex: 0,
        explanation: "CRISP-DM es el estándar de minería de datos con 6 fases: Comprensión del Negocio, Comprensión de Datos, Preparación de Datos, Modelado, Evaluación y Despliegue.",
        syllabusConcept: "Metodologías de Datos",
        topicCode: "TEMA 4"
      },
      {
        id: 10,
        text: "Según el NIST (SP 800-145), ¿cuáles son las 5 características esenciales de Cloud Computing?",
        options: [
          "Autoservicio bajo demanda, Acceso amplio a red, Agrupamiento de recursos, Elasticidad rápida y Servicio medido.",
          "Hipervisor, Servidores físicos, Cables de cobre, Switches capa 2 y Puertos USB.",
          "Docker, Kubernetes, AWS S3, Apache Bench e iperf3.",
          "Alta disponibilidad, Cero atenuación, Prototipos UI, Scrum y CMMI L3."
        ],
        correctOptionIndex: 0,
        explanation: "Las 5 características esenciales del NIST SP 800-145 son: On-demand self-service, Broad network access, Resource pooling, Rapid elasticity y Measured service.",
        syllabusConcept: "Cloud Computing",
        topicCode: "TEMA 5"
      },
      {
        id: 11,
        text: "¿Cómo logra Docker el aislamiento liviano de contenedores sin requerir un Hipervisor ni SO huésped completo?",
        options: [
          "Emulando instrucciones de hardware mediante procesadores ARM virtuales.",
          "Utilizando Namespaces (aislamiento PID, NET, MNT) y Control Groups / cgroups (límites de CPU/RAM) del Kernel Linux.",
          "Ejecutando instancias de máquinas virtuales VirtualBox en segundo plano.",
          "Utilizando reflectómetros ópticos OTDR para dividir los datos."
        ],
        correctOptionIndex: 1,
        explanation: "Docker utiliza virtualización a nivel de SO aprovechando Namespaces (para aislar procesos, red y montaje) y cgroups (para limitar CPU/RAM) compartiendo el Kernel anfitrión.",
        syllabusConcept: "Docker & Kubernetes",
        topicCode: "TEMA 6"
      },
      {
        id: 12,
        text: "En la arquitectura de Kubernetes (K8s), ¿cuál es el componente clave del Control Plane que actúa como base de datos clave-valor distribuida para guardar el estado del clúster?",
        options: [
          "kube-apiserver",
          "etcd",
          "kubelet",
          "kube-proxy"
        ],
        correctOptionIndex: 1,
        explanation: "etcd es el almacén de datos clave-valor distribuido y fuertemente consistente utilizado por Kubernetes para guardar todo el estado y configuración del clúster.",
        syllabusConcept: "Docker & Kubernetes",
        topicCode: "TEMA 6"
      },
      {
        id: 13,
        text: "En herramientas de prueba de red (Material `informacion`), ¿qué parámetro de iperf3 permite abrir múltiples hilos paralelos para saturar un enlace de 1 Gbps y qué mide '-u'?",
        options: [
          "'-P <n>' para hilos paralelos y '-u' para cambiar a protocolo UDP (midiendo jitter y pérdida de paquetes).",
          "'-n' para número de peticiones y '-u' para HTTP.",
          "'-c' para cliente y '-u' para deshabilitar la red.",
          "'-s' para servidor y '-u' para ejecutar en segundo plano."
        ],
        correctOptionIndex: 0,
        explanation: "En iperf3, '-P <n>' ejecuta n hilos TCP en paralelo para superar límites de ventana de socket, mientras que '-u' conmuta a UDP permitiendo medir jitter y datagramas perdidos.",
        syllabusConcept: "Herramientas GCP & Benchmarking",
        topicCode: "TEMA 6"
      },
      {
        id: 14,
        text: "¿Cuáles son las 4 etapas del ciclo iterativo de Diseño Centrado en el Usuario (DCU) según la ISO 9241-210?",
        options: [
          "1. Entender contexto de uso ➔ 2. Especificar requisitos ➔ 3. Producir soluciones de diseño ➔ 4. Evaluar diseños contra requisitos.",
          "1. Wireframes ➔ 2. Codificación ➔ 3. Pruebas unitarias ➔ 4. Despliegue.",
          "1. Elicitación ➔ 2. CMMI L3 ➔ 3. ISO 27001 ➔ 4. ITIL.",
          "1. Plan ➔ 2. Do ➔ 3. Check ➔ 4. Act."
        ],
        correctOptionIndex: 0,
        explanation: "La norma ISO 9241-210 define el ciclo iterativo del DCU en 4 fases: Comprender contexto de uso, Especificar requisitos del usuario, Producir soluciones de diseño (prototipado) y Evaluar diseños contra requisitos.",
        syllabusConcept: "Diseño Centrado en el Usuario",
        topicCode: "TEMA 7"
      },
      {
        id: 15,
        text: "¿Cuál es la especificación física y resolución del Convertidor Analógico-Digital (ADC) del microcontrolador ATmega328P en una placa Arduino Uno R3?",
        options: [
          "ADC de 8 bits (valores 0 a 255) en 4 pines digitales.",
          "ADC de 10 bits (valores 0 a 1023) en 6 pines analógicos (A0 a A5).",
          "ADC de 16 bits (valores 0 a 65535) en el puerto USB ATmega16U2.",
          "ADC de 32 bits en el oscilador de cristal de 16 MHz."
        ],
        correctOptionIndex: 1,
        explanation: "El ATmega328P del Arduino Uno posee un ADC interno de 10 bits de resolución conectado a 6 pines analógicos (A0-A5), convirtiendo voltajes de 0-5V en valores enteros de 0 a 1023.",
        syllabusConcept: "Hardware & Arduino",
        topicCode: "TEMA 8"
      },
      {
        id: 16,
        text: "Para ejecutar inferencia de redes neuronales en microcontroladores con poca RAM (TinyML), ¿qué transformación aplica TensorFlow Lite for Microcontrollers?",
        options: [
          "Aumenta la precisión a flotantes de 64 bits (float64).",
          "Aplica Cuantificación Lineal INT8 (r = S · (q - Z)) convirtiendo pesos flotantes de 32 bits a enteros de 8 bits.",
          "Exporta el modelo como script de PySerial.",
          "Compila el modelo utilizando clasificadores en cascada de Haar en OpenCV."
        ],
        correctOptionIndex: 1,
        explanation: "TensorFlow Lite para Microcontroladores utiliza cuantificación lineal INT8, mapeando los tensores float32 a enteros int8, reduciendo el consumo de RAM en hasta un 75% manteniendo alta precisión.",
        syllabusConcept: "TensorFlow & AI Edge",
        topicCode: "TEMA 8"
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
