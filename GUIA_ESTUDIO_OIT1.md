# GUÍA DE ESTUDIO AVANZADA Y FORMAL DE INGENIERÍA Y TECNOLOGÍA

Esta guía presenta de manera rigurosa, formal y detallada cada uno de los conceptos solicitados, organizados modularmente para un aprendizaje de nivel universitario / posgrado.

---

## MÓDULO 1: FÍSICA Y TECNOLOGÍA DE TRANSMISIÓN DE INFORMACIÓN

### 1.1 Computación Cuántica: Fundamentos Rigurosos y Ramificaciones

#### A. Definición Formal
La **Computación Cuántica** es un paradigma de cómputo no clásico que aprovecha los fenómenos de la mecánica cuántica —específicamente la superposición lineal, el entrelazamiento cuántico y la interferencia cuántica— para procesar información de formas que los ordenadores clásicos no pueden replicar eficientemente.

#### B. El Qubit y el Espacio de Hilbert
A diferencia del bit clásico (cuyo estado es discretamente $0$ o $1$), un **qubit** (bit cuántico) es un sistema cuántico de dos niveles proyectado sobre un espacio de Hilbert complejo bidimensional $\mathbb{C}^2$.

El estado puramente cuántico de un qubit $|\psi\rangle$ se representa mediante la combinación lineal de los estados de la base computacional $\{|0\rangle, |1\rangle\}$:

$$|\psi\rangle = \alpha |0\rangle + \beta |1\rangle$$

donde $\alpha, \beta \in \mathbb{C}$ son las **amplitudes de probabilidad**, cumpliendo la condición de normalización:

$$|\alpha|^2 + |\beta|^2 = 1$$

Al medir el qubit, el estado colapsa irrevocablemente a $|0\rangle$ con probabilidad $|\alpha|^2$ o a $|1\rangle$ con probabilidad $|\beta|^2$.

#### C. Principios Cuánticos Fundamentales
1. **Superposición Cuántica**: Capacidad de un sistema de existir simultáneamente en una combinación lineal de múltiples estados posibles antes de realizar una observación/medición.
2. **Entrelazamiento Cuántico (Quantum Entanglement)**: Fenómeno en el cual dos o más qubits comparten un estado cuántico unificado no factorizable. El estado global del sistema no se puede expresar como el producto tensorial de los estados individuales:
   
   $$|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$$
   
   Cualquier medición sobre un qubit determina instantáneamente el estado del qubit entrelazado, independientemente de la distancia física entre ellos.
3. **Interferencia Cuántica**: Habilidad de manipular las amplitudes de probabilidad ($\alpha, \beta$) de tal forma que las trayectorias computacionales incorrectas sufran **interferencia destructiva** (cancelándose) y las respuestas correctas experimenten **interferencia constructiva** (amplificándose).
4. **Decoherencia Cuántica**: Pérdida del estado cuántico debido a la interacción térmica y electromagnética no deseada con el entorno, transformando estados puros en mezclas estadísticas.

#### D. Ramificaciones y Aplicaciones
- **Algoritmos Cuánticos Notables**:
  - *Algoritmo de Shor*: Factorización de enteros en tiempo polinomial $O((\log N)^3)$, rompiendo esquemas criptográficos asimétricos clásicos como RSA.
  - *Algoritmo de Grover*: Búsqueda en bases de datos no estructuradas de tamaño $N$ en tiempo $O(\sqrt{N})$, ofreciendo una aceleración cuadrática.
  - *Algoritmos Híbridos VQE / QAOA*: Variational Quantum Eigensolver y Quantum Approximate Optimization Algorithm para optimización combinatoria y química cuántica en la era NISQ (*Noisy Intermediate-Scale Quantum*).
- **Criptografía Cuántica**:
  - *QKD (Quantum Key Distribution)*: Protocolos como BB84 que garantizan la detección incondicional de escuchas no autorizadas basándose en el teorema de no-clonación.
  - *Criptografía Post-Cuántica (PQC)*: Algoritmos matemáticos clásicos (basados en retículos/lattices) resistentes a ataques por ordenadores cuánticos.
- **Hardware Cuántico (Implementaciones Físicas)**:
  - *Circuitos Superconductores (Transmon)*: Transiciones electrónicas en uniones Josephson enfriadas a mK (IBM, Google).
  - *Iones Atrapados (Trapped Ions)*: Átomos cargados suspendidos por campos electromagnéticos y manipulados por láseres (IonQ, Honeywell).
  - *Fotónica Cuántica*: Manipulación de fotones a través de guías de onda integradas a temperatura ambiente (Xanadu).

---

### 1.2 Fibra Óptica vs. Fibra de Vidrio: Modelos Mentales y Comparación Rigurosa

Existe una confusión común entre ambos términos debido a que ambos involucran sílice ($SiO_2$). Sin embargo, sus **propósitos, principios físicos de funcionamiento y estructuras de ingeniería son completamente distintos**.

