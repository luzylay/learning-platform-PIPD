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
      code: 'TEMA 1',
      title: 'Física Cuántica, Fibra Óptica y Fibra de Vidrio',
      shortDesc: 'Computación cuántica (qubits, superposición, entrelazamiento) vs medios físicos (Reflexión Total Interna en sílice vs GFRP en fibra de vidrio).',
      purposeUsability: 'Comprender los límites y capacidades físicas del hardware de almacenamiento/cómputo y la transmisión electromagnética/fotónica de alta velocidad.',
      context: 'Evolución de las redes de cobre a fibra óptica de sílice purísima y el paso del bit clásico al espacio de Hilbert cuántico.',
      complexity: 'Alta (Álgebra lineal en ℂ², óptica cuántica y guía de ondas).',
      theory: [
        `
        <div class="theory-block">
          <h4 class="modal-subheading">1. Computación Cuántica: Qubits y Espacio de Hilbert</h4>
          <p>Un <strong>Qubit</strong> no es un bit binario; es un sistema mecánico cuántico de dos niveles definido sobre un espacio de Hilbert $\\mathbb{C}^2$. Su estado $|\\psi\\rangle$ se representa por la combinación lineal:</p>
          <div class="callout-box info">
            <p class="text-center"><code class="code-highlight">|ψ⟩ = α|0⟩ + β|1⟩  donde α, β ∈ ℂ y |α|² + |β|² = 1</code></p>
            <strong>Fenómenos Clave:</strong>
            <ul>
              <li><strong>Superposición:</strong> Existencia simultánea en combinaciones lineales antes de la medición.</li>
              <li><strong>Entrelazamiento (Quantum Entanglement):</strong> Estados no factorizables ($|\\Phi^+\\rangle = \\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)$) donde medir un qubit colapsa instantáneamente el otro.</li>
              <li><strong>Interferencia:</strong> Manipulación de amplitudes $\\alpha, \\beta$ para cancelar trayectorias incorrectas (constructiva vs destructiva).</li>
            </ul>
          </div>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">2. Modelo Mental: Fibra Óptica vs. Fibra de Vidrio</h4>
          <table class="theory-table">
            <thead>
              <tr><th>Criterio</th><th>Fibra Óptica</th><th>Fibra de Vidrio (GFRP)</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Función</strong></td><td>Transmisión fotónica de datos en red.</td><td>Refuerzo mecánico e aislamiento estructural.</td></tr>
              <tr><td><strong>Principio Físico</strong></td><td><strong>Reflexión Interna Total (TIR)</strong> ($n_1 > n_2$, $\\theta > \\theta_c$).</td><td><strong>Transferencia de esfuerzo cortante</strong> entre matriz y fibra.</td></tr>
              <tr><td><strong>Composición</strong></td><td>Sílice ultra pura ($SiO_2$) en núcleo (8-10 µm SMF / 50 µm MMF).</td><td>Matriz polimérica (resina epoxi/poliéster) + hilos de vidrio.</td></tr>
              <tr><td><strong>Atenuación / Desempeño</strong></td><td>Bajísimos 0.2 dB/km a 1550 nm.</td><td>Alta rigidez dieléctrica y elevado módulo de Young.</td></tr>
            </tbody>
          </table>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">3. Conexión con Proyectos AWS & Big Data</h4>
          <div class="callout-box alert">
            <strong>Aplicación en AWS & Redes Globales:</strong><br>
            - <strong>AWS Direct Connect:</strong> Enlaces dedicados de fibra óptica monomodo (10 Gbps / 100 Gbps) que conectan el datacenter local con la VPC usando conexiones ópticas de baja atenuación.<br>
            - <strong>AWS Braket:</strong> Servicio gestionado de computación cuántica que permite ejecutar algoritmos en procesadores cuánticos reales (Transmones de Rigetti, Iones Atrapados de IonQ, Fotónica de Xanadu).
          </div>
        </div>
        `
      ],
      glossary: [
        { term: 'Regla de Born', definition: 'Postulado cuántico donde |α|² y |β|² indican la probabilidad empírica de medir |0⟩ o |1⟩.', analogy: 'Un dado girando en el aire; la probabilidad determina la cara al caer.' },
        { term: 'Reflexión Interna Total (TIR)', definition: 'Fenómeno óptico donde la luz no atraviesa el revestimiento si el ángulo supera el ángulo crítico.', analogy: 'Lanzar una piedra al agua con ángulo rasante y verla rebotar en la superficie.' },
        { term: 'SMF vs MMF', definition: 'Single-Mode (núcleo fino ~9µm, larga distancia) vs Multi-Mode (núcleo ancho ~50µm, corta distancia LAN).', analogy: 'Túnel de un solo carril recto (larga distancia) vs túnel multicarril con rebotes.' }
      ]
    },
    {
      code: 'TEMA 2',
      title: 'Ciclo de Vida del Software (SDLC) y Modelos Mentales',
      shortDesc: 'ISO/IEC/IEEE 12207 formal (6 fases explicadas sin resumir) y modelos mentales de Donald Norman.',
      purposeUsability: 'Establecer la estructura de ingeniería formal para gobernar el desarrollo de software y alinear las interfaces con la estructura cognitiva humana.',
      context: 'Estándar internacional de procesos del ciclo de vida del software e ingeniería ergonómica.',
      complexity: 'Media (Ingeniería de software formal y ergonomía cognitiva).',
      theory: [
        `
        <div class="theory-block">
          <h4 class="modal-subheading">1. Ciclo de Vida del Software (SDLC ISO/IEC/IEEE 12207)</h4>
          <ol class="formal-list">
            <li><strong>Análisis y Especificación de Requisitos:</strong> Elicitación de necesidades, análisis de factibilidad y redacción formal del documento <em>Software Requirements Specification (SRS)</em> según ISO 29148.</li>
            <li><strong>Diseño de Arquitectura y Sistema:</strong> Definición del patrón arquitectónico (Microservicios, Serverless), esquemas de bases de datos, APIs (OpenAPI) y redacción del <em>Software Design Document (SDD)</em>.</li>
            <li><strong>Implementación y Codificación:</strong> Construcción del código ejecutable siguiendo estándares de codificación, control de versiones (Git) y revisiones par a par (PRs).</li>
            <li><strong>Verificación y Validación (Pruebas V&V):</strong> Ejecución de pruebas unitarias, de integración, de rendimiento (ab/iperf), de seguridad (SAST/DAST) y de aceptación de usuario (UAT).</li>
            <li><strong>Despliegue y Liberación:</strong> Pauta a producción automatizada (CI/CD Pipelines) usando estrategias sin inactividad (Blue/Green, Canary).</li>
            <li><strong>Operaciones, Mantenimiento y Evolución:</strong> Mantenimiento correctivo, adaptativo, perfectivo y preventivo del sistema en producción.</li>
          </ol>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">2. Modelo Mental según Donald Norman</h4>
          <p>Un <strong>Modelo Mental</strong> es la representación interna que construye el usuario sobre cómo funciona el sistema. Se caracteriza por ser <em>subjetivo</em>, <em>dinámico</em> y <em>simplificador</em>.</p>
          <div class="callout-box info">
            <strong>Golfos de Norman:</strong><br>
            - <strong>Golfo de Ejecución:</strong> Distancia entre la intención del usuario y las acciones que ofrece la GUI.<br>
            - <strong>Golfo de Evaluación:</strong> Distancia entre el estado real del sistema y lo que el usuario percibe visualmente.
          </div>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">3. Conexión con Proyectos AWS & Big Data</h4>
          <div class="callout-box alert">
            <strong>Aplicación en AWS & DevSecOps:</strong><br>
            - <strong>AWS CodePipeline / CodeBuild / CodeDeploy:</strong> Automatización formal de las fases de Construcción, Pruebas y Despliegue del SDLC.<br>
            - <strong>Prototipado en AWS Amplify:</strong> Despliegue rápido de prototipos interactivos para reducir el Golfo de Evaluación con pruebas de usuarios reales.
          </div>
        </div>
        `
      ],
      glossary: [
        { term: 'Verificación vs Validación', definition: 'Verificación: ¿Construimos el software correctamente? (SRS). Validación: ¿Construimos el software correcto? (Cliente).', analogy: 'Verificar el plano arquitectónico vs validar si la casa es cómoda para la familia.' },
        { term: 'Wireframe vs Prototipo', definition: 'Wireframe es el plano esquemático estático; el Prototipo es la maqueta interactiva clicable.', analogy: 'Plano de distribución en papel vs casa piloto interactiva.' }
      ]
    },
    {
      code: 'TEMA 3',
      title: 'Marcos Normados: CMMI, ISO, PMBOK, Scrum, COBIT e ITIL',
      shortDesc: 'CMMI Nivel 3, ISO (9001, 27001, 25000 SQuaRE), PMBOK, Scrum/Ágil, COBIT 2019 e ITIL 4.',
      purposeUsability: 'Garantizar el gobierno tecnológico, la calidad del producto/servicio, la gestión del riesgo y la madurez de procesos empresariales.',
      context: 'Estándares globales de la industria para auditoría, calidad y gestión de TI.',
      complexity: 'Media-Alta (Gobernanza corporativa, cumplimiento normativo y marcos ágiles).',
      theory: [
        `
        <div class="theory-block">
          <h4 class="modal-subheading">1. Resumen Ejecutivo de Marcos y Normas</h4>
          <ul class="formal-list">
            <li><strong>CMMI Nivel 3 (Defined / Definido):</strong> Los procesos de la organización están formalmente caracterizados, comprendidos y descritos en estándares, procedimientos y herramientas a nivel organizacional (PAL / Tailoring).</li>
            <li><strong>ISO 9001:</strong> Sistema de Gestión de la Calidad (SGC) basado en el ciclo PHVA (PDCA) y enfoque en procesos.</li>
            <li><strong>ISO/IEC 27001:</strong> Sistema de Gestión de Seguridad de la Información (SGSI) preservando la **Triada CIA** (Confidencialidad, Integridad, Disponibilidad) y Controles Anexo A.</li>
            <li><strong>ISO/IEC 25000 (SQuaRE / ISO 25010):</strong> Evaluación de Calidad de Producto Software (Adecuación funcional, Usabilidad, Mantenibilidad, Seguridad, etc.).</li>
            <li><strong>PMBOK (PMI):</strong> Dirección de Proyectos dividida en 5 Grupos de Procesos (Inicio, Planificación, Ejecución, Monitoreo/Control, Cierre) y dominios de desempeño.</li>
            <li><strong>Scrum / Ágil:</strong> 4 Valores del Manifiesto Ágil, roles (PO, SM, Devs), artefactos (Backlogs, Incremento) y 5 eventos.</li>
            <li><strong>COBIT 2019 (ISACA):</strong> Gobierno de TI. Separa **Gobierno (EDM: Evaluar, Dirigir, Monitorear)** de la **Gestión (APO, BAI, DSS, MEA)**.</li>
            <li><strong>ITIL 4 (AXELOS):</strong> Gestión de Servicios de TI (ITSM) a través del Sistema de Valor del Servicio (SVS) y prácticas clave (Incidentes, Cambios, SLAs).</li>
          </ul>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">2. Conexión con Proyectos AWS & Big Data</h4>
          <div class="callout-box alert">
            <strong>Gobernanza y Calidad en AWS:</strong><br>
            - <strong>AWS Artifact & AWS Config:</strong> Proporcionan informes de auditoría instantáneos para certificar cumplimiento **ISO 27001**, **ISO 9001** y controles CMMI.<br>
            - <strong>AWS Security Hub & GuardDuty:</strong> Implementan la gestión de riesgos y la Triada CIA monitoreando amenazas en la nube.
          </div>
        </div>
        `
      ],
      glossary: [
        { term: 'CMMI Nivel 3 (Defined)', definition: 'Procesos estandarizados a nivel de empresa con guías de adaptación (tailoring) para proyectos.', analogy: 'Una franquicia que entrega un manual estandarizado pero permite adaptar según el país.' },
        { term: 'COBIT EDM vs Management', definition: 'EDM es la Junta Directiva dirigiendo; Management es la gerencia ejecutando.', analogy: 'El directorio de un barco decidiendo el rumbo vs el capitán manejando los motores.' }
      ]
    },
    {
      code: 'TEMA 4',
      title: 'Metodologías de Minería de Datos: KDD, SEMMA, CRISP-DM y DATLAS',
      shortDesc: 'Ciclos metodológicos para proyectos de minería de datos, Big Data y analítica espacial.',
      purposeUsability: 'Transformar datos crudos en conocimiento accionable mediante etapas estructuradas y repetibles.',
      context: 'Estándares metodológicos desarrollados por la academia y la industria de datos.',
      complexity: 'Media (Flujos de trabajo de Data Science y analítica espacial).',
      theory: [
        `
        <div class="theory-block">
          <h4 class="modal-subheading">1. Comparación de Metodologías de Datos</h4>
          <ul class="formal-list">
            <li><strong>KDD (Knowledge Discovery in Databases):</strong> 5 fases principales: <em>Selección ➔ Preprocesamiento (limpieza) ➔ Transformación (PCA) ➔ Minería de Datos ➔ Interpretación/Evaluación</em>.</li>
            <li><strong>SEMMA (SAS Institute):</strong> <em>Sample (Muestrear) ➔ Explore (Explorar EDA) ➔ Modify (Modificar) ➔ Model (Modelar) ➔ Assess (Evaluar)</em>.</li>
            <li><strong>CRISP-DM:</strong> Estándar de 6 fases iterativas: <em>Business Understanding ➔ Data Understanding ➔ Data Preparation ➔ Modeling ➔ Evaluation ➔ Deployment</em>.</li>
            <li><strong>DATLAS:</strong> Metodología y plataforma para el <strong>análisis de datos espaciales y territoriales</strong>, econometría geográfica y visualización de complejas redes industriales.</li>
          </ul>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">2. Conexión con Proyectos AWS & Big Data</h4>
          <div class="callout-box alert">
            <strong>Pipelines de Datos en AWS:</strong><br>
            - <strong>AWS Glue (ETL):</strong> Automatiza la fase de *Data Preparation* de CRISP-DM y *Preprocesamiento/Transformación* de KDD.<br>
            - <strong>Amazon SageMaker:</strong> Soporta el ciclo completo de CRISP-DM (Modeling, Evaluation, Deployment) registrando versiones de modelos ML.<br>
            - <strong>AWS EMR (Elastic MapReduce) / Spark:</strong> Ejecuta las fases de minería de datos masiva en arquitecturas distribuidas.
          </div>
        </div>
        `
      ],
      glossary: [
        { term: 'CRISP-DM', definition: 'Cross-Industry Standard Process for Data Mining; la metodología más adoptada en Data Science.', analogy: 'La receta maestra estándar para cocinar un platillo de datos de principio a fin.' },
        { term: 'Preprocesamiento KDD', definition: 'Tratamiento de valores nulos, eliminación de ruido e imputación estadística.', analogy: 'Lavar y pelar los ingredientes antes de cocinar.' }
      ]
    },
    {
      code: 'TEMA 5',
      title: 'Big Data y Cloud Computing (Fundamentos NIST)',
      shortDesc: 'Conceptos formales (Gartner, NIST SP 1500-1, MIT), 5Vs, NIST SP 800-145 Cloud Computing, IaaS, PaaS, SaaS.',
      purposeUsability: 'Comprender los paradigmas de almacenamiento/procesamiento distribuido masivo y el aprovisionamiento elástico de infraestructura.',
      context: 'Definiciones institucionales estándar creadas por el NIST y las top universidades del mundo.',
      complexity: 'Media-Alta (Sistemas distribuidos y modelos de servicio cloud).',
      theory: [
        `
        <div class="theory-block">
          <h4 class="modal-subheading">1. Big Data: Concepto Académico y 5 V's</h4>
          <p>Según <strong>Gartner (Doug Laney)</strong> y el <strong>NIST (SP 1500-1)</strong>, Big Data son activos de información caracterizados por las 5 V's: <strong>Volumen</strong>, <strong>Velocidad</strong>, <strong>Variedad</strong>, <strong>Veracidad</strong> y <strong>Valor</strong>.</p>
          <p>Paradigmas de procesamiento: <em>Batch</em> (MapReduce, Spark) vs. <em>Streaming en tiempo real</em> (Flink, Kafka Streams). Arquitecturas Lambda y Kappa.</p>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">2. Cloud Computing (NIST SP 800-145)</h4>
          <p>Modelo para permitir acceso omnipresente y bajo demanda a un pool compartido de recursos configurables.</p>
          <div class="callout-box info">
            <strong>5 Características Esenciales NIST:</strong><br>
            1. Autoservicio bajo demanda.<br>
            2. Acceso amplio a la red.<br>
            3. Agrupamiento de recursos (Resource Pooling).<br>
            4. Elasticidad rápida (Rapid Elasticity).<br>
            5. Servicio medido (Measured Service / Pay-as-you-go).
          </div>
          <p><strong>Modelos de Servicio:</strong> IaaS (AWS EC2), PaaS (AWS Elastic Beanstalk), SaaS (Google Workspace).</p>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">3. Conexión con Proyectos AWS & Big Data</h4>
          <div class="callout-box alert">
            <strong>Arquitectura Data Lake en AWS:</strong><br>
            - <strong>Amazon S3 (Data Lake Storage):</strong> Almacenamiento elástico ilimitado para Big Data (Variedad y Volumen).<br>
            - <strong>Amazon Redshift / Athena:</strong> Consultas analíticas SQL distribuidas en petabytes de datos en segundos.
          </div>
        </div>
        `
      ],
      glossary: [
        { term: 'Resource Pooling', definition: 'Multi-inquilinato donde recursos físicos se asignan dinámicamente a múltiples usuarios.', analogy: 'Una piscina olímpica compartida por varios nadadores en carriles asignados.' },
        { term: 'Arquitectura Lambda', definition: 'Combina una capa Batch (precisa) con una capa Streaming (baja latencia).', analogy: 'Un periódico impreso diario + un canal de noticias de última hora en vivo.' }
      ]
    },
    {
      code: 'TEMA 6',
      title: 'Contenedores y Orquestación Cloud (Docker, Kubernetes & GCP)',
      shortDesc: 'Docker (namespaces, cgroups, inmutabilidad), Kubernetes (Control Plane, Pods, Services) y herramientas de GCP (ab, iperf, Load Balancers, Deployment Manager).',
      purposeUsability: 'Empaquetar aplicaciones de forma portable y orquestar clústeres elásticos con auto-recuperación y monitoreo de red.',
      context: 'Revolución de la contenedorización y la infraestructura como código (IaC).',
      complexity: 'Alta (Orquestación de clústeres, redes overlay y benchmarking).',
      theory: [
        `
        <div class="theory-block">
          <h4 class="modal-subheading">1. Docker vs Virtualización Tradicional</h4>
          <p>Docker es virtualización a nivel de SO (contenedorización). Aprovecha <strong>Namespaces</strong> (aislamiento PID, NET, MNT) y <strong>Cgroups</strong> (límite CPU/RAM) del kernel Linux, eliminando la necesidad de un hipervisor y SO huésped completo.</p>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">2. Kubernetes (K8s) & GCP Infrastructure</h4>
          <ul class="formal-list">
            <li><strong>Control Plane:</strong> <code>kube-apiserver</code>, <code>etcd</code> (almacén clave-valor distribuido), <code>kube-scheduler</code>, <code>kube-controller-manager</code>.</li>
            <li><strong>Worker Nodes:</strong> <code>kubelet</code>, <code>kube-proxy</code>, Container Runtime.</li>
            <li><strong>Abstracciones:</strong> Pods, Services (ClusterIP, NodePort, LoadBalancer), Deployments, Ingress. Bucle de Reconciliación declarativo.</li>
          </ul>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">3. Herramientas de Benchmarking y GCP (Material carpeta informacion)</h4>
          <div class="callout-box info">
            - <strong>Apache Bench (ab):</strong> Benchmarking HTTP CLI. <code>ab -n 1000 -c 50 http://...</code> evalúa RPS y percentiles de latencia.<br>
            - <strong>iperf / iperf3:</strong> Pruebas de rendimiento TCP/UDP. <code>iperf3 -c IP -P 4</code> mide ancho de banda, jitter y pérdida de paquetes.<br>
            - <strong>Balanceadores de Carga GCP:</strong> Distribución Anycast VIP con auto-escalado y monitoreo en Google Cloud Operations.<br>
            - <strong>GCP Deployment Manager:</strong> Infraestructura como Código (IaC) con plantillas declarativas YAML/Python.
          </div>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">4. Conexión con Proyectos AWS & Cloud Enterprise</h4>
          <div class="callout-box alert">
            <strong>Orquestación Cloud Enterprise:</strong><br>
            - <strong>AWS EKS (Elastic Kubernetes Service) / GCP GKE:</strong> Administración gestionada del Control Plane de Kubernetes.<br>
            - <strong>AWS ECR / Docker Hub:</strong> Registro de imágenes inmutables de contenedores.
          </div>
        </div>
        `
      ],
      glossary: [
        { term: 'Namespaces & Cgroups', definition: 'Mecanismos del kernel Linux para aislar recursos y limitar CPU/RAM de contenedores.', analogy: 'Namespaces son las paredes del departamento; Cgroups son la cuota de agua y luz.' },
        { term: 'etcd', definition: 'Base de datos clave-valor distribuida que guarda el estado deseado y real de Kubernetes.', analogy: 'El libro de actas oficial e inmutable del condominio.' }
      ]
    },
    {
      code: 'TEMA 7',
      title: 'Diseño Centrado en el Usuario (DCU) y Diseño GUI',
      shortDesc: 'ISO 9241-210 (DCU 4 etapas), componentes de interfaz GUI (WIMP) y las 10 Heurísticas de Nielsen.',
      purposeUsability: 'Garantizar interfaces intuitivas, accesibles y libres de errores cognitivos para operadores humanos.',
      context: 'Estándares internacionales de interacción persona-ordenador (HCI) y usabilidad.',
      complexity: 'Baja-Media (Diseño de interacción y usabilidad).',
      theory: [
        `
        <div class="theory-block">
          <h4 class="modal-subheading">1. Diseño Centrado en el Usuario (ISO 9241-210)</h4>
          <p>Proceso iterativo de 4 etapas: 1. <em>Comprender contexto de uso</em> ➔ 2. <em>Especificar requisitos de usuario</em> ➔ 3. <em>Producir soluciones de diseño (prototipado)</em> ➔ 4. <em>Evaluar diseños contra requisitos</em>.</p>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">2. Desglose de GUI & 10 Heurísticas de Nielsen</h4>
          <p>Una GUI utiliza el paradigma <strong>WIMP</strong> (Windows, Icons, Menus, Pointer) estructurado en Contenedores y Widgets.</p>
          <div class="callout-box info">
            <strong>Heurísticas Clave:</strong> Visibilidad del estado (feedback), Consistencia y estándares, Prevención de errores, Reconocimiento antes que recuerdo, Flexibilidad y diseño minimalista.
          </div>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">3. Conexión con Proyectos AWS & Big Data</h4>
          <div class="callout-box alert">
            <strong>Dashboards Analíticos UX:</strong><br>
            - <strong>Amazon QuickSight / CloudWatch Dashboards:</strong> Aplicación de las heurísticas de Nielsen en la construcción de interfaces de monitoreo de datos en tiempo real para alta gerencia.
          </div>
        </div>
        `
      ],
      glossary: [
        { term: 'WIMP', definition: 'Windows, Icons, Menus, Pointer; metáfora de interfaz gráfica clásica.', analogy: 'El escritorio físico traducido a la pantalla del computador.' },
        { term: 'Feedback en GUI', definition: 'Respuesta visual/auditiva inmediata que confirma la ejecución de una acción.', analogy: 'El clic y encendido de luz al presionar la tecla de un interruptor.' }
      ]
    },
    {
      code: 'TEMA 8',
      title: 'IA, Hardware y Visión (TensorFlow, Arduino y OpenCV)',
      shortDesc: 'TensorFlow (tensores, DAG, TF Lite INT8), Arduino Uno R3 (ATmega328P, ADC, PWM) y OpenCV (BGR, Haar, approxPolyDP).',
      purposeUsability: 'Conectar modelos de Deep Learning y visión artificial con hardware embebido y sensores del mundo real.',
      context: 'Sistemas embebidos de IoT, TinyML y procesamiento de imágenes en tiempo real.',
      complexity: 'Alta (Deep Learning, microcontroladores y visión por computadora).',
      theory: [
        `
        <div class="theory-block">
          <h4 class="modal-subheading">1. TensorFlow & TensorFlow Lite INT8</h4>
          <p>TensorFlow opera mediante Tensores (arreglos ND) y grafos de cómputo con diferenciación automática. Para Arduino, <strong>TF Lite for Microcontrollers</strong> cuantiza modelos de float32 a **INT8** (<code>r = S·(q - Z)</code>) reduciendo 75% la RAM.</p>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">2. Composición Física de Arduino Uno R3</h4>
          <ul class="formal-list">
            <li><strong>Microcontrolador:</strong> ATmega328P (8-bit AVR).</li>
            <li><strong>Memoria:</strong> Flash 32KB, SRAM 2KB, EEPROM 1KB. Cristal de cuarzo a 16 MHz.</li>
            <li><strong>Pines:</strong> 14 GPIO Digitales (6 PWM <code>~</code>), 6 Entradas Analógicas (ADC 10-bit: 0-1023).</li>
            <li><strong>Alimentación:</strong> USB 5V o Jack VIN (7-12V) con reguladores de 5V y 3.3V. Convertidor USB-Serial ATmega16U2.</li>
          </ul>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">3. OpenCV & Clasificación de Formas</h4>
          <p>Imágenes leídas en formato **BGR**. Detección de vértices poligonales con <code>cv2.approxPolyDP</code> (Douglas-Peucker) y clasificadores en cascada de Haar mediante Imagen Integral O(1).</p>
        </div>
        `,
        `
        <div class="theory-block" style="margin-top: 1.5rem;">
          <h4 class="modal-subheading">4. Conexión con Proyectos AWS & Edge AI</h4>
          <div class="callout-box alert">
            <strong>Edge AI & IoT en AWS:</strong><br>
            - <strong>AWS IoT Greengrass:</strong> Despliegue de modelos de TensorFlow Lite y scripts de OpenCV directamente en dispositivos Edge/Arduino/Raspberry Pi.<br>
            - <strong>Amazon Rekognition:</strong> Servicio equivalente en la nube para visión por computadora avanzada en escala masiva.
          </div>
        </div>
        `
      ],
      glossary: [
        { term: 'ADC 10-bits', definition: 'Convertidor Analógico-Digital que convierte voltajes de 0 a 5V en valores enteros de 0 a 1023.', analogy: 'Una regla graduada con 1024 marcas precisas para medir la altura del agua.' },
        { term: 'Cuantificación INT8', definition: 'Conversión de números flotantes de 32 bits a enteros de 8 bits para ahorrar espacio en microcontroladores.', analogy: 'Redondear precios con centavos a billetes enteros para calcular rápido de cabeza.' }
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
