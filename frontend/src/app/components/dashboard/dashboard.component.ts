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
      shortDesc: 'Mecánica cuántica (superposición, entrelazamiento) y comparativa de atenuación entre Fibra Óptica y Fibra de Vidrio.',
      purposeUsability: 'Explicar las leyes físicas que limitan y potencian la velocidad y capacidad del hardware informático. Permite comprender matemáticamente la transferencia de datos sin pérdidas de luz y el modelado físico de cúbits.',
      context: 'El paso crítico en ingeniería física de los cables de cobre (limitados por pérdidas de calor y ruido eléctrico) a la transmisión de fotones de luz y manipulación del espín cuántico de los átomos.',
      complexity: 'Alta. Requiere asimilar espacios vectoriales complejos y funciones de atenuación de ondas electromagnéticas.',
      theory: [
        `
        <div class="theory-block">
          <h4 class="modal-subheading">1. Superposición Cuántica, Cúbit y Espacio de Hilbert</h4>
          <div class="theory-split">
            <div class="theory-text-content">
              <p>En computación clásica, un bit es un interruptor físico que solo puede estar en dos estados excluyentes: encendido (1) o apagado (0). En computación cuántica, el <strong>Cúbit (Bit cuántico)</strong> puede representar ambos estados simultáneamente gracias al principio físico de superposición.</p>
              
              <div class="callout-box info">
                <strong>¿Qué significa la notación Dirac |ψ⟩ (Bra-Ket)?</strong><br>
                El símbolo <code class="code-highlight">| ⟩</code> (llamado "Ket") representa un vector columna en un espacio de Hilbert. La letra griega <code class="code-highlight">ψ</code> (psi) representa el estado global de nuestro sistema cuántico. Se lee como "el vector de estado psi".
              </div>

              <div class="callout-box info">
                <strong>¿Qué es un Espacio de Hilbert (H²)?</strong><br>
                Es un espacio geométrico de vectores donde los coeficientes no son números reales normales, sino <strong>números complejos</strong> (números con una parte real y otra imaginaria, como <code class="code-highlight">a + bi</code>). El número "2" superior significa que tiene exactamente 2 dimensiones (los estados básicos 0 y 1).
              </div>

              <p>La fórmula de estado se escribe: <code class="code-highlight">|ψ⟩ = α|0⟩ + β|1⟩</code>. Aquí, <code class="code-highlight">|0⟩</code> y <code class="code-highlight">|1⟩</code> son los vectores base (piensa en ellos como los ejes X e Y tradicionales). Los coeficientes <code class="code-highlight">α</code> (alfa) y <code class="code-highlight">β</code> (beta) son <strong>amplitudes de probabilidad complejas</strong>.</p>
              
              <div class="callout-box alert">
                <strong>¿Qué es la Regla de Born y la Condición de Normalización?</strong><br>
                Al medir físicamente un cúbit, la superposición se destruye (el sistema "colapsa" a un estado clásico 0 o 1). La probabilidad de obtener 0 es <code class="code-highlight">|α|²</code> y de obtener 1 es <code class="code-highlight">|β|²</code>. Dado que la probabilidad total de cualquier evento debe ser siempre el 100% (1.0), se cumple estrictamente la fórmula: 
                <p class="text-center"><code class="code-highlight">|α|² + |β|² = 1</code></p>
              </div>
            </div>
            <div class="theory-visual-content">
              <div class="image-wrapper">
                <img src="assets/quantum_superposition.png" alt="Superposición cuántica en Esfera de Bloch" class="modal-diagram-img">
                <span class="img-caption">Esfera de Bloch para cúbits</span>
              </div>
            </div>
          </div>
          <div class="official-source">
            <i class="fa-solid fa-book-bookmark"></i> <strong>Fuente Oficial:</strong> 
            <a href="https://www.ibm.com/topics/quantum-computing" target="_blank">IBM Quantum Computing Learning Guide</a>
          </div>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">2. Entrelazamiento Cuántico y No-Localidad</h4>
          <p>El entrelazamiento ocurre cuando dos o más partículas cuánticas se correlacionan de tal manera que sus estados físicos individuales no pueden describirse de forma independiente (matemáticamente, sus vectores no se pueden descomponer mediante un producto tensorial: <code class="code-highlight">|ψ⟩_AB ≠ |ψ⟩_A ⊗ |ψ⟩_B</code>).</p>
          
          <div class="callout-box info">
            <strong>Explicación Simple del Entrelazamiento:</strong><br>
            Imagina que cortas una carta de juego a la mitad (un As de Corazones) y la guardas en dos sobres cerrados. Si abres tu sobre y ves la mitad izquierda, sabes <strong>instantáneamente</strong> que el otro sobre contiene la mitad derecha, sin importar si el otro sobre está a años luz de distancia. En física cuántica, esta correlación es real y activa (no predeterminada en los sobres antes de abrirse), lo que se conoce como no-localidad cuántica.
          </div>
          <div class="official-source">
            <i class="fa-solid fa-book-bookmark"></i> <strong>Fuente Oficial:</strong> 
            <a href="https://quantum-journal.org/" target="_blank">Quantum Journal Publications</a>
          </div>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">3. Fibra Óptica: Reflexión Interna, Ley de Snell y Atenuación de Sílice</h4>
          <div class="theory-split">
            <div class="theory-text-content">
              <p>La fibra óptica funciona como una tubería guía para los fotones de luz. Está compuesta por un núcleo central de sílice pura con un índice de refracción alto (<code class="code-highlight">n₁</code>) rodeado por un revestimiento exterior de menor índice de refracción (<code class="code-highlight">n₂</code>).</p>
              
              <div class="callout-box info">
                <strong>¿Qué es la Refracción y la Reflexión Total Interna (TIR)?</strong><br>
                Cuando la luz pasa de un medio denso a uno menos denso, se desvía (se refracta). Si aumentamos el ángulo de incidencia lo suficiente, la luz dejará de cruzar la frontera y rebotará hacia atrás como si fuera un espejo perfecto. La frontera donde la luz viaja exactamente paralela al cable (90°) se rige por la ley de Snell (<code class="code-highlight">n₁ sin(θ₁) = n₂ sin(θ₂)</code>). De aquí deducimos el <strong>Ángulo Crítico (θ_c)</strong>:
                <p class="text-center"><code class="code-highlight">θ_c = arcsin(n₂ / n₁)</code></p>
                Cualquier haz de luz con un ángulo de entrada mayor que <code class="code-highlight">θ_c</code> quedará atrapado rebotando infinitamente dentro del núcleo.
              </div>

              <div class="callout-box alert">
                <strong>¿Por qué se usa Sílice purificada frente al Vidrio Común?</strong><br>
                La sílice es dióxido de silicio (<code class="code-highlight">SiO₂</code>) libre de impurezas metálicas. Esto minimiza la <strong>Dispersión de Rayleigh</strong> (choque de fotones con partículas microscópicas que los desvían). La atenuación se mide mediante la fórmula de potencia decibélica:
                <p class="text-center"><code class="code-highlight">A (dB) = 10 log₁₀(P_entrada / P_salida)</code></p>
                El estándar de la sílice es de <code class="code-highlight">0.2 dB/km</code> a 1550 nm (infrarrojo), lo que significa que la luz retiene el 96% de su potencia tras un kilómetro. El vidrio ordinario tiene burbujas de aire y trazas de hierro que provocan pérdidas de luz tan altas que la señal se degrada por completo a los pocos metros.
              </div>
            </div>
            <div class="theory-visual-content">
              <div class="image-wrapper">
                <img src="assets/fiber_reflection.png" alt="Reflexión total interna" class="modal-diagram-img">
                <span class="img-caption">Guiado de luz por reflexión interna</span>
              </div>
            </div>
          </div>
          <div class="official-source">
            <i class="fa-solid fa-book-bookmark"></i> <strong>Fuente Oficial:</strong> 
            <a href="https://www.corning.com/worldwide/en/products/optical-communications.html" target="_blank">Corning Glass & Fiber Fiber Optics Theory</a>
          </div>
        </div>
        `
      ],
      glossary: [
        {
          term: 'Espacio de Hilbert',
          definition: 'Espacio vectorial matemático que cuenta con un producto interno para medir longitudes y ángulos en dimensiones complejas.',
          analogy: 'Una pizarra infinita donde puedes dibujar flechas en cualquier dirección, pero donde los tamaños se miden con coordenadas de números complejos.'
        },
        {
          term: 'Colapso Cuántico',
          definition: 'Transición abrupta de un sistema cuántico en superposición de estados a un estado físico clásico único y medible.',
          analogy: 'Tomarle una fotografía a un trompo girando. Mientras gira es una mezcla difusa; la foto (la medición) lo congela en una posición exacta.'
        },
        {
          term: 'Dispersión de Rayleigh',
          definition: 'Desviación de la trayectoria de la luz al chocar con imperfecciones o partículas mucho más pequeñas que su longitud de onda.',
          analogy: 'Es la razón de que el cielo sea azul. La luz de onda corta (azul) choca contra las moléculas de aire y se dispersa en el cielo; en la fibra, se usa infrarrojo para que ignore esas imperfecciones y pase de largo.'
        }
      ]
    },
    {
      code: 'Q3-4',
      title: 'Modelos Mentales y SDLC (Ciclo de Software)',
      shortDesc: '3 características de modelos mentales en UX/UI y ciclo de vida de desarrollo de software (fase de diseño de GUI).',
      purposeUsability: 'Asegurar que los flujos y pantallas de software se correspondan exactamente con la forma en que los usuarios piensan e interpretan las tareas, reduciendo errores y eliminando la curva de aprendizaje compleja.',
      context: 'La formalización del diseño centrado en el humano, originada en los estudios de ergonomía cognitiva de Donald Norman en los 80, combinada con las etapas estandarizadas del SDLC para planificar el desarrollo de software sin desviaciones.',
      complexity: 'Media. Demanda entender conceptos de psicología del diseño y mapear las fases del ciclo de vida de desarrollo.',
      theory: [
        `
        <div class="theory-block">
          <h4 class="modal-subheading">1. Modelos Mentales en UX y los Estadios de Donald Norman</h4>
          <p>Un <strong>Modelo Mental</strong> es el mapa mental interno que tiene un usuario sobre cómo funciona un software. Si una aplicación contradice esta expectativa (por ejemplo, si deslizar hacia abajo en una app no refresca el contenido), se produce una frustración o error operativo.</p>
          
          <div class="callout-box info">
            <strong>¿Qué son los Golfos de Ejecución y Evaluación de Norman?</strong><br>
            Donald Norman define que un usuario pasa por dos "golfos" o barreras al usar una pantalla:
            <ul>
              <li><strong>Golfo de Ejecución:</strong> La distancia entre lo que el usuario quiere hacer y lo que la interfaz le permite hacer. Si el usuario quiere guardar un archivo pero el botón de guardar está oculto en un submenú complejo, el Golfo de Ejecución es alto.</li>
              <li><strong>Golfo de Evaluación:</strong> La distancia entre el estado real del sistema y lo que el usuario percibe. Si el usuario presiona "Enviar dinero" y la pantalla se queda en blanco sin mostrar un mensaje de confirmación, el Golfo de Evaluación es alto porque el usuario no sabe si la operación se procesó.</li>
            </ul>
          </div>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">2. Fases de Diseño GUI en el SDLC (Ciclo de Vida de Software)</h4>
          <p>En el SDLC, la fase de diseño de la interfaz gráfica de usuario (GUI) sirve para traducir los requisitos lógicos abstractos en pantallas y flujos reales. En esta etapa se construyen dos entregables ordenados:</p>
          
          <div class="callout-box info">
            <strong>Diferencia entre Wireframes y Prototipos:</strong><br>
            <ul>
              <li><strong>Wireframes:</strong> Planos visuales estáticos y de baja fidelidad (sin colores, logos ni tipografías). Muestran la jerarquía y estructura básica de los elementos. Es equivalente al plano estructural de una casa.</li>
              <li><strong>Prototipos Interactivos:</strong> Maquetas de alta fidelidad que simulan interactividad (se puede hacer clic en botones y navegar entre vistas). Sirven para validar la usabilidad con usuarios antes de programar una sola línea de código, reduciendo costes de desarrollo.</li>
            </ul>
          </div>
          <div class="official-source">
            <i class="fa-solid fa-book-bookmark"></i> <strong>Fuente Oficial:</strong> 
            <a href="https://www.pmi.org/" target="_blank">Project Management Institute SDLC Framework</a>
          </div>
        </div>
        `
      ],
      glossary: [
        {
          term: 'Disonancia Cognitiva',
          definition: 'Tensión mental que se produce cuando las expectativas previas del usuario chocan bruscamente con la realidad operativa del sistema.',
          analogy: 'Tratar de empujar una puerta que tiene manija de jalar. Te detienes confundido y frustrado por una fracción de segundo al romper tu hábito.'
        },
        {
          term: 'Wireframe',
          definition: 'Esquema visual a blanco y negro que define la distribución funcional de los elementos de una pantalla, ignorando la estética visual.',
          analogy: 'El plano arquitectónico estructural que muestra dónde van las columnas y tuberías antes de decidir el color de las paredes.'
        },
        {
          term: 'Prototipo Interactivo',
          definition: 'Simulación dinámica y clicable de las pantallas de diseño para probar flujos de usuario antes de iniciar la programación.',
          analogy: 'El departamento piloto de un edificio en preventa. No tiene cimientos de concreto finales, pero permite caminar y experimentar el espacio.'
        }
      ]
    },
    {
      code: 'Q5-6',
      title: 'Big Data y Cloud Computing',
      shortDesc: 'Las 5 V del Big Data (Volumen, Velocidad...) y modelos de servicio en la nube (IaaS, PaaS, SaaS) con sus proveedores.',
      purposeUsability: 'Procesar conjuntos de datos masivos distribuyendo el almacenamiento y procesamiento entre múltiples servidores, delegando la gestión física a proveedores de nube para lograr elasticidad en los costes operacionales.',
      context: 'El nacimiento de la indexación web elástica en 2005 y la necesidad de escalar el cómputo sin invertir millones en centros de datos locales propensos a fallar físicamente.',
      complexity: 'Media-Alta. Exige comprender conceptos de sistemas distribuidos, contenedores Docker, y la orquestación mediante Kubernetes (K8s).',
      theory: [
        `
        <div class="theory-block">
          <h4 class="modal-subheading">1. Las 5 V del Big Data y el Teorema CAP</h4>
          <div class="theory-split">
            <div class="theory-text-content">
              <p>El término <strong>Big Data</strong> se utiliza cuando el almacenamiento y procesamiento de los datos superan la capacidad física de un solo servidor convencional. Se rige por 5 variables conceptuales:</p>
              <ul>
                <li><strong>Volumen:</strong> La inmensa cantidad de registros (Petabytes).</li>
                <li><strong>Velocidad:</strong> Ingesta y análisis en tiempo real de flujos continuos.</li>
                <li><strong>Variedad:</strong> Formatos diversos (tablas SQL estructuradas, archivos JSON semiestructurados y audios/videos no estructurados).</li>
                <li><strong>Veracidad:</strong> Calidad y limpieza de las fuentes de información.</li>
                <li><strong>Valor:</strong> Utilidad que aporta tras analizar la información.</li>
              </ul>
              
              <div class="callout-box info">
                <strong>¿Qué es el Teorema CAP (Consistencia, Disponibilidad, Particionamiento)?</strong><br>
                Define que un sistema de base de datos distribuido no puede garantizar simultáneamente las tres propiedades en caso de una falla en la red (Partición):
                <ul>
                  <li><strong>Consistencia (C):</strong> Todos los servidores leen la misma información al mismo tiempo.</li>
                  <li><strong>Disponibilidad (A):</strong> Cada petición recibe una respuesta sin error, aunque la información no esté actualizada.</li>
                  <li><strong>Tolerancia a Particiones (P):</strong> El sistema sigue funcionando a pesar de fallas en las conexiones de red entre servidores.</li>
                </ul>
                En producción, si hay una falla de conexión (P), debes elegir entre devolver información desactualizada pero responder al usuario (AP), o bloquear el sistema y arrojar un error para asegurar que los datos no difieran (CP).
              </div>
            </div>
            <div class="theory-visual-content">
              <div class="image-wrapper">
                <img src="assets/big_data_5vs.png" alt="Las 5 V del Big Data" class="modal-diagram-img">
                <span class="img-caption">Nodos de las 5 Vs</span>
              </div>
            </div>
          </div>
          <div class="official-source">
            <i class="fa-solid fa-book-bookmark"></i> <strong>Fuente Oficial:</strong> 
            <a href="https://www.ibm.com/analytics/hadoop/big-data-analytics" target="_blank">IBM Big Data Fundamentals</a>
          </div>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">2. Modelos de Nube: IaaS, PaaS y SaaS</h4>
          <p>La computación en la nube ofrece recursos de infraestructura física virtualizados bajo demanda. Se categoriza en tres modelos fundamentales:</p>
          
          <div class="callout-box info">
            <strong>Explicación de los Modelos de Servicio con una Analogía de "Pizza":</strong><br>
            <ul>
              <li><strong>IaaS (Infraestructura): "Pizza congelada lista para hornear".</strong> El proveedor te alquila el hardware virtual (computador con CPU y RAM). Tú debes instalar el sistema operativo, la base de datos y programar la lógica. <em>Ejemplo: AWS EC2.</em></li>
              <li><strong>PaaS (Plataforma): "Pizza a domicilio".</strong> El proveedor ya instaló el sistema operativo y la base de datos. Tú solo colocas el archivo con tu código de programación y este se ejecuta automáticamente. <em>Ejemplo: Heroku, AWS Elastic Beanstalk.</em></li>
              <li><strong>SaaS (Software): "Comer en la pizzería".</strong> Todo el software ya está listo y programado en la web. Solo te registras y lo usas directamente. <em>Ejemplo: Microsoft 365, Gmail.</em></li>
            </ul>
          </div>
          <div class="official-source">
            <i class="fa-solid fa-book-bookmark"></i> <strong>Fuente Oficial:</strong> 
            <a href="https://aws.amazon.com/types-of-cloud-computing/" target="_blank">AWS Cloud Computing Models Guide</a>
          </div>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">3. Contenedores y Orquestación: Docker vs Kubernetes (K8s)</h4>
          <p>La computación en la nube moderna ya no se basa únicamente en Máquinas Virtuales completas, sino en la virtualización a nivel de Sistema Operativo mediante contenedores.</p>
          
          <div class="callout-box info">
            <strong>¿Qué es Docker (Contenedorización)?</strong><br>
            Docker empaqueta el código de una aplicación y todas sus dependencias (librerías, runtime, variables) en un <strong>Contenedor</strong> aislado. A diferencia de una VM, los contenedores comparten el mismo Kernel (núcleo) del sistema operativo anfitrión, lo que los hace iniciar en milisegundos y consumir una fracción de RAM.
            <br>
            <em>Analogía: Un contenedor de carga marítimo. No importa si lleva ropa o carros, encaja en cualquier barco (servidor) y se transporta igual.</em>
          </div>

          <div class="callout-box info">
            <strong>¿Qué es Kubernetes o K8s (Orquestación)?</strong><br>
            Cuando tienes cientos de contenedores Docker en producción distribuidos en múltiples servidores, Kubernetes automatiza su gestión: balancea la carga, escala el número de réplicas si sube el tráfico, y reemplaza de inmediato (auto-healing) a cualquier contenedor que falle o muera.
            <br>
            <em>Analogía: El director de una orquesta. Los músicos (contenedores) tocan por separado, pero el director coordina a todos para que suene la sinfonía y sustituye a un músico si se enferma.</em>
          </div>
          <div class="official-source">
            <i class="fa-solid fa-book-bookmark"></i> <strong>Fuente Oficial:</strong> 
            <a href="https://kubernetes.io/docs/concepts/overview/" target="_blank">Kubernetes Documentation & Overview</a>
          </div>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">4. AWS BuilderCards y Modelado de Arquitecturas Cloud</h4>
          <p>Para aprender y evaluar patrones de arquitectura en la nube de forma interactiva y metodológica, AWS diseñó la herramienta **AWS BuilderCards**.</p>
          
          <div class="callout-box info">
            <strong>¿Qué es AWS BuilderCards?</strong><br>
            Es un juego de cartas de construcción de mazos (deck-building) oficial de Amazon Web Services enfocado en la enseñanza de patrones de diseño de arquitectura. Los participantes asumen el rol de Arquitectos de Soluciones adquiriendo cartas de recursos (como EC2, S3, Aurora, Lambda, IAM, VPC) para desplegar soluciones ante solicitudes de clientes, mientras gestionan eventos adversos de infraestructura.
            <br>
            <em>Importancia en OIT: Permite entender visualmente las relaciones de acoplamiento, dependencias y seguridad entre los diferentes servicios y capas del Marco de Buena Arquitectura de AWS (AWS Well-Architected Framework).</em>
          </div>
          <div class="official-source">
            <i class="fa-solid fa-book-bookmark"></i> <strong>Fuente Oficial:</strong> 
            <a href="https://aws.amazon.com/blogs/training-and-certification/learn-cloud-architecture-with-aws-buildercards/" target="_blank">AWS Blog: Learn Cloud Architecture with AWS BuilderCards</a>
          </div>
        </div>
        `
      ],
      glossary: [
        {
          term: 'Docker',
          definition: 'Plataforma que empaqueta software en contenedores ligeros que comparten el Kernel del sistema operativo anfitrión.',
          analogy: 'Un contenedor marítimo estandarizado. Protege lo que lleva dentro y se estiba exactamente igual en cualquier barco o grúa del mundo.'
        },
        {
          term: 'Kubernetes (K8s)',
          definition: 'Motor de código abierto diseñado para automatizar el despliegue, escalado y gestión de contenedores Docker en clusters de servidores.',
          analogy: 'El director de una orquesta sinfónica. Mantiene el ritmo de todos los músicos (contenedores) y los coordina para que entren y salgan a tiempo.'
        },
        {
          term: 'AWS BuilderCards',
          definition: 'Herramienta didáctica de cartas oficial de AWS orientada al aprendizaje de diseño de infraestructura y combinación de servicios de nube.',
          analogy: 'Un juego de cartas donde compras servidores web, bases de datos y firewalls para armar un banco seguro antes de que una carta de falla de red te sabotee el sistema.'
        },
        {
          term: 'Teorema CAP',
          definition: 'Teorema distribuido que afirma que una base de datos en red solo puede garantizar dos de tres propiedades: Consistencia, Disponibilidad y Tolerancia a Particiones.',
          analogy: 'Ante un fallo de internet en la cocina de un restaurante, debes elegir entre rechazar el pedido para evitar equivocarte (Consistencia) o mandar un plato frío desactualizado pero cobrar igual (Disponibilidad).'
        }
      ]
    },
    {
      code: 'Q7-8',
      title: 'DCU y Diseño de Interfaces',
      shortDesc: 'Filosofía de Diseño Centrado en el Usuario (DCU) y diagrama de flujo iterativo para el diseño de interfaces.',
      purposeUsability: 'Garantizar la máxima eficiencia operativa del operador humano en el software, mitigando las fallas de captura de información y acortando los costes de formación.',
      context: 'Normas internacionales ISO que regulan los marcos de desarrollo interactivo a través de flujos cerrados de evaluación de usabilidad.',
      complexity: 'Bajo-Media. Enfocado en metodologías heurísticas cualitativas de evaluación de interfaces.',
      theory: [
        `
        <div class="theory-block">
          <h4 class="modal-subheading">1. Proceso de Diseño Centrado en el Usuario (ISO 9241-210)</h4>
          <p>El <strong>DCU</strong> no es un proceso visual artístico subjetivo; es un estándar de ingeniería regulado por la norma **ISO 9241-210**. Establece que el diseño del software debe alinear las pantallas a las necesidades cognitivas humanas mediante fases iterativas:</p>
          <ol>
            <li><strong>Entender el contexto de uso:</strong> Investigar quién usará el software, qué tareas realiza y en qué condiciones físicas.</li>
            <li><strong>Especificar los requisitos del usuario:</strong> Definir metas concretas (ej. que un operario pueda registrar una factura en menos de 10 segundos).</li>
            <li><strong>Desarrollar soluciones de diseño:</strong> Construcción de prototipos interactivos.</li>
            <li><strong>Evaluar los diseños:</strong> Someter el prototipo a tests de usabilidad reales. Si falla, el ciclo vuelve al principio de forma iterativa.</li>
          </ol>
          <div class="official-source">
            <i class="fa-solid fa-book-bookmark"></i> <strong>Fuente Oficial:</strong> 
            <a href="https://www.w3.org/WAI/redesign/ucd" target="_blank">W3C User-Centered Design Process</a>
          </div>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">2. Las Heurísticas de Usabilidad de Jakob Nielsen</h4>
          <p>Para evaluar la calidad de un prototipo de interfaz sin recurrir a programar código complejo, los arquitectos de UX aplican las **Heurísticas de Jakob Nielsen**. Las más relevantes son:</p>
          <ul>
            <li><strong>Visibilidad del estado del sistema:</strong> La aplicación siempre debe informar al usuario qué está pasando en tiempo real (ej. barra de carga o mensaje "Procesando pago").</li>
            <li><strong>Prevención de errores:</strong> Diseñar la interfaz de manera que el error sea imposible de cometer (ej. deshabilitar el botón de enviar si el formulario está incompleto, en lugar de mostrar un error molesto después).</li>
            <li><strong>Control y libertad del usuario:</strong> Darle al usuario una "salida de emergencia" clara si se equivoca (ej. botón Cancelar o Deshacer).</li>
          </ul>
          <div class="official-source">
            <i class="fa-solid fa-book-bookmark"></i> <strong>Fuente Oficial:</strong> 
            <a href="https://www.interaction-design.org/" target="_blank">Interaction Design Foundation (IxDF) Guidelines</a>
          </div>
        </div>
        `
      ],
      glossary: [
        {
          term: 'Evaluación Heurística',
          definition: 'Método de inspección de usabilidad donde expertos juzgan si la GUI cumple con principios de diseño preestablecidos.',
          analogy: 'Una lista de control de seguridad para un carro. El inspector revisa si los frenos responden y las luces funcionan antes de que el carro salga a la carretera.'
        },
        {
          term: 'Diseño Iterativo',
          definition: 'Flujo sistemático de refinamiento basado en repetir ciclos de boceto, test de usabilidad y rediseño incremental.',
          analogy: 'Esculpir con arcilla. Empiezas modelando una forma tosca, pides retroalimentación, corriges imperfecciones y repites el ciclo de esculpido hasta obtener el detalle final.'
        },
        {
          term: 'Usabilidad',
          definition: 'Medida empírica de qué tan fácil, eficiente y satisfactorio resulta el uso de una aplicación por parte del usuario final.',
          analogy: 'El picaporte de una puerta. Si es ergonómico y se abre de un solo movimiento natural, tiene alta usabilidad; si requiere una combinación oculta, es inusable.'
        }
      ]
    },
    {
      code: 'Q9-13',
      title: 'Inteligencia Artificial y Arduino',
      shortDesc: 'Redes neuronales con TensorFlow, TensorFlow Lite en microcontroladores, clasificación de formas y lógica de hardware.',
      purposeUsability: 'Habilitar inteligencia embebida en dispositivos físicos locales (Edge AI / TinyML), permitiendo a sensores de hardware tomar decisiones predictivas sin depender de servidores en la nube.',
      context: 'La compresión matemática de modelos entrenados en la nube con flotantes complejos hacia microcontroladores con recursos de memoria ultra reducidos.',
      complexity: 'Alta. Requiere dominar la matemática matricial de redes neuronales y las transformaciones lineales de cuantificación de punto flotante a enteros.',
      theory: [
        `
        <div class="theory-block">
          <h4 class="modal-subheading">1. Matemática Fundacional del Perceptrón y Redes Neuronales</h4>
          <p>Una Red Neuronal es un aproximador de funciones matemáticas. El componente básico es el Perceptrón, que simula el disparo eléctrico de una neurona biológica:</p>
          <div class="callout-box info">
            <strong>¿Cómo funciona la Neurona Matemática?</strong><br>
            Recibe un vector de entradas continuas <code class="code-highlight">x</code>. Cada entrada se multiplica por un peso sináptico <code class="code-highlight">w</code> (que define la importancia de esa variable). Se suman todos los productos y se agrega un sesgo <code class="code-highlight">b</code> (bias). El resultado se pasa a través de una función de activación no-lineal <code class="code-highlight">σ</code>:
            <p class="text-center"><code class="code-highlight">a = σ( ∑ w_i x_i + b )</code></p>
            El algoritmo <strong>Backpropagation (Retropropagación)</strong> calcula la derivada parcial de la función de coste con respecto a cada peso mediante la regla de la cadena del cálculo, permitiendo ajustar los pesos de manera iterativa para reducir los errores de predicción.
          </div>
          <div class="official-source">
            <i class="fa-solid fa-book-bookmark"></i> <strong>Fuente Oficial:</strong> 
            <a href="https://www.tensorflow.org/tutorials" target="_blank">TensorFlow Official Learning Guide</a>
          </div>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">2. Optimización TinyML: Cuantificación Lineal en TensorFlow Lite</h4>
          <p>Los modelos de IA usan flotantes de 32 bits (<code class="code-highlight">float32</code>). Un microcontrolador pequeño no tiene capacidad matemática para procesar estos números en tiempo real. Por ello, TensorFlow Lite realiza una <strong>cuantificación lineal de 8 bits (INT8)</strong>.</p>
          
          <div class="callout-box info">
            <strong>Explicación de la Fórmula de Cuantificación:</strong><br>
            La fórmula formal es: <code class="code-highlight">r = S × (q - Z)</code>
            <ul>
              <li><strong>r (Real):</strong> El valor original continuo en float32.</li>
              <li><strong>q (Quantized):</strong> El nuevo valor transformado en entero de 8 bits (rango de -128 a 127).</li>
              <li><strong>S (Scale - Escala):</strong> Un multiplicador constante que define el tamaño del escalón en la discretización.</li>
              <li><strong>Z (Zero-point - Punto Cero):</strong> El número entero que representa exactamente al valor 0.0 en el mundo real.</li>
            </ul>
            Esto permite comprimir el modelo de IA a una cuarta parte de su peso físico y ejecutar las multiplicaciones neuronales con aritmética de enteros ultra veloz en la CPU del microcontrolador.
          </div>
          <div class="official-source">
            <i class="fa-solid fa-book-bookmark"></i> <strong>Fuente Oficial:</strong> 
            <a href="https://www.tensorflow.org/lite/microcontrollers" target="_blank">TensorFlow Lite for Microcontrollers Guide</a>
          </div>
        </div>
        `
      ],
      glossary: [
        {
          term: 'Función de Activación (ReLU)',
          definition: 'Función no lineal definida como f(x) = max(0, x) que decide si una neurona matemática debe disparar salida o no.',
          analogy: 'Un fusible de seguridad eléctrica. Si el voltaje es negativo (menor a cero), se apaga totalmente (salida 0); si es positivo, deja pasar la corriente idéntica.'
        },
        {
          term: 'Cuantización de Redes',
          definition: 'Proceso de compresión numérica que convierte pesos continuos float32 en discretos enteros de 8 bits (INT8).',
          analogy: 'Reducir el tamaño de una foto 4K pesada a resolución estándar HD para mandarla por chat. Pierdes un poco de nitidez si haces mucho zoom, pero viaja volando y es perfectamente funcional.'
        },
        {
          term: 'Retropropagación',
          definition: 'Algoritmo de optimización que calcula los gradientes de error hacia atrás en la red usando la Regla de la Cadena.',
          analogy: 'El juego de "frío o caliente". La red neuronal lanza una predicción, mide el error y viaja hacia atrás diciendo a cada neurona: te desviaste por tanto, ajusta tus valores a la izquierda para la siguiente iteración.'
        }
      ]
    },
    {
      code: 'Q10-15',
      title: 'SciPy y Procesamiento de Señales',
      shortDesc: 'Transformadas de Fourier en SciPy (FFT) y diseño de filtros analógicos pasa-bajos para eliminar ruido de sensores.',
      purposeUsability: 'Limpiar interferencias eléctricas y ruido de los sensores de hardware industriales antes de analizar sus mediciones lógicas.',
      context: 'Digitalizar el procesamiento analógico clásico mediante cálculos matemáticos eficientes de transformadas sinusoidales complejas compiladas nativamente en C/FORTRAN expuestos en Python.',
      complexity: 'Alta. Involucra trigonometría compleja de Fourier y el análisis de respuesta en frecuencia de filtros paso bajo.',
      theory: [
        `
        <div class="theory-block">
          <h4 class="modal-subheading">1. Transformada Discreta de Fourier (DFT) y Optimización FFT</h4>
          <p>Los sensores capturan lecturas en el dominio del tiempo (por ejemplo, cambios de voltaje). La <strong>Transformada de Fourier</strong> descompone esta onda compleja en sus componentes de frecuencia puros:</p>
          <p class="text-center"><code class="code-highlight">X[k] = ∑_{n=0}^{N-1} x[n] · e^{-i 2\pi k n / N}</code></p>
          
          <div class="callout-box info">
            <strong>Explicación de la Identidad de Euler en Fourier:</strong><br>
            El término exponencial complejo <code class="code-highlight">e^{-i\theta}</code> se expande según Euler como: <code class="code-highlight">\cos(\theta) - i\sin(\theta)</code>. Esto representa una rotación de fase compleja que extrae la amplitud y fase de cada componente sinusoidal dentro de la señal.
            <br><br>
            <strong>Optimización FFT:</strong> La transformada directa DFT exige una complejidad algorítmica de <code class="code-highlight">O(N²)</code> (inviable para procesamiento en tiempo real). El algoritmo FFT (Fast Fourier Transform) de SciPy optimiza esto dividiendo la señal en partes pares e impares de forma recursiva, logrando una complejidad de <code class="code-highlight">O(N log N)</code>, acelerando el procesamiento en miles de veces.
          </div>
          <div class="official-source">
            <i class="fa-solid fa-book-bookmark"></i> <strong>Fuente Oficial:</strong> 
            <a href="https://docs.scipy.org/doc/scipy/tutorial/fft.html" target="_blank">SciPy FFT Tutorial Guide</a>
          </div>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">2. Diseño de Filtros: Filtro Paso Bajo Butterworth</h4>
          <p>Para eliminar interferencias rápidas de alta frecuencia (como el ruido eléctrico inducido en un cable de temperatura), aplicamos un Filtro Paso Bajo Butterworth. La ventaja teórica del filtro Butterworth es que ofrece una **respuesta máximamente plana en la banda de paso** (no produce ondulaciones ni distorsiones de ganancia en las frecuencias útiles, a diferencia de los filtros Chebyshev).</p>
          <p>La magnitud de la transferencia se define por:</p>
          <p class="text-center"><code class="code-highlight">|H(ω)|² = 1 / ( 1 + (ω / ω_c)^{2n} )</code></p>
          <p>Donde <code class="code-highlight">ω_c</code> es la frecuencia de corte y <code class="code-highlight">n</code> es el orden del filtro. A mayor orden <code class="code-highlight">n</code>, la caída de frecuencias de rechazo es más de cuatro veces más pronunciada y selectiva, pero introduce mayor retardo de fase en la señal.</p>
          <div class="official-source">
            <i class="fa-solid fa-book-bookmark"></i> <strong>Fuente Oficial:</strong> 
            <a href="https://docs.scipy.org/doc/scipy/reference/signal.html" target="_blank">SciPy Signal Processing reference</a>
          </div>
        </div>
        `
      ],
      glossary: [
        {
          term: 'Dominio de la Frecuencia',
          definition: 'Espacio de representación matemática que analiza una señal según sus tonos y ritmos en Hz en lugar de su cambio de amplitud en el tiempo.',
          analogy: 'Un ecualizador de música. En lugar de ver una onda caótica subiendo y bajando en el tiempo, ves barras verticales para bajos, medios y agudos.'
        },
        {
          term: 'Filtro Paso Bajo',
          definition: 'Estructura matemática orientada a conservar las componentes lentas de baja frecuencia y mitigar los ruidos rápidos de alta frecuencia.',
          analogy: 'Un colador de cocina. Deja pasar el agua líquida constante (señal útil) pero atrapa y remueve los grumos grandes (ruido eléctrico).'
        },
        {
          term: 'Complejo Conjugado',
          definition: 'Número simétrico en el plano complejo que tiene la misma parte real pero la parte imaginaria con signo opuesto.',
          analogy: 'El reflejo de una montaña en un lago. La montaña real es el número complejo; el reflejo es su conjugado. Juntos permiten cancelar la parte compleja imaginaria y calcular la potencia matemática real de una señal.'
        }
      ]
    },
    {
      code: 'Q11-12',
      title: 'Pandas y Comunicación Serial',
      shortDesc: 'Limpieza y manipulación de DataFrames y comunicaciones bidireccionales eficientes Python-Arduino vía PySerial.',
      purposeUsability: 'Capturar telemetría física de sensores e insertarla en matrices de memoria RAM estructuradas para análisis estadístico veloz en ciencia de datos.',
      context: 'La integración de puertos de comunicación serial físicos legados (COM / USB) con los frameworks modernos de análisis matricial en Python.',
      complexity: 'Media. Requiere comprender la velocidad de transmisión en baudios y el mapeo en memoria de NumPy.',
      theory: [
        `
        <div class="theory-block">
          <h4 class="modal-subheading">1. Mapeo de Memoria de Pandas DataFrames y Vectorización SIMD</h4>
          <p>Un DataFrame de Pandas es una estructura de columnas homogéneas indexadas. Internamente, las columnas se almacenan en bloques de memoria contiguos gestionados por arrays en C de NumPy.</p>
          
          <div class="callout-box info">
            <strong>¿Qué es la Vectorización y SIMD (Single Instruction Multiple Data)?</strong><br>
            En Python común, procesar una lista de números requiere un bucle <code class="code-highlight">for</code> que ejecuta una instrucción en CPU por cada elemento (lento por la tipificación dinámica de Python). En Pandas, las operaciones se vectorizan: la CPU ejecuta una sola instrucción matemática a nivel de hardware que se aplica simultáneamente sobre un vector completo de datos en memoria contigua. Esto permite procesar millones de registros de telemetría de hardware de manera casi instantánea en un solo ciclo de CPU.
          </div>
          <div class="official-source">
            <i class="fa-solid fa-book-bookmark"></i> <strong>Fuente Oficial:</strong> 
            <a href="https://pandas.pydata.org/docs/" target="_blank">Pandas API Reference & User Guide</a>
          </div>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">2. Sincronización Serial y Latencia de Puerto</h4>
          <p>La comunicación serial transmite datos en fila (bit a bit) por canales físicos COM/USB a una velocidad de transmisión definida en **Baudios** (bits por segundo). Para garantizar una lectura asíncrona no bloqueante, el código implementa un gestor de puertos con temporizador (<code class="code-highlight">timeout</code>), previniendo que la aplicación analítica de Python se congele si la tarjeta Arduino física experimenta pérdidas de energía.</p>
          <div class="official-source">
            <i class="fa-solid fa-book-bookmark"></i> <strong>Fuente Oficial:</strong> 
            <a href="https://pyserial.readthedocs.io/" target="_blank">PySerial Documentation portal</a>
          </div>
        </div>
        `
      ],
      glossary: [
        {
          term: 'Vectorización',
          definition: 'Técnica de procesamiento que ejecuta instrucciones matemáticas en lote sobre arreglos contiguos en memoria en lugar de usar bucles secuenciales.',
          analogy: 'Una sembradora industrial. En lugar de plantar semilla por semilla caminando (un bucle for de Python), la máquina siembra 20 filas paralelas al avanzar un solo metro.'
        },
        {
          term: 'Baudios (Baud Rate)',
          definition: 'Unidad de velocidad que representa el número de cambios de estados físicos por segundo en una transmisión de puerto serial.',
          analogy: 'El ritmo de aplausos entre dos náufragos mandando señales de humo. Si uno hace señales cada 2 segundos y el otro mira esperando señales cada 10, no se entenderán por desalineación de ritmo.'
        },
        {
          term: 'DataFrame de Pandas',
          definition: 'Estructura bidimensional de datos contiguos homogéneos optimizados en C para cálculos en memoria súper rápidos.',
          analogy: 'Una planilla de cálculo de Excel súper veloz guardada directamente dentro de los chips de memoria RAM, sin necesidad de cargar ningún programa visual lento.'
        }
      ]
    },
    {
      code: 'Q16',
      title: 'Visión Artificial Integrada',
      shortDesc: 'Detección de rostros en OpenCV (Haar Cascades) y activación por pulsos seriales para sistemas embebidos.',
      purposeUsability: 'Implementar algoritmos de clasificación visual ligeros que operen en tiempo real directamente sobre CPUs integradas de bajo coste, sin requerir potencia de tarjetas gráficas dedicadas (GPUs).',
      context: 'La invención del clasificador de cascada de Viola y Jones en 2001, que deparó el primer algoritmo interactivo de procesamiento fluido de video en tiempo real.',
      complexity: 'Media-Alta. Demanda asimilar la matemática de la Imagen Integral y la lógica de descarte asimétrico en cascadas de decisión.',
      theory: [
        `
        <div class="theory-block">
          <h4 class="modal-subheading">1. Matemática del Clasificador Haar Cascade de Viola-Jones</h4>
          <p>El clasificador Haar no calcula píxeles individuales; procesa la diferencia lumínica entre regiones rectangulares contiguas de la imagen. Evaluar miles de rectángulos en video de alta resolución sería imposible para una CPU integrada. Viola y Jones optimizaron esto mediante la **Imagen Integral (II)**.</p>
          <p>La Imagen Integral en la coordenada <code class="code-highlight">(x, y)</code> es la suma acumulada de todos los píxeles a su izquierda y arriba:</p>
          <p class="text-center"><code class="code-highlight">II(x, y) = ∑_{x' \le x, y' \le y} I(x', y')</code></p>
          
          <div class="callout-box info">
            <strong>Explicación de la Suma en O(1) con 4 Accesos a Memoria:</strong><br>
            Para calcular la suma de cualquier rectángulo definido por las esquinas A, B, C y D en la imagen original, no necesitamos sumar cada píxel uno a uno. Gracias a la imagen integral, la suma se obtiene instantáneamente con la operación aritmética simple:
            <p class="text-center"><code class="code-highlight">Suma = II(D) + II(A) - II(B) - II(C)</code></p>
            Esto permite que la CPU realice la evaluación en un tiempo de ejecución constante **O(1)**, sin importar el tamaño físico del rectángulo.
          </div>
          
          <div class="callout-box alert">
            <strong>¿Qué es la Cascada de Clasificadores (Rechazo)?</strong><br>
            El algoritmo organiza los clasificadores Haar en capas o cascadas jerárquicas ordenadas por AdaBoost. Las capas iniciales evalúan rasgos sumamente simples (ej. si la región de la frente es más clara que el puente de la nariz). Si la subventana no pasa estas pruebas iniciales, se rechaza de inmediato (se descarta que sea un rostro), evitando calcular las complejas y pesadas capas finales en áreas vacías del fondo, lo que minimiza el consumo de procesador en la CPU.
          </div>
          <div class="official-source">
            <i class="fa-solid fa-book-bookmark"></i> <strong>Fuente Oficial:</strong> 
            <a href="https://docs.opencv.org/4.x/db/d28/tutorial_cascade_classifier.html" target="_blank">OpenCV Cascade Classifier Guide</a>
          </div>
        </div>
        `
      ],
      glossary: [
        {
          term: 'Imagen Integral',
          definition: 'Representación matemática de acumulación de píxeles que permite calcular sumas de áreas de imagen en tiempo de ejecución O(1).',
          analogy: 'Un mapa de kilómetros de carretera acumulados. En lugar de bajarte y medir con cinta métrica, restas la indicación del poste final menos la del poste inicial y obtienes la distancia al instante.'
        },
        {
          term: 'Cascada de Rechazo',
          definition: 'Estructura jerárquica de clasificadores que descarta de forma asimétrica y temprana las subventanas que no contienen el objeto buscado.',
          analogy: 'Un filtro de selección de personal. En la primera ronda descartas a los currículums que no tienen el idioma requerido (las zonas de imagen sin rasgos faciales básicos) para no gastar tiempo entrevistándolos en las rondas difíciles.'
        },
        {
          term: 'Clasificador Débil',
          definition: 'Regla de clasificación visual muy simple cuya precisión individual es solo ligeramente superior al azar (50%).',
          analogy: 'Un detector de lluvia rudimentario que solo dice "si huele a tierra húmeda, lloverá". Por sí solo falla mucho, pero si juntas 100 de estas reglas en un comité de votación coordinado (AdaBoost), logras una predicción sumamente precisa.'
        }
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

    this.statusSub = this.signalrService.getConnectionStatus().subscribe(status => {
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