| Criterio | Fibra Óptica | Fibra de Vidrio (GFRP / Fiberglass) |
| :--- | :--- | :--- |
| **Definición** | Medio guiado de transmisión electromagnética mediante señales luminosas. | Material compuesto (*composite*) formado por matriz polimérica reforzada con filamentos de vidrio. |
| **Función Principal** | Transmisión ultra-rápida de datos/telecomunicaciones. | Refuerzo mecánico, soporte estructural e aislamiento térmico/eléctrico. |
| **Principio Físico** | **Reflexión Interna Total** y propagación guiada de ondas ópticas. | **Transferencia de esfuerzo cortante** entre matriz plástica y fibras de alta tracción. |
| **Estructura Interna** | Núcleo de sílice ultra pura + Revestimiento + Cubierta protectora. | Fibras de vidrio desordenadas o tejidas embebidas en resina (epoxi/poliéster). |
| **Propiedad Clave** | Atenuación extremadamente baja, ancho de banda gigabit/terabit, inmunidad a EMI. | Alto módulo de Young, relación resistencia/peso elevada, rigidez dielectrica. |

#### A. Modelo Mental a Detalle: Fibra Óptica
- **Componentes**:
  1. *Núcleo (Core)*: Vidrio de dióxido de silicio con alto índice de refracción ($n_1$).
  2. *Revestimiento (Cladding)*: Vidrio con índice de refracción menor ($n_2 < n_1$).
  3. *Recubrimiento Primario (Buffer Coating)*: Plástico para absorción de impactos y humedad.
- **Mecanismo de Propagación**: Cuando la luz ingresa con un ángulo mayor al **ángulo crítico** ($\theta_c = \arcsin(n_2 / n_1)$), experimenta **Reflexión Interna Total**, rebotando dentro del núcleo sin escapar hacia el revestimiento.
- **Clasificación**:
  - *Fibra Monomodo (SMF - Single Mode Fiber)*: Diámetro de núcleo muy reducido ($\sim 8-10\,\mu\text{m}$). Propaga un solo modo transversal de luz. Cero dispersión modal. Ideal para distancias continentales/interurbanas.
  - *Fibra Multimodo (MMF - Multi Mode Fiber)*: Diámetro de núcleo más amplio ($50-62.5\,\mu\text{m}$). Propaga múltiples modos de luz. Presenta dispersión modal. Usada en redes LAN y Data Centers.

#### B. Modelo Mental a Detalle: Fibra de Vidrio
- **Componentes**:
  1. *Filamentos de Vidrio*: Hilos finos extruidos de sílice mezclados con óxidos metálicos (Vidrio Tipo E para aislamiento/uso general, Tipo S para alta resistencia).
  2. *Matriz Polimérica*: Resina termoestable (poliéster, viniléster, epoxi) que une las fibras y distribuye las cargas mecánicas.
- **Mecanismo Estructural**: La matriz protege las fibras del medio ambiente y transfiere la carga aplicada. Las fibras absorben los esfuerzos de tensión y tracción, otorgando una rigidez mecánica superior con un peso muy inferior al acero.

---

## MÓDULO 2: INGENIERÍA DE SOFTWARE, METODOLOGÍAS Y MARCOS NORMADOS

### 2.1 Ciclo de Vida del Software (SDLC) - Formalismo ISO/IEC/IEEE 12207

El **Ciclo de Vida del Software (Software Development Life Cycle - SDLC)** es un marco de referencia formal que define los procesos, actividades y tareas involucradas en el desarrollo, operación, mantenimiento y retiro de un producto software.

