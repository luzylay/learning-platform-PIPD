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
          syllabusConcept: q.syllabusConcept
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
      }
    });
  }

  loadFallbackQuestions() {
    // Local fallback questions if backend PostgreSQL is not responding
    this.questions = [
      {
        id: 1,
        text: "¿Qué principio cuántico establece que una partícula puede existir en múltiples estados simultáneamente hasta que es medida?",
        options: ["Cuantización", "Superposición", "Entrelazamiento", "Dualidad onda-partícula"],
        correctOptionIndex: 1,
        explanation: "La superposición cuántica permite que partículas como los cúbits representen múltiples estados (0 y 1) al mismo tiempo.",
        syllabusConcept: "Mecánica Cuántica"
      },
      {
        id: 2,
        text: "¿Cuál es la principal ventaja física de la fibra óptica de sílice purificada en comparación con la fibra de vidrio convencional?",
        options: ["Mayor susceptibilidad a EMI", "Instalación sumamente rígida", "Mínima atenuación de la luz (aprox. 0.2 dB/km)", "Mayor coste y peso"],
        correctOptionIndex: 2,
        explanation: "La fibra óptica de alta pureza posee una atenuación extremadamente baja (~0.2 dB/km), permitiendo transmisiones de larga distancia sin repetidores.",
        syllabusConcept: "Fibra Óptica vs Vidrio"
      },
      {
        id: 3,
        text: "Tres características definitorias de un 'modelo mental' en interacción humano-computadora son:",
        options: ["Estático, objetivo y absoluto", "Subjetivo, dinámico y simplificador", "Binario, lineal y matemático", "Ergonómico, electromagnético y reflectivo"],
        correctOptionIndex: 1,
        explanation: "Un modelo mental es subjetivo (varía por persona), dinámico (evoluciona con la práctica) y simplificador (reduce la complejidad real).",
        syllabusConcept: "Modelos Mentales"
      },
      {
        id: 4,
        text: "¿En qué fase del ciclo de vida del desarrollo de software (SDLC) se crean wireframes, prototipos y el diseño de la arquitectura del sistema?",
        options: ["Planificación", "Análisis", "Diseño", "Pruebas"],
        correctOptionIndex: 2,
        explanation: "La fase de Diseño se encarga de definir la arquitectura, esquemas de bases de datos, y wireframes de interfaces de usuario.",
        syllabusConcept: "Ciclo de Vida de Software"
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
