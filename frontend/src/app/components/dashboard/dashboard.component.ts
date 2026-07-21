import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalrService, SystemMetrics } from '../../services/signalr.service';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';

interface GlossaryItem {
  term: string;
  definition: string;
  analogy: string;
}

interface SyllabusTopic {
  code: string;
  title: string;
  shortDesc: string;
  theory: string[];
  purposeUsability: string;
  context: string;
  complexity: string;
  glossary: GlossaryItem[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentMetrics: SystemMetrics | null = null;
  metricsHistory: SystemMetrics[] = [];
  isConnected = false;
  systemMessage = 'Inicializando flujo en tiempo real...';
  apiStatus = 'Verificando...';
  pythonStatus = 'Verificando...';

  selectedTopic: SyllabusTopic | null = null;
  zoomedImageSrc: string | null = null;

  topics: SyllabusTopic[] = [
    {
      code: 'Q1-2',
      title: 'Física Cuántica y Medios Físicos',
      shortDesc: 'Mecánica cuántica (superposición, entrelazamiento) y comparativa de atenuación entre Fibra Óptica y Vidrio.',
      purposeUsability: 'Explicar las leyes físicas fundamentales que limitan y potencian la velocidad y capacidad del hardware informático. Permite comprender la transferencia por impulsos de luz sin pérdidas y el modelado de cúbits.',
      context: 'Paso crítico de cables de cobre (limitados por disipación térmica Joule) a la transmisión de fotones por fibra óptica pura y manipulación del espín cuántico.',
      complexity: 'Alta. Requiere asimilar espacios vectoriales complejos H² y funciones de atenuación electromagnéticas.',
      theory: [
        `
        <div class="theory-block">
          <h4 class="modal-subheading">1. Fundamentos: Superposición Cuántica, Cúbit y Espacio de Hilbert</h4>
          <p>En computación clásica, un bit solo puede estar en 0 o 1. En computación cuántica, el <strong>Cúbit (Bit cuántico)</strong> puede existir en una combinación lineal de ambos estados simultáneamente gracias a la <strong>Superposición Cuántica</strong>.</p>
          <div class="callout-box info">
            <strong>Notación Dirac |ψ⟩ y Regla de Born:</strong><br>
            El estado de un cúbit en un espacio de Hilbert H² se expresa como:
            <p class="text-center"><code class="code-highlight">|ψ⟩ = α|0⟩ + β|1⟩</code></p>
            Donde α, β ∈ ℂ son amplitudes de probabilidad complejas. Al medir físicamente, el estado colapsa. La <strong>Regla de Born</strong> exige: <code class="code-highlight">|α|² + |β|² = 1</code>, donde |α|² es la probabilidad de medir 0 y |β|² la de medir 1.
          </div>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">2. Fibra Óptica de Sílice vs Vidrio Común</h4>
          <p>La fibra óptica funciona por <strong>Reflexión Total Interna (TIR)</strong>. Al pasar luz de un núcleo denso (n₁) a un revestimiento menos denso (n₂), si el ángulo supera el <strong>Ángulo Crítico</strong> θc = arcsin(n₂ / n₁), la luz rebota internamente sin salir del cable.</p>
          <div class="callout-box alert">
            <strong>Atenuación Óptica y Sílice Purificada:</strong><br>
            La atenuación se mide mediante: <code class="code-highlight">A (dB/km) = (10 / L) · log₁₀(P_in / P_out)</code>.
            La fibra de sílice pura presenta una mínima atenuación de <strong>0.2 dB/km</strong> a 1550 nm (infrarrojo), permitiendo transmisiones de larga distancia sin repetidores. El vidrio común contiene impurezas que provocan alta dispersión de Rayleigh, absorbiendo la luz en pocos metros.
          </div>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">3. Flujo E2E & Buenas Prácticas</h4>
          <p class="pipeline-flow">
            <strong>Láser Semiconductor</strong> &rarr; <strong>Fibra Sílice Monomodo (SMF)</strong> (TIR a 1550nm) &rarr; <strong>Fotodetector PIN</strong> &rarr; <strong>Servidor Datacenter</strong>.
          </p>
          <ul>
            <li><strong>Presupuesto de Enlace Óptico:</strong> Calcular pérdidas totales asegurando un margen de seguridad de al menos +3 dB antes del receptor.</li>
            <li><strong>Monitoreo OTDR:</strong> Utilizar reflectómetros ópticos para detectar microcurvaturas con precisión métrica.</li>
          </ul>
        </div>
        `
      ],
      glossary: [
        { term: 'Dispersión Cromática vs Modal', definition: 'La cromática ocurre cuando distintas longitudes de onda viajan a diferente velocidad; la modal por trayectorias de distinta longitud.', analogy: 'En una carrera, corredores a distinto ritmo vs corredores por carriles de distinta longitud.' },
        { term: 'Regla de Born', definition: 'Postulado que afirma que |α|² y |β|² determinan la probabilidad empírica de medir cada estado.', analogy: 'Un dado cargado dentro de una caja cerrada; la masa determina la probabilidad de la cara al abrir la caja.' },
        { term: 'Dispersión de Rayleigh', definition: 'Esparcimiento de luz por fluctuaciones microscópicas de densidad en el vidrio, proporcional a 1/λ⁴.', analogy: 'La razón por la que el cielo se ve azul de día al dispersarse la luz corta en la atmósfera.' }
      ]
    },
    {
      code: 'Q3-4',
      title: 'Modelos Mentales y SDLC (Ciclo de Software)',
      shortDesc: '3 características de modelos mentales en UX/UI y ciclo de vida de desarrollo de software (fase de diseño de GUI).',
      purposeUsability: 'Asegurar que los flujos de software correspondan a la estructura cognitiva del operador humano, reduciendo errores y eliminando la curva de aprendizaje.',
      context: 'Ergonomía cognitiva de Donald Norman combinada con las fases estandarizadas del SDLC para planificar el desarrollo sin desviaciones.',
      complexity: 'Media. Enfocado en psicología del diseño e ingeniería de software.',
      theory: [
        `
        <div class="theory-block">
          <h4 class="modal-subheading">1. Características del Modelo Mental</h4>
          <p>Un <strong>Modelo Mental</strong> en HCI es la representación interna que tiene el usuario sobre el funcionamiento del sistema. Se caracteriza por ser:</p>
          <ul>
            <li><strong>Subjetivo:</strong> Varía entre personas según sus experiencias previas.</li>
            <li><strong>Dinámico:</strong> Evoluciona y se adapta con la práctica constante.</li>
            <li><strong>Simplificador:</strong> Reduce la complejidad técnica interna a conceptos manejables.</li>
          </ul>
          <div class="callout-box info">
            <strong>Golfos de Ejecución y Evaluación de Norman:</strong><br>
            El <strong>Golfo de Ejecución</strong> es la brecha entre la intención del usuario y la acción permitida en pantalla. El <strong>Golfo de Evaluación</strong> es la brecha entre el estado real del sistema y lo percibido visualmente por el usuario.
          </div>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">2. Fases de Diseño GUI en el SDLC</h4>
          <p>En la <strong>Fase de Diseño (Fase 3 del SDLC)</strong> se elaboran dos entregables fundamentales:</p>
          <ul>
            <li><strong>Wireframes:</strong> Esquemas visuales estáticos a blanco y negro (baja fidelidad) que definen la estructura y jerarquía de elementos.</li>
            <li><strong>Prototipos Interactivos:</strong> Maquetas clicables que simulan interactividad para realizar <strong>Pruebas de Usabilidad</strong> tempranas antes de escribir código.</li>
          </ul>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">3. Flujo E2E & Buenas Prácticas</h4>
          <p class="pipeline-flow">
            <strong>Requisitos de Usuario</strong> &rarr; <strong>Wireframes de Baja Fidelidad</strong> &rarr; <strong>Prototipos Interactivos</strong> &rarr; <strong>Pruebas de Usabilidad</strong> &rarr; <strong>Código Angular</strong>.
          </p>
          <ul>
            <li><strong>Validación Temprana:</strong> Probar prototipos clicables con usuarios detecta el 85% de las fallas antes de codificar, ahorrando 80% en costes.</li>
          </ul>
        </div>
        `
      ],
      glossary: [
        { term: 'Wireframe vs Prototipo', definition: 'El wireframe es el plano estructural estático; el prototipo es la simulación interactiva clicable.', analogy: 'El plano en papel de una casa vs la maqueta 3D interactiva.' },
        { term: 'Golfo de Evaluación', definition: 'Brecha cognitiva entre el estado real del software y lo que el usuario comprende en pantalla.', analogy: 'Presionar el botón de un ascensor y que no se encienda la luz.' }
      ]
    },
    {
      code: 'Q5-6',
      title: 'Big Data y Cloud Computing',
      shortDesc: 'Las 5 V del Big Data (Volumen, Velocidad...) y modelos de servicio en la nube (IaaS, PaaS, SaaS) con sus proveedores.',
      purposeUsability: 'Procesar grandes volúmenes distribuyendo el cómputo en clústeres de la nube para lograr flexibilidad y pago por uso.',
      context: 'Virtualización de datacenters y arquitectura distribuida resiliente.',
      complexity: 'Media-Alta. Sistemas distribuidos, hipervisores, Docker y Kubernetes.',
      theory: [
        `
        <div class="theory-block">
          <h4 class="modal-subheading">1. Las 5 V del Big Data y el Teorema CAP</h4>
          <p>Big Data se rige por las 5 V: <strong>Volumen</strong> (Petabytes), <strong>Velocidad</strong> (tiempo real), <strong>Variedad</strong> (SQL, JSON, video), <strong>Veracidad</strong> (calidad) y <strong>Valor</strong> (utilidad).</p>
          <div class="callout-box info">
            <strong>Teorema CAP:</strong> Afirma que una base de datos distribuida solo puede garantizar 2 de 3 propiedades ante fallos de red: Consistencia (C), Disponibilidad (A) y Tolerancia a Particiones (P).
          </div>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">2. Modelos de Nube (IaaS, PaaS, SaaS) y Docker</h4>
          <ul>
            <li><strong>IaaS (Infraestructura):</strong> Alquiler de servidores virtuales y red. <em>Ejemplo: AWS EC2.</em></li>
            <li><strong>PaaS (Plataforma):</strong> Runtime gestionado donde solo despliegas código. <em>Ejemplo: Heroku, AWS Elastic Beanstalk.</em></li>
            <li><strong>SaaS (Software):</strong> Aplicación completa en la web. <em>Ejemplo: Microsoft 365, Gmail.</em></li>
          </ul>
          <div class="callout-box alert">
            <strong>Docker vs VMs:</strong> Las VMs virtualizan hardware completo sobre un hipervisor; Docker virtualiza a nivel de SO compartiendo el Kernel anfitrión. <strong>Kubernetes (K8s)</strong> orquesta contenedores Docker automatizando el escalado y autorrecuperación.
          </div>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">3. Flujo E2E & Buenas Prácticas</h4>
          <p class="pipeline-flow">
            <strong>Ingesta Kafka</strong> &rarr; <strong>AWS S3 Data Lake</strong> &rarr; <strong>PySpark / EMR</strong> &rarr; <strong>Redshift Warehouse</strong> &rarr; <strong>Instancias AWS EC2 (IaaS)</strong>.
          </p>
          <ul>
            <li><strong>Infraestructura como Código (IaC):</strong> Automatizar aprovisionamiento con Terraform o CloudFormation.</li>
          </ul>
        </div>
        `
      ],
      glossary: [
        { term: 'IaaS (AWS EC2)', definition: 'Infraestructura como servicio que entrega servidores virtuales y redes bajo demanda.', analogy: 'Alquilar un apartamento vacío que tú decoras y equipas.' },
        { term: 'Docker vs VM', definition: 'Docker comparte el Kernel anfitrión; las VMs ejecutan un SO completo con hipervisor.', analogy: 'Departamento en edificio vs casa independiente.' }
      ]
    },
    {
      code: 'Q7-8',
      title: 'DCU y Diseño de Interfaces',
      shortDesc: 'Filosofía de Diseño Centrado en el Usuario (DCU) y diagrama de flujo iterativo para el diseño de interfaces.',
      purposeUsability: 'Garantizar la eficiencia del operador humano en el software, reduciendo errores y tiempos de formación.',
      context: 'Normas internacionales ISO 9241-210 que regulan la usabilidad de sistemas interactivos.',
      complexity: 'Baja-Media. Métodos de evaluación heurística y diseño adaptable.',
      theory: [
        `
        <div class="theory-block">
          <h4 class="modal-subheading">1. Proceso DCU (ISO 9241-210)</h4>
          <p>El <strong>Diseño Centrado en el Usuario (DCU)</strong> ubica al usuario final en el centro del desarrollo mediante fases iterativas: 1. Entender contexto de uso, 2. Especificar requisitos, 3. Producir prototipos, 4. Evaluar usabilidad.</p>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">2. Heurísticas de Usabilidad de Nielsen</h4>
          <p>Principios fundamentales para inspeccionar GUIs: 1. Visibilidad del estado del sistema, 2. Prevención de errores, 3. Control y libertad del usuario (opciones deshacer/cancelar), 4. Consistencia.</p>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">3. Flujo E2E & Buenas Prácticas</h4>
          <p class="pipeline-flow">
            <strong>Requisitos ISO 9241-210</strong> &rarr; <strong>Wireframes Iniciales</strong> &rarr; <strong>Prototipos de Baja Fidelidad</strong> &rarr; <strong>Evaluación Heurística</strong> &rarr; <strong>Desarrollo GUI Angular</strong>.
          </p>
          <ul>
            <li><strong>Accesibilidad WCAG 2.1 AA:</strong> Garantizar contraste 4.5:1 y soporte completo de navegación por teclado.</li>
          </ul>
        </div>
        `
      ],
      glossary: [
        { term: 'Evaluación Heurística', definition: 'Inspección de usabilidad realizada por expertos frente a heurísticas de diseño.', analogy: 'Lista de control de seguridad para un automóvil antes de salir.' },
        { term: 'Diseño Iterativo', definition: 'Ciclos repetidos de boceto, test de usabilidad y refinamiento incremental.', analogy: 'Esculpir en arcilla pidiendo retroalimentación continua.' }
      ]
    },
    {
      code: 'Q9-13',
      title: 'Inteligencia Artificial y Arduino',
      shortDesc: 'Redes neuronales con TensorFlow, TensorFlow Lite en microcontroladores, clasificación de formas y lógica de hardware.',
      purposeUsability: 'Habilitar inteligencia embebida en hardware local (TinyML/Edge AI) sin depender de servidores externos.',
      context: 'Ejecución de inferencia neuronal en microcontroladores de memoria reducida.',
      complexity: 'Alta. Redes neuronales, cuantificación INT8 y visión artificial con OpenCV.',
      theory: [
        `
        <div class="theory-block">
          <h4 class="modal-subheading">1. Perceptrón y TensorFlow Lite for Microcontrollers</h4>
          <p>Un Perceptrón calcula <code class="code-highlight">z = ∑ w_i · x_i + b</code> con activación ReLU <code class="code-highlight">f(x) = max(0, x)</code>. Para microcontroladores Arduino con poca RAM, <strong>TensorFlow Lite for Microcontrollers</strong> aplica <strong>Cuantificación Lineal INT8</strong>:</p>
          <div class="callout-box info">
            <p class="text-center"><code class="code-highlight">r = S · (q - Z)</code></p>
            Donde r es el float32 original y q el entero de 8 bits cuantizado, reduciendo en 75% el uso de memoria en placa.
          </div>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">2. Clasificación de Formas con OpenCV cv2.approxPolyDP</h4>
          <p>Para clasificar figuras geométricas en contornos extraídos por OpenCV, se aplica el algoritmo Ramer-Douglas-Peucker con <code class="code-highlight">cv2.approxPolyDP</code>:</p>
          <div class="callout-box alert">
            <pre><code>perimetro = cv2.arcLength(contorno, True)
epsilon = 0.04 * perimetro
approx = cv2.approxPolyDP(contorno, epsilon, True)
vertices = len(approx)

# Clasificación:
# 3 vértices -> Triángulo (LED Verde)
# 4 vértices -> Cuadrado (LED Azul)
# >6 vértices -> Círculo (LED Rojo)</code></pre>
          </div>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">3. Flujo E2E & Buenas Prácticas</h4>
          <p class="pipeline-flow">
            <strong>Cámara / Sensor</strong> &rarr; <strong>Preprocesamiento OpenCV (cv2.approxPolyDP)</strong> &rarr; <strong>Inferencia TF Lite INT8</strong> &rarr; <strong>PySerial</strong> &rarr; <strong>Arduino Actuador</strong>.
          </p>
          <ul>
            <li><strong>Latencia Edge:</strong> Mantener inferencia &lt; 50 ms y convertir siempre imágenes a escala de grises previamente.</li>
          </ul>
        </div>
        `
      ],
      glossary: [
        { term: 'TensorFlow Lite for Microcontrollers', definition: 'Variante ultra optimizada de TensorFlow para ejecutar inferencia cuantizada INT8 en placas como Arduino.', analogy: 'Una versión de bolsillo ultracompacta de una enciclopedia.' },
        { term: 'cv2.approxPolyDP', definition: 'Algoritmo de aproximación poligonal en OpenCV que cuenta los vértices de un contorno con tolerancia epsilon.', analogy: 'Unir puntos de un dibujo con líneas rectas simplificadas.' }
      ]
    },
    {
      code: 'Q10-15',
      title: 'SciPy y Procesamiento de Señales',
      shortDesc: 'Transformadas de Fourier en SciPy (FFT) y diseño de filtros analógicos pasa-bajos para eliminar ruido de sensores.',
      purposeUsability: 'Eliminar ruido electromagnético de alta frecuencia en sensores antes de procesar sus mediciones en la plataforma.',
      context: 'Tratamiento digital de señales analógicas muestreadas mediante librerías científicas en Python.',
      complexity: 'Alta. Transformada de Fourier, espectro de frecuencia y filtros digitales.',
      theory: [
        `
        <div class="theory-block">
          <h4 class="modal-subheading">1. Transformada de Fourier FFT e Identidad de Euler</h4>
          <p>La DFT convierte señales del <strong>Dominio del Tiempo</strong> al <strong>Dominio de la Frecuencia</strong> mediante la Identidad de Euler <code class="code-highlight">e^{-iθ} = cos(θ) - i sin(θ)</code>. La <strong>FFT (Fast Fourier Transform)</strong> de SciPy optimiza el tiempo de cálculo de O(N²) a O(N log N).</p>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">2. Filtro Pasa-Bajos Butterworth en SciPy</h4>
          <p>Un <strong>Filtro Pasa-Bajos</strong> mantiene las frecuencias bajas útiles y elimina el ruido de alta frecuencia:</p>
          <div class="callout-box info">
            <p class="text-center"><code class="code-highlight">|H(ω)|² = 1 / ( 1 + (ω / ω_c)^{2n} )</code></p>
            En SciPy se implementa calculando la <strong>Frecuencia de Nyquist</strong> (f_nyquist = f_s / 2):
            <pre><code>from scipy import signal
nyquist = fs / 2.0
norm = frecuencia_corte / nyquist
b, a = signal.butter(4, norm, btype='low')
filtrada = signal.filtfilt(b, a, señal_ruidosa)</code></pre>
          </div>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">3. Flujo E2E & Buenas Prácticas</h4>
          <p class="pipeline-flow">
            <strong>Sensor Analógico</strong> &rarr; <strong>ADC</strong> &rarr; <strong>SciPy FFT (Espectro)</strong> &rarr; <strong>Filtro Butterworth (filtfilt)</strong> &rarr; <strong>Señal Limpia</strong>.
          </p>
          <ul>
            <li><strong>Teorema de Nyquist-Shannon:</strong> Muestrear al menos al doble de la frecuencia máxima (f_s &ge; 2 f_max) para evitar Aliasing. Usar filtfilt para cero desfase de fase.</li>
          </ul>
        </div>
        `
      ],
      glossary: [
        { term: 'FFT (Fast Fourier Transform)', definition: 'Algoritmo que descompone señales en frecuencias reduciendo complejidad a O(N log N).', analogy: 'Un prisma que descompone la luz blanca en sus colores componentes.' },
        { term: 'Filtro Pasa-Bajos (Low-Pass)', definition: 'Filtro que conserva componentes lentos y atenúa el ruido rápido de alta frecuencia.', analogy: 'Un colador fino que deja pasar el agua reteniendo grumos.' }
      ]
    },
    {
      code: 'Q11-12',
      title: 'Pandas y Comunicación Serial',
      shortDesc: 'Limpieza y manipulación de DataFrames y comunicaciones bidireccionales eficientes Python-Arduino vía PySerial.',
      purposeUsability: 'Capturar telemetría física de sensores e insertarla en DataFrames para procesamiento matricial y monitoreo interactivo.',
      context: 'Conexión entre puertos de hardware serie (COM/USB) y bibliotecas de ciencia de datos.',
      complexity: 'Media. Baudios, memoria en C y graficado interactivo non-blocking.',
      theory: [
        `
        <div class="theory-block">
          <h4 class="modal-subheading">1. Pandas DataFrames y Vectorización SIMD</h4>
          <p>Un DataFrame almacena datos en bloques contiguos de memoria en C. Las operaciones se ejecutan mediante instrucciones <strong>SIMD (Single Instruction Multiple Data)</strong> en la CPU, procesando arreglos completos en un solo ciclo.</p>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">2. PySerial y el Retardo time.sleep(2)</h4>
          <p>Al instanciar <code class="code-highlight">serial.Serial('COM3', 9600, timeout=1)</code>, la conmutación de la línea <strong>DTR (Data Terminal Ready)</strong> activa el <strong>Auto-Reset físico del microcontrolador Arduino</strong>. Es indispensable incluir un retardo de <code class="code-highlight">time.sleep(2)</code> para esperar que el bootloader inicie antes de enviar datos.</p>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">3. Monitoreo Interactivo con Matplotlib (plt.ion())</h4>
          <p>Para actualizar gráficos en tiempo real sin bloquear la GUI, se usa Matplotlib interactivo:</p>
          <div class="callout-box alert">
            <pre><code>plt.ion() # Modo interactivo
fig, ax = plt.subplots()
# En el bucle de lectura serial:
ax.clear()
ax.plot(df['temp'].tail(100))
plt.pause(0.1) # Procesar eventos GUI</code></pre>
          </div>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">4. Flujo E2E & Buenas Prácticas</h4>
          <p class="pipeline-flow">
            <strong>Arduino Sensor</strong> &rarr; <strong>Puerto USB Serial UART</strong> &rarr; <strong>PySerial (time.sleep(2))</strong> &rarr; <strong>Pandas DataFrame (SIMD)</strong> &rarr; <strong>Matplotlib (plt.ion())</strong>.
          </p>
          <ul>
            <li>Cerrar siempre el puerto serial con <code class="code-highlight">arduino.close()</code> en bloques try...finally y limitar el buffer con <code class="code-highlight">.tail(100)</code>.</li>
          </ul>
        </div>
        `
      ],
      glossary: [
        { term: 'Auto-Reset por DTR', definition: 'Reinicio automático de Arduino al abrir la conexión serial debido al cambio en el pin DTR.', analogy: 'Esperar a que encienda la computadora antes de teclear.' },
        { term: 'Modo Interactivo (plt.ion())', definition: 'Permite refrescar gráficos en tiempo real sin congelar el programa.', analogy: 'Un marcador deportivo que actualiza la puntuación en vivo.' }
      ]
    },
    {
      code: 'Q16',
      title: 'Visión Artificial Integrada',
      shortDesc: 'Detección de rostros en OpenCV (Haar Cascades) y activación por pulsos seriales para sistemas embebidos.',
      purposeUsability: 'Implementar clasificadores visuales ligeros en tiempo real sobre CPUs comunes sin tarjetas gráficas dedicadas.',
      context: 'Algoritmo de Viola-Jones e Imagen Integral.',
      complexity: 'Media-Alta. Imagen Integral O(1) y cascadas de rechazo AdaBoost.',
      theory: [
        `
        <div class="theory-block">
          <h4 class="modal-subheading">1. Imagen Integral O(1) de Viola-Jones</h4>
          <p>El clasificador Haar calcula la suma de regiones rectangulares en tiempo constante <strong>O(1)</strong> usando la <strong>Imagen Integral</strong>: <code class="code-highlight">II(x, y) = ∑ I(x', y')</code>. La suma de cualquier rectángulo ABCD se obtiene instantáneamente con 4 accesos a memoria: <code class="code-highlight">Suma = II(D) + II(A) - II(B) - II(C)</code>.</p>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">2. Cascada de Clasificadores con OpenCV</h4>
          <p>Las características Haar se organizan en <strong>Cascadas</strong>. Las etapas iniciales simples <strong>descartan rápidamente</strong> las zonas que no contienen rostros, evitando cálculos pesados en el fondo.</p>
          <div class="callout-box alert">
            <pre><code>face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)
# Si len(faces) > 0 -> Enviar señal serial a Arduino para activar buzzer</code></pre>
          </div>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">3. Flujo E2E & Buenas Prácticas</h4>
          <p class="pipeline-flow">
            <strong>Cámara Web</strong> &rarr; <strong>Escala de Grises</strong> &rarr; <strong>Imagen Integral O(1)</strong> &rarr; <strong>Cascada Haar</strong> &rarr; <strong>Bounding Box</strong> &rarr; <strong>Señal Serial</strong> &rarr; <strong>Arduino Buzzer</strong>.
          </p>
          <ul>
            <li>Ajustar scaleFactor=1.1 y minNeighbors=5 para evitar falsos positivos por sombras.</li>
          </ul>
        </div>
        `
      ],
      glossary: [
        { term: 'Imagen Integral O(1)', definition: 'Acumulación de píxeles para calcular sumas de áreas rectangulares en tiempo constante O(1).', analogy: 'Un mapa de postes kilométricos para restar distancias al instante.' },
        { term: 'Cascada de Rechazo', definition: 'Estructura jerárquica que descarta temprano subventanas sin objetos.', analogy: 'Filtro de currículums que descarta de inmediato a quien no cumple requisitos.' }
      ]
    }
  ];

  private metricsSub!: Subscription;
  private messageSub!: Subscription;
  private statusSub!: Subscription;

  constructor(
    private signalrService: SignalrService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.metricsSub = this.signalrService.getMetrics().subscribe(metrics => {
      this.currentMetrics = metrics;
      this.metricsHistory.push(metrics);
      if (this.metricsHistory.length > 20) {
        this.metricsHistory.shift();
      }
    });

    this.messageSub = this.signalrService.getSystemMessages().subscribe(msg => {
      this.systemMessage = msg;
    });

    this.statusSub = this.signalrService.getConnectionStatus().subscribe((status: boolean) => {
      this.isConnected = status;
      if (status) {
        this.apiStatus = 'ONLINE';
      }
    });

    this.apiService.getQuantumExplain().subscribe({
      next: () => {
        this.apiStatus = 'ONLINE';
      },
      error: () => {
        this.apiStatus = 'OFFLINE';
      }
    });

    this.apiService.getQuantumExplain().subscribe({
      next: () => {
        this.pythonStatus = 'ONLINE';
      },
      error: () => {
        this.pythonStatus = 'OFFLINE';
      }
    });
  }

  openTopicModal(topic: SyllabusTopic) {
    this.selectedTopic = topic;
  }

  closeModal() {
    this.selectedTopic = null;
    this.zoomedImageSrc = null;
  }

  onModalClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target && target.classList.contains('modal-diagram-img')) {
      const img = target as HTMLImageElement;
      this.zoomedImageSrc = img.src;
    }
  }

  ngOnDestroy() {
    if (this.metricsSub) this.metricsSub.unsubscribe();
    if (this.messageSub) this.messageSub.unsubscribe();
    if (this.statusSub) this.statusSub.unsubscribe();
  }
}