#### Descripción Objetiva y Formal de Cada Fase

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      FASES FORMALES DEL SDLC                            │
├──────────────┬──────────────┬──────────────┬──────────────┬─────────────┤
│ 1. Análisis  │ 2. Diseño    │ 3. Construc. │ 4. Pruebas   │ 5. Desplieg.│
│  Requisitos  │ Arquitectón. │ Codificación │  (V & V)     │  y Operac.  │
└──────────────┴──────────────┴──────────────┴──────────────┴─────────────┘
```

1. **Análisis y Especificación de Requisitos (Requirements Engineering & Elicitation)**:
   - *Objetivo*: Descubrir, modelar, documentar y validar las necesidades del cliente y restricciones del sistema.
   - *Actividades*: Elicitación de requisitos (entrevistas, casos de uso), análisis de factibilidad técnica/económica, especificación formal mediante la **SRS (Software Requirements Specification)** bajo la norma ISO/IEC/IEEE 29148.
   - *Entregable*: Documento SRS firmado, matriz de trazabilidad de requisitos.

2. **Diseño de Arquitectura y Sistema (Architectural & Detailed Design)**:
   - *Objetivo*: Traducir los requisitos en la estructura lógica y física del sistema.
   - *Actividades*: Definición de patrones arquitectónicos (microservicios, capas, event-driven), diseño del modelo de datos (ER, esquemas NoSQL), especificación de contratos de interfaz/API (OpenAPI, gRPC), evaluación de atributos de calidad (mantenibilidad, rendimiento, seguridad).
   - *Entregable*: Documento de Diseño de Software (SDD - Software Design Document), diagramas C4/UML.

3. **Implementación y Codificación (Software Construction & Implementation)**:
   - *Objetivo*: Transformar las especificaciones de diseño en código fuente ejecutable y mantenible.
   - *Actividades*: Programación según estándares de codificación, control de versiones (Git branching strategy), refactorización, integración continua (CI) y revisiones peer-to-peer (Pull Request Reviews).
   - *Entregable*: Código fuente compilable/interpretable, binarios, artefactos de construcción.

4. **Verificación y Validación / Pruebas (Verification & Validation - V&V)**:
   - *Objetivo*: Garantizar que el software cumple con las especificaciones técnicas (*Verificación*: "¿Construimos el producto correctamente?") y satisface la necesidad real del cliente (*Validación*: "¿Construimos el producto correcto?").
   - *Actividades*: Pruebas unitarias, pruebas de integración, pruebas de sistema, pruebas de regresión, pruebas de seguridad (SAST/DAST), pruebas de rendimiento (Apache Bench/iperf), y Pruebas de Aceptación del Usuario (UAT).
   - *Entregables*: Plan de pruebas, informes de ejecución de pruebas, registro de defectos (bug reports).

5. **Despliegue y Liberación (Deployment & Release Engineering)**:
   - *Objetivo*: Transferir el producto probado desde los entornos de desarrollo/staging al entorno de producción operativo.
   - *Actividades*: Automatización de despliegues (CD pipelines), estrategias de despliegue sin tiempo de inactividad (*Blue/Green Deployment*, *Canary Releases*, *Rolling Updates*), configuración de infraestructura como código (IaC).
   - *Entregables*: Release Notes, entorno de producción desplegado y verificado.

6. **Operaciones, Mantenimiento y Evolución (Operations & Maintenance)**:
   - *Objetivo*: Preservar la operatividad del sistema, resolver incidentes y adaptar el software a nuevas necesidades.
   - *Tipos de Mantenimiento*:
     - *Correctivo*: Solución de fallos descubiertos en producción.
     - *Adaptativo*: Modificaciones para operar en nuevos entornos de hardware/SO.
     - *Perfectivo*: Mejoras de rendimiento o refinamiento de funcionalidades.
     - *Preventivo*: Refactorización preventiva y parcheo de vulnerabilidades.

---

### 2.2 Frameworks, Estándares de Calidad y Gobierno Tecnológico

#### A. CMMI Nivel 3 (Defined / Definido)
- **¿Qué es CMMI?**: *Capability Maturity Model Integration* es un modelo de madurez de procesos desarrollado por el SEI (Software Engineering Institute / ISACA).
- **CMMI Nivel 3**: En este nivel, los procesos de la organización están **claramente caracterizados, comprendidos y descritos en estándares, procedimientos, herramientas y métodos a nivel organizacional**.
- **Características clave del Nivel 3**:
  - *Estandarización Organizacional*: Existe un conjunto de procesos estándar para toda la empresa (PAL - Process Asset Library).
  - *Adaptación (Tailoring)*: Los proyectos individuales adaptan el proceso estándar de la organización según las guías formales de adaptación.
  - *Gestión Proactiva*: Los procesos se gestionan proactivamente utilizando la comprensión de las interrelaciones de las actividades y mediciones detalladas.

#### B. Normas ISO (9001, 27001, 25000)
- **ISO 9001: Sistema de Gestión de la Calidad (SGC)**:
  - Estándar internacional enfocado en la satisfacción del cliente y la mejora continua de procesos.
  - Basado en el ciclo **PHVA** (Planificar-Hacer-Verificar-Actuar) y el *pensamiento basado en riesgos*.
- **ISO/IEC 27001: Sistema de Gestión de Seguridad de la Información (SGSI)**:
  - Norma que define el establecimiento, implementación, mantenimiento y mejora continua de un SGSI.
  - Protege la **Triada CIA**: *Confidencialidad*, *Integridad* y *Disponibilidad* de los activos de información.
  - Requiere análisis de riesgos riguroso y la aplicación de controles declarados en el Anexo A / ISO 27002.
- **ISO/IEC 25000 (SQuaRE - Software Product Quality Requirements and Evaluation)**:
  - Guía unificada para evaluar la **calidad del producto software**.
  - **ISO 25010 (Modelo de Calidad de Software)**: Define 8 características esenciales de calidad del producto:
    1. *Adecuación Funcional*
    2. *Eficiencia de Desempeño*
    3. *Compatibilidad*
    4. *Usabilidad*
    5. *Fiabilidad*
    6. *Seguridad*
    7. *Mantenibilidad*
    8. *Portabilidad*

#### C. PMBOK (PMI)
- **¿Qué es?**: *Project Management Body of Knowledge* del Project Management Institute (PMI).
- **Enfoque**: Marco de trabajo formal para la dirección de proyectos.
- **Grupos de Procesos**: Inicio, Planificación, Ejecución, Monitoreo y Control, y Cierre.
- **Áreas de Conocimiento / Dominios**: Gestión del Alcance, Tiempo/Cronograma, Costo, Calidad, Recursos, Comunicaciones, Riesgos, Adquisiciones e Interesados.

#### D. Scrum / Marco Ágil
- **Manifiesto Ágil**: 4 Valores (Individuos e interacciones sobre procesos; software funcionando sobre documentación extensiva; colaboración con cliente sobre negociación contractual; respuesta al cambio sobre seguir un plan) y 12 Principios.
- **Marco Scrum**:
  - *Roles*: Product Owner (optimiza el valor), Scrum Master (facilita y elimina impedimentos), Developers (entregan incrementos terminados).
  - *Artefactos*: Product Backlog, Sprint Backlog, Incremento (cumpliendo la Definition of Done - DoD).
  - *Eventos*: Sprint, Sprint Planning, Daily Scrum (15 min), Sprint Review, Sprint Retrospective.

#### E. COBIT (ISACA)
- **¿Qué es?**: *Control Objectives for Information and Related Technologies*. Es un marco para el **Gobierno y la Gestión de TI Empresarial**.
- **Separación Crucial**:
  - **Gobierno (Governance - EDM)**: *Evaluar, Dirigir y Monitorear*. Responsabilidad de la Junta Directiva.
  - **Gestión (Management - APO, BAI, DSS, MEA)**: *Planificar, Construir, Ejecutar y Monitorear*. Responsabilidad de la dirección ejecutiva.

#### F. ITIL (AXELOS)
- **¿Qué es?**: *Information Technology Infrastructure Library*. Marco para la **Gestión de Servicios de TI (ITSM)**.
- **ITIL 4**: Introduce el **Sistema de Valor del Servicio (SVS)** y la **Cadena de Valor del Servicio** (Plan, Improve, Engage, Design & Transition, Obtain/Build, Deliver & Support).
- **Prácticas Clave**: Gestión de Incidentes, Gestión de Problemas, Control de Cambios, Gestión de Niveles de Servicio (SLA).

---

## MÓDULO 3: METODOLOGÍAS DE MINERÍA DE DATOS Y CIENCIA DE DATOS

```
┌────────────────────────────────────────────────────────────────────────┐
│              COMPARATIVA DE METODOLOGÍAS DE DATOS                      │
├───────────────┬────────────────────────────────────────────────────────┤
│ Metodología   │ Secuencia de Fases Principales                         │
├───────────────┼────────────────────────────────────────────────────────┤
│ KDD           │ Selección ➔ Preprocesamiento ➔ Transformación ➔        │
│               │ Minería de Datos ➔ Interpretación/Evaluación           │
├───────────────┼────────────────────────────────────────────────────────┤
│ SEMMA         │ Sample ➔ Explore ➔ Modify ➔ Model ➔ Assess             │
├───────────────┼────────────────────────────────────────────────────────┤
│ CRISP-DM      │ Business Und. ➔ Data Und. ➔ Data Prep ➔ Modeling ➔    │
│               │ Evaluation ➔ Deployment                                │
└───────────────┴────────────────────────────────────────────────────────┘
```

### 3.1 KDD (Knowledge Discovery in Databases)
Proceso formal iterativo e interactivo para la extracción no trivial de información implícita, previamente desconocida y potencialmente útil a partir de grandes volúmenes de datos.
- **Fases Formales**:
  1. *Selección*: Definición del conjunto de datos objetivo.
  2. *Preprocesamiento*: Limpieza de ruido, tratamiento de datos faltantes e imputación.
  3. *Transformación*: Reducción dimensional (PCA), selección de características y normalización.
  4. *Minería de Datos (Data Mining)*: Aplicación de algoritmos (clasificación, clustering, regresión, reglas de asociación).
  5. *Interpretación / Evaluación*: Análisis de patrones descubiertos y validación de conocimiento.

### 3.2 SEMMA (SAS Institute)
Metodología desarrollada por el SAS Institute orientada al proceso técnico de modelado estadístico:
- **Sample (Muestrear)**: Extracción de muestras representativas.
- **Explore (Explorar)**: Análisis exploratorio de datos (EDA), visualización de distribuciones y correlaciones.
- **Modify (Modificar)**: Creación de variables derivadas, transformación de atributos y agrupación.
- **Model (Modelar)**: Aplicación de técnicas estadísticas y de aprendizaje automático.
- **Assess (Evaluar)**: Evaluación del rendimiento del modelo mediante métricas ($R^2$, ROC-AUC, matriz de confusión).

### 3.3 CRISP-DM (Cross-Industry Standard Process for Data Mining)
Estándar industrial neutro y abierto, estructurado en 6 fases iterativas:
1. *Business Understanding*: Definición de objetivos del negocio y conversión a objetivos de minería de datos.
2. *Data Understanding*: Recolección inicial, exploración y verificación de calidad de datos.
3. *Data Preparation*: Limpieza, transformación y formateo final de tablas.
4. *Modeling*: Selección y ajuste de técnicas algorítmicas.
5. *Evaluation*: Validación del modelo contrastándolo con los objetivos de negocio.
6. *Deployment*: Integración en producción, monitoreo y mantenimiento del modelo.

### 3.4 DATLAS / Marcos de Analítica Espacial
Plataforma/Metodología para el **análisis de datos espaciales, geográficos y territoriales**, integrando econometría espacial, GIS (Sistemas de Información Geográfica) y mapas interactivos de complejidad económica e industrial.

---

## MÓDULO 4: BIG DATA, CLOUD COMPUTING Y ORQUESTACIÓN EN NUBE

### 4.1 Big Data: Concepto Exacto y Definiciones Académicas Tops

#### A. Definición Exacta y Rigurosa
**Big Data** hace referencia a conjuntos de datos cuyo volumen, velocidad de generación y diversidad estructural exceden la capacidad de almacenamiento, procesamiento y análisis de las bases de datos relacionales tradicionales y arquitecturas de cómputo monopuesto.

#### B. Definiciones de Instituciones Tops
- **Gartner (Doug Laney - 3Vs)**: "Big Data son activos de información de gran volumen, alta velocidad y/o gran variedad que demandan formas innovadoras y rentables de procesamiento de información que permiten una mejor percepción, toma de decisiones y automatización de procesos."
- **NIST (NIST SP 1500-1)**: "Big Data consta de datos cuyo volumen, diversidad y/o velocidad de generación requieren arquitecturas escalables para su almacenamiento, manipulación y análisis eficiente."
- **MIT / Harvard**: Se enfatiza el concepto de **Analítica de Big Data** como la convergencia entre almacenamiento masivo distribuido (ej. HDFS/Object Storage) y algoritmos paralelos de aprendizaje automático (MapReduce/Spark).

#### C. Las V's del Big Data
1. **Volumen**: Escala masiva de datos (Petabytes, Exabytes).
2. **Velocidad**: Ritmo acelerado de generación e ingesta en tiempo real o near-real-time.
3. **Variedad**: Diversidad de formatos (Estructurados, Semi-estructurados como JSON/XML, No estructurados como video/audio).
4. **Veracidad**: Calidad, confiabilidad y nivel de ruido presente en los datos.
5. **Valor**: Capacidad de convertir los datos en conocimiento útil para el negocio.

---

### 4.2 Cloud Computing: Definición NIST SP 800-145 y Principios

#### A. Definición Exacta del NIST
> "Cloud Computing es un modelo que permite el acceso omnipresente, conveniente y bajo demanda por red a un conjunto compartido de recursos de computación configurables (redes, servidores, almacenamiento, aplicaciones y servicios) que pueden ser rápidamente aprovisionados y liberados con un esfuerzo de gestión mínimo o interacción mínima con el proveedor del servicio."

#### B. 5 Características Esenciales
1. **On-demand Self-service (Autoservicio bajo demanda)**: El usuario aprovisiona recursos (tiempo de CPU, almacenamiento) automáticamente sin intervención humana del proveedor.
2. **Broad Network Access (Acceso amplio a la red)**: Disponibilidad de capacidades a través de la red accesible mediante mecanismos estándares (portátiles, móviles).
3. **Resource Pooling (Agrupamiento de recursos)**: Los recursos de computación del proveedor se agrupan para servir a múltiples consumidores usando un modelo multitenant.
4. **Rapid Elasticity (Elasticidad rápida)**: Los recursos se pueden aprovisionar y liberar de forma elástica para escalar rápidamente hacia arriba o hacia abajo según la demanda.
5. **Measured Service (Servicio medido)**: Los sistemas de la nube controlan y optimizan automáticamente el uso de recursos midiendo su consumo (*Pay-as-you-go*).

#### C. Modelos de Servicio y Despliegue
- **Modelos de Servicio**:
  - *IaaS (Infrastructure as a Service)*: Aprovisionamiento de VMs, almacenamiento y redes (ej. GCP Compute Engine, AWS EC2).
  - *PaaS (Platform as a Service)*: Aprovisionamiento de entornos de ejecución y desarrollo sin gestionar la infraestructura subyacente (ej. GCP App Engine, Heroku).
  - *SaaS (Software as a Service)*: Aplicaciones completas listas para el usuario final (ej. Google Workspace, Microsoft 365).
- **Modelos de Despliegue**: Nube Pública, Nube Privada, Nube Híbrida y Nube Comunitaria.

---

### 4.3 Docker: Virtualización a Nivel de Sistema Operativo

#### A. Definición Exacta
**Docker** es una tecnología de **virtualización ligera a nivel de sistema operativo** (contenedorización) que permite empaquetar una aplicación junto con sus dependencias y binarios en una unidad aislada llamada **contenedor**, ejecutándose directamente sobre el kernel del sistema operativo anfitrión.

```
┌─────────────────────────┐  ┌─────────────────────────┐
│ App A (Deps / Libs)     │  │ App B (Deps / Libs)     │
├─────────────────────────┴──┴─────────────────────────┤
│                DOCKER ENGINE / RUNTIME               │
├──────────────────────────────────────────────────────┤
│               HOST OPERATING SYSTEM                  │
├──────────────────────────────────────────────────────┤
│                     INFRASTRUCTURE                   │
└──────────────────────────────────────────────────────┘
```

#### B. Diferencia con Máquinas Virtuales (VMs)
A diferencia de las VMs (que requieren un Hypervisor y un Sistema Operativo Huésped completo en cada máquina), los contenedores **comparten el kernel del SO Host**, lo que resulta en un arranque en milisegundos y un consumo mínimo de memoria RAM/CPU.

#### C. Principios y Componentes Internos
- **Mecanismos del Kernel Linux**:
  - *Namespaces*: Proveen aislamiento de procesos (PID), red (NET), montaje de disco (MNT), e interproceso (IPC).
  - *Control Groups (cgroups)*: Limitan y contabilizan el uso de recursos hardware (CPU, RAM, I/O).
- **Componentes**:
  - *Dockerfile*: Script declarativo de instrucciones para construir una imagen.
  - *Docker Image*: Plantilla inmutable de solo lectura compuesta por capas superpuestas (OverlayFS).
  - *Docker Container*: Instancia ejecutable e inmutable de una imagen con una capa de escritura superficial.

---

### 4.4 Kubernetes (K8s): Orquestación Declarativa de Contenedores

#### A. Definición Exacta
**Kubernetes** (K8s) es una plataforma extensible y de código abierto para la **orquestación de contenedores**, diseñada para automatizar el despliegue, escalado, balanceo de carga y gestión operativa de aplicaciones en contenedores a través de clusters de máquinas.

#### B. Arquitectura de Kubernetes

```
┌────────────────────────────────────────────────────────────────────────┐
│                        KUBERNETES CONTROL PLANE                        │
│ ┌────────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│ │ kube-apiserver │ │     etcd     │ │kube-scheduler│ │controller-mgr│ │
│ └───────▲────────┘ └──────────────┘ └──────────────┘ └──────────────┘ │
└─────────┼──────────────────────────────────────────────────────────────┘
          │ (HTTPS / REST)
┌─────────▼──────────────────────────────────────────────────────────────┐
│                              WORKER NODE                               │
│ ┌──────────────┐         ┌──────────────┐        ┌───────────────────┐ │
│ │   kubelet    ├─────────►  kube-proxy  ├───────►│ Container Runtime │ │
│ └──────────────┘         └──────────────┘        └─────────▲─────────┘ │
│                                                            │           │
│                                                ┌───────────▼─────────┐ │
│                                                │   POD [App Cont.]   │ │
│                                                └─────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Control Plane (Plano de Control)**:
   - `kube-apiserver`: Expone la API RESTful de Kubernetes. Es el hub central de comunicación.
   - `etcd`: Base de datos clave-valor distribuida y consistente que almacena el estado completo del cluster.
   - `kube-scheduler`: Asigna Pods recién creados a los nodos disponibles basándose en recursos.
   - `kube-controller-manager`: Ejecuta los bucles de control (Node Controller, Deployment Controller).
2. **Worker Nodes (Nodos de Trabajo)**:
   - `kubelet`: Agente primario que se ejecuta en cada nodo para asegurar que los contenedores estén corriendo en los Pods.
   - `kube-proxy`: Mantiene las reglas de red en los nodos y gestiona el enrutamiento TCP/UDP.
   - `Container Runtime`: Software subyacente para ejecutar contenedores (containerd, CRI-O).

#### C. Abstracciones y Principios de K8s
- **Pod**: Unidad básica desplegable en K8s. Agrupa uno o más contenedores que comparten almacenamiento e IP de red.
- **Deployment**: Objeto declarativo que define el estado deseado de los Pods y ReplicaSets.
- **Service**: Abstracción que expone un grupo de Pods bajo una dirección IP o DNS estable:
  - *ClusterIP*: IP interna accesible solo dentro del cluster.
  - *NodePort*: Expone el servicio en un puerto estático en la IP de cada Nodo.
  - *LoadBalancer*: Integra un balanceador de carga externo del proveedor Cloud (ej. GCP Load Balancer).
- **Ingress**: Reglas de enrutamiento HTTP/HTTPS de capa 7 hacia servicios internos.
- **Principios Operativos**:
  - *Declaratividad*: Se define el estado deseado en manifiestos YAML/JSON.
  - *Bucle de Reconciliación (Control Loop)*: K8s evalúa constantemente `Estado Actual vs Estado Deseado` y toma acciones correctivas automáticamente (**Auto-sanación / Self-healing**).
  - *Escalado Horizontal (HPA)*: Escalado automático de Pods basado en métricas de CPU/RAM.

---

### 4.5 Material Complementario de Infraestructura y Benchmarking (Carpeta `informacion`)

#### A. Apache Bench (`ab`) - Prueba de Rendimiento HTTP
- **Concepto**: Herramienta de línea de comandos genérica para realizar pruebas de carga y benchmarking sobre servidores web HTTP.
- **Sintaxis y Parámetros Principales**:
  
  ```bash
  ab -n 1000 -c 50 http://10.0.0.1/
  ```
  
  - `-n`: Número total de peticiones HTTP a enviar en el test (ej. 1000).
  - `-c`: Concurrencia (número de peticiones simultáneas ejecutándose al mismo tiempo, ej. 50).
- **Métricas Clave de Salida**:
  - *Requests per second (RPS / Throughput)*: Peticiones completadas por segundo.
  - *Time per request*: Latencia promedio por petición.
  - *Percentiles de Latencia*: Distribución del tiempo de respuesta (50%, 95%, 99%).

#### B. `iperf` / `iperf3` - Medición de Rendimiento de Red
- **Concepto**: Herramienta CLI para medir el rendimiento máximo de ancho de banda en redes IP (Capa de Transporte: TCP y UDP).
- **Arquitectura Cliente-Servidor**:
  - Servidor: `iperf3 -s` (Escucha peticiones en el puerto 5201).
  - Cliente: `iperf3 -c <SERVER_IP> -P 4 -t 30`
- **Parámetros Clave**:
  - `-c`: Especifica el modo cliente y la IP destino.
  - `-P`: Conexiones paralelas (hilos simultáneos) para saturar enlaces gigabit.
  - `-u`: Cambia de TCP a modo UDP (para medir **jitter** y **pérdida de paquetes**).
  - `-b`: Ancho de banda objetivo para pruebas UDP.

#### C. Balanceadores de Carga en Google Cloud Platform (GCP)
- **Concepto**: Servicio distribuido de GCP que reparte el tráfico entrante de los usuarios entre múltiples instancias backend para prevenir sobrecargas.
- **Tipos de Balanceadores en GCP**:
  - *Global HTTP(S) Load Balancer*: Proxy de capa 7 con IP Anycast global.
  - *Network Load Balancer*: Balanceador regional no-proxy (pass-through) para TCP/UDP de capa 4.
- **Monitoreo**: Integración con **Google Cloud Operations** (antes *Stackdriver*) para registro de métricas, trazas y alertas.

#### D. GCP Deployment Manager
- **Concepto**: Servicio de **Infraestructura como Código (IaC)** en GCP que automatiza la creación, configuración y gestión de recursos mediante archivos de configuración declarativos (YAML, Jinja2 o Python).

---

## MÓDULO 5: DISEÑO CENTRADO EN EL USUARIO Y DISEÑO GUI

### 5.1 Diseño Centrado en el Usuario (DCU / UCD) - ISO 9241-210

#### A. Definición Formal
El **Diseño Centrado en el Usuario (DCU)** es un enfoque multidisciplinario para el desarrollo de sistemas interactivos que busca mejorar la usabilidad, efectividad y experiencia del usuario (UX) mediante la atención explicita a las necesidades, contexto y limitaciones del usuario final en cada etapa del proceso.

#### B. Principios del DCU según ISO 9241-210
1. El diseño se basa en una comprensión explícita de los usuarios, sus tareas y sus entornos operativos.
2. Los usuarios participan activamente a lo largo de todo el proceso de diseño y desarrollo.
3. El diseño es impulsado y refinado por una **evaluación centrada en el usuario** constante.
4. El proceso es estrictamente **iterativo**.
5. El diseño aborda la experiencia de usuario (UX) en su totalidad.

#### C. Ciclo Iterativo del DCU

```
┌────────────────────────────────────────────────────────────────────────┐
│                   CICLO ITERATIVO DEL DCU (ISO 9241-210)               │
│                                                                        │
│   ┌────────────────────────┐         ┌──────────────────────────────┐  │
│   │ 1. Comprender Contexto │────────►│ 2. Especificar Requisitos    │  │
│   │     de Uso             │         │     del Usuario              │  │
│   └────────────────────────┘         └──────────────┬───────────────┘  │
│               ▲                                     │                  │
│               │                                     ▼                  │
│   ┌───────────┴────────────┐         ┌──────────────────────────────┐  │
│   │ 4. Evaluar Diseños     │◄────────│ 3. Producir Soluciones de    │  │
│   │    contra Requisitos   │         │    Diseño (Prototipado)      │  │
│   └────────────────────────┘         └──────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 5.2 Diseño de Interfaz Gráfica de Usuario (GUI)

#### A. Definición Formal y Objetiva
La **Interfaz Gráfica de Usuario (GUI - Graphical User Interface)** es el conjunto de componentes visuales, gráficos y mecanismos de interacción mediante los cuales un usuario se comunica con un sistema informático subyacente, abstrayendo los comandos de texto mediante metáforas visuales (ventanas, iconos, menús, punteros - WIMP).

#### B. Desglose Exhaustivo de Componentes de GUI
1. **Contenedores y Layouts**:
   - *Ventanas / Modales*: Estructuras delimitadoras de contexto.
   - *Grids / Flexbox Layouts*: Marcos para la alineación espacial jerárquica.
2. **Controles de Interacción (Widgets)**:
   - *Acción*: Botones (Primary, Secondary, FAB), Menús desplegables.
   - *Entrada de Datos*: Campos de texto (Inputs), Seleccionadores (Checkboxes, Radio buttons, Sliders).
   - *Visualización de Información*: Tablas, Tarjetas (Cards), Barras de progreso, Notificaciones Toast.
3. **Principios de Usabilidad e Interacción (Heurísticas de Nielsen)**:
   - *Visibilidad del Estado del Sistema*: Retroalimentación inmediata del estado operativo (feedback).
   - *Correspondencia entre el Sistema y el Mundo Real*: Uso de conceptos y palabras familiares para el usuario.
   - *Control y Libertad del Usuario*: Opciones de deshacer/rehacer y cancelar.
   - *Consistencia y Estándares*: Mantenimiento de patrones visuales y comportamientos idénticos en toda la aplicación.
   - *Prevención de Errores*: Diseños orientados a evitar que el usuario cometa fallos accidentales.
   - *Reconocimiento antes que Recuerdo*: Minimizar la carga cognitiva haciendo visibles los objetos y opciones.
   - *Jerarquía Visual y Contraste*: Uso intencional del color, tipografía y espacio en blanco para guiar la vista del usuario.

---

## MÓDULO 6: APRENDIZAZJE PROFUNDO, HARDWARE Y VISIÓN POR COMPUTADORA

### 6.1 TensorFlow

#### A. Definición Exacta
**TensorFlow** es un framework de código abierto de extremo a extremo para Machine Learning y Deep Learning, desarrollado originalmente por el equipo de Google Brain.

#### B. Arquitectura Técnica
- **Tensores**: Estructura de datos fundamental consistente en arreglos multidimensionales caracterizados por su *tipo de dato* (dtype) y su *forma* (shape).
  - Tensor 0D: Escalar.
  - Tensor 1D: Vector.
  - Tensor 2D: Matriz.
  - Tensor ND: Tensor de rango N.
- **Grafo de Cómputo y Diferenciación Automática**: TensorFlow construye grafos acíclicos dirigidos (DAG) de operaciones matemáticas y utiliza la **propagación hacia atrás** (*backpropagation*) mediante cálculo de gradientes automáticos (`tf.GradientTape`) para optimizar los pesos de redes neuronales.
- **Keras API**: Interfaz de alto nivel integrada en TensorFlow (`tf.keras`) para construir y entrenar modelos secuenciales o funcionales.

---

### 6.2 Composición Física y Anatómica del Arduino (ej. Arduino Uno R3)

```
┌────────────────────────────────────────────────────────────────────────┐
│                     ANATOMÍA DEL ARDUINO UNO R3                        │
│                                                                        │
│  [USB Port] ──► [ATmega16U2]               [Pines Digitales 0-13]     │
│  [Power Jack] ─► [Regulador 5V/3.3V]       [LED Pin 13 / L]          │
│  [Botón Reset]                             [Cristal 16MHz]             │
│                                            [Microcontrolador]          │
│  [Pines Power: VIN, 5V, 3.3V, GND]         [ATmega328P]                │
│                                            [Pines Analógicos A0-A5]    │
└────────────────────────────────────────────────────────────────────────┘
```

#### A. Desglose de Componentes Hardware
1. **Microcontrolador Principal (ATmega328P)**:
   - Chip de arquitectura AVR de 8 bits.
   - Almacena y ejecuta el programa compilado (*sketch*).
2. **Memoria Interna**:
   - *Flash*: 32 KB (0.5 KB usados por el bootloader) para almacenar el código ejecutable.
   - *SRAM*: 2 KB de memoria volátil para variables durante la ejecución.
   - *EEPROM*: 1 KB de memoria no volátil para almacenamiento permanente de datos.
3. **Microcontrolador USB-Serial (ATmega16U2 / CH340)**:
   - Convierte las señales del puerto USB de la PC a protocolo serie UART (pines RX/TX) aceptado por el ATmega328P.
4. **Pines Digitales (GPIO - General Purpose Input/Output)**:
   - 14 pines (del 0 al 13). Operan a 5V (máximo 40mA por pin).
   - *Pines PWM (Pulse Width Modulation)*: Identificados con el símbolo `~` (pines 3, 5, 6, 9, 10 y 11), permiten simular salidas analógicas mediante modulación de ancho de pulso de 8 bits (0-255).
   - *Pines RX (0) y TX (1)*: Comunicación serie UART.
5. **Pines Analógicos (Inputs A0 a A5)**:
   - 6 entradas conectadas a un **Convertidor Analógico-Digital (ADC)** de 10 bits de resolución. Mapean voltajes de 0 a 5V en valores enteros de 0 a 1023.
6. **Oscilador de Cristal de Cuarzo (16 MHz)**:
   - Proporciona la señal de reloj para la sincronización del procesador a 16 millones de ciclos por segundo.
7. **Sistema de Alimentación y Regulación**:
   - *Puerto USB*: Proporciona 5V DC.
   - *Conector Jack (VIN)*: Acepta voltajes externos de 7V a 12V DC.
   - *Reguladores de Voltaje Onboard*: Reducen el voltaje de entrada a 5V y 3.3V estables para alimentar sensores externos.

---

### 6.3 OpenCV (Open Source Computer Vision Library)

#### A. Definición Exacta
**OpenCV** es una biblioteca multiplataforma de código abierto optimizada para **visión por computadora, procesamiento de imágenes y aprendizaje profundo**, escrita nativamente en C/C++ con enlaces oficiales para Python y Java.

#### B. Funcionalidades y Estructura Principal
- **Representación de Imágenes**: Una imagen se representa como una matriz multidimensional NumPy de dimensiones `(Alto, Ancho, Canales)`. Nota: OpenCV lee por defecto las imágenes en formato **BGR** (Blue, Green, Red) en lugar de RGB.
- **Operaciones Esenciales**:
  - *Filtrado y Suavizado*: Filtro Gaussiano, Filtro Mediano para eliminación de ruido.
  - *Detección de Bordes y Contornos*: Algoritmo de Canny, Operador de Sobel, extracción de contornos (`cv2.findContours`).
  - *Espacios de Color*: Conversión a escala de grises (`cv2.COLOR_BGR2GRAY`), HSV (`cv2.COLOR_BGR2HSV`) para segmentación por color.
  - *Detección de Objetos y Rostros*: Clasificadores en cascada de Haar (`cv2.CascadeClassifier`), descriptores de características (SIFT, ORB).
  - *Módulo DNN*: Ejecución de inferencias en tiempo real de modelos de redes neuronales convolucionales (CNN) entrenados en TensorFlow, PyTorch o ONNX.

---

> [!NOTE]
> Esta guía abarca minuciosamente todos los aspectos teóricos y prácticos solicitados. Puedes consultar cada módulo de manera independiente para tus sesiones de estudio o preparación de exámenes.
