# INFORME TÉCNICO ACADÉMICO FORMAL: ORGANIZACIÓN E INFRAESTRUCTURA TECNOLÓGICA (OIT 1) Y SISTEMAS DISTRIBUIDOS EN LA NUBE

**INSTITUCIÓN / DOMINIO:** Ingeniería de Sistemas, Computación y Telecomunicaciones  
**MATERIA:** Organización e Infraestructura Tecnológica 1 (OIT 1)  
**TÍTULO DEL INFORME:** Compendio Técnico-Académico sobre Física Aplicada a la Información, Ingeniería de Software, Gobernanza de TI, Ciencia de Datos, Infraestructura Cloud (AWS/GCP), Orquestación de Contenedores y Hardware Embebido  
**FECHA DE ELABORACIÓN:** Julio 2026  
**ESTADO:** Documento Oficial de Estudio e Investigación  

---

## ESTRUCTURA DEL INFORME

1. [RESUMEN EJECUTIVO](#1-resumen-ejecutivo)
2. [CAPÍTULO I: FÍSICA DE LA INFORMACIÓN Y MEDIOS DE TRANSMISIÓN](#2-capítulo-i-física-de-la-información-y-medios-de-transmisión)
   - 2.1 Computación Cuántica, Espacio de Hilbert y Algoritmos
   - 2.2 Fibra Óptica vs. Fibra de Vidrio (GFRP): Modelos Mentales Rigurosos
3. [CAPÍTULO II: INGENIERÍA DE SOFTWARE FORMAL Y ERGONOMÍA COGNITIVA](#3-capítulo-ii-ingeniería-de-software-formal-y-ergonomía-cognitiva)
   - 3.1 Ciclo de Vida del Software (SDLC ISO/IEC/IEEE 12207)
   - 3.2 Ergonomía Cognitiva y Modelos Mentales (Donald Norman)
4. [CAPÍTULO III: MARCOS NORMADOS, GOBERNANZA Y CALIDAD TECNOLÓGICA](#4-capítulo-iii-marcos-normados-gobernanza-y-calidad-tecnológica)
   - 4.1 CMMI Nivel 3 (Defined / Definido)
   - 4.2 Normas ISO de Calidad y Seguridad (9001, 27001, 25000 SQuaRE)
   - 4.3 PMBOK (PMI) y Marco Ágil / Scrum
   - 4.4 COBIT 2019 e ITIL 4
5. [CAPÍTULO IV: CIENCIA DE DATOS, METODOLOGÍAS Y ANALÍTICA ESPACIAL](#5-capítulo-iv-ciencia-de-datos-metodologías-y-analítica-espacial)
   - 5.1 Comparativa KDD, SEMMA, CRISP-DM y DATLAS
6. [CAPÍTULO V: BIG DATA, CLOUD COMPUTING Y CONTENEDORIZACIÓN](#6-capítulo-v-big-data-cloud-computing-y-contenedorización)
   - 6.1 Big Data (Gartner, NIST, MIT) y Arquitecturas de Procesamiento
   - 6.2 Cloud Computing (NIST SP 800-145)
   - 6.3 Docker: Virtualización a Nivel de Sistema Operativo
   - 6.4 Kubernetes (K8s): Orquestación Declarativa en Clústeres
7. [CAPÍTULO VI: MATERIAL DIDÁCTICO DE INFRAESTRUCTURA Y PRUEBAS DE CARGA (CARPETA INFORMACION)](#7-capítulo-vi-material-didáctico-de-infraestructura-y-pruebas-de-carga-carpeta-informacion)
   - 7.1 Pruebas de Rendimiento Web con Apache Bench (`ab`)
   - 7.2 Medición de Rendimiento de Red con `iperf` / `iperf3`
   - 7.3 Balanceadores de Carga y Monitoreo en Google Cloud Platform (GCP)
   - 7.4 Gestor de Despliegue (GCP Deployment Manager) y Marketplace
8. [CAPÍTULO VII: DISEÑO DE INTERFACES (DCU Y GUI)](#8-capítulo-vii-diseño-de-interfaces-dcu-y-gui)
   - 8.1 Diseño Centrado en el Usuario (DCU ISO 9241-210)
   - 8.2 Interfaz Gráfica de Usuario (GUI) y 10 Heurísticas de Nielsen
9. [CAPÍTULO VIII: APRENDIZAJE PROFUNDO, HARDWARE Y VISIÓN POR COMPUTADORA](#9-capítulo-viii-aprendizaje-profundo-hardware-y-visión-por-computadora)
   - 9.1 TensorFlow y Cuantificación INT8 en TF Lite
   - 9.2 Composición Física y Anatómica del Arduino Uno R3
   - 9.3 OpenCV: Procesamiento de Imágenes, Haar Cascades y Geometría
10. [CONCLUSIONES Y RECOMENDACIONES TÉCNICAS](#10-conclusiones-y-recomendaciones-técnicas)

---

## 1. RESUMEN EJECUTIVO

El presente informe técnico ofrece un análisis exhaustivo, riguroso y formal de los pilares que sustentan la **Organización e Infraestructura Tecnológica moderna (OIT 1)**. El documento articula dos fuentes fundamentales de información:
1. **Investigación Teórico-Académica Avanzada**: Conceptos de mecánica cuántica, física de medios guiados de transmisión, estándares normativos internacionales (ISO, CMMI, COBIT, ITIL, PMBOK), metodologías de ciencia de datos (KDD, SEMMA, CRISP-DM, DATLAS) e inteligencia artificial embebida.
2. **Material didáctico y práctico de la carpeta `informacion`**: Herramientas de pruebas de carga HTTP (Apache Bench `ab`), diagnóstico de capa de transporte (`iperf`/`iperf3`), orquestación de contenedores en la nube (Kubernetes en GCP / GKE), balanceadores de carga elásticos con monitoreo en Google Cloud Operations y gestión de infraestructura como código (Deployment Manager).

Asimismo, cada capítulo integra su respectiva **Conexión con Proyectos Enterprise en AWS y Nube Corporativa**, brindando una perspectiva aplicable en entornos bancarios, de telecomunicaciones y sistemas distribuidos masivos.

---

## 2. CAPÍTULO I: FÍSICA DE LA INFORMACIÓN Y MEDIOS DE TRANSMISIÓN

### 2.1 Computación Cuántica, Espacio de Hilbert y Algoritmos

#### A. Formalismo Matemático del Qubit
La **Computación Cuántica** trasciende la lógica binaria clásica mediante la manipulación de estados cuánticos. Un **Qubit** (quantum bit) es un sistema cuántico de dos niveles proyectado sobre un espacio de Hilbert complejo $\mathbb{C}^2$. Su estado puro $|\psi\rangle$ se representa por la combinación lineal:

$$|\psi\rangle = \alpha |0\rangle + \beta |1\rangle$$

donde $\alpha, \beta \in \mathbb{C}$ corresponden a las **amplitudes de probabilidad**. Según el postulado de la **Regla de Born**, la medición destructiva del qubit colapsa el sistema al estado discreto $|0\rangle$ con probabilidad $|\alpha|^2$ o al estado $|1\rangle$ con probabilidad $|\beta|^2$, satisfaciendo la condición de normalización:

$$|\alpha|^2 + |\beta|^2 = 1$$

#### B. Principios Cuánticos Fundamentales
1. **Superposición Lineal**: Capacidad del qubit de existir simultáneamente en una combinación ponderada de $|0\rangle$ y $|1\rangle$ antes del colapso de la función de onda.
2. **Entrelazamiento Cuántico (Quantum Entanglement)**: Estado compartido entre múltiples qubits cuyo estado global no se puede descomponer en el producto tensorial de sus partes. Ejemplo (Estado de Bell):
   
   $$|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$$
   
   Cualquier alteración por medición en un qubit determina instantáneamente el resultado en el qubit entrelazado.
3. **Interferencia Cuántica**: Ajuste de fases en circuitos cuánticos para que las trayectorias computacionales erróneas sufran interferencia destructiva y las respuestas correctas experimenten interferencia constructiva.
4. **Decoherencia Cuántica**: Perturbación del estado cuántico por interacción térmica o electromagnética con el entorno, limitando el tiempo de cómputo útil (T1 y T2).

#### C. Algoritmos y Criptografía
- *Algoritmo de Shor*: Factorización de números enteros en tiempo polinomial $O((\log N)^3)$, vulnerando algoritmos asimétricos clásicos como RSA.
- *Algoritmo de Grover*: Búsqueda en bases no estructuradas en tiempo $O(\sqrt{N})$.
- *Criptografía Cuántica*: Distribución Cuántica de Claves (QKD protocol BB84) y Criptografía Post-Cuántica (PQC) basada en retículos (*lattices*).

> [!NOTE]
> **Conexión AWS Cloud**: **AWS Braket** permite a los desarrolladores diseñar circuitos cuánticos en Python (SDK Braket) y ejecutarlos sobre hardware cuántico real (Transmones de Rigetti, Iones Atrapados de IonQ, Fotónica de Xanadu) o en simuladores de alto rendimiento basados en AWS EC2.

---

### 2.2 Fibra Óptica vs. Fibra de Vidrio (GFRP): Modelos Mentales Rigurosos

Existe una diferencia tajante entre ambos conceptos en ingeniería:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    COMPARACIÓN ESTRUCTURAL Y FÍSICA                     │
├──────────────────────┬────────────────────────┬─────────────────────────┤
│ Criterio             │ Fibra Óptica           │ Fibra de Vidrio (GFRP)  │
├──────────────────────┼────────────────────────┼─────────────────────────┤
│ Propósito            │ Transmisión de datos   │ Refuerzo mecánico       │
│ Principio Físico     │ Reflexión Total Interna│ Transferencia cortante  │
│ Material Núcleo      │ Sílice ultra pura SO₂  │ Hilos de vidrio E/S     │
│ Matriz               │ Recubrimiento plástico │ Resina epoxi/poliéster  │
│ Atenuación / Fuerza  │ 0.2 dB/km a 1550 nm    │ Elevado Módulo Young    │
└──────────────────────┴────────────────────────┴─────────────────────────┘
```

#### A. Fibra Óptica (Guía de Ondas Ópticas)
- **Principio Físico**: Funciona por **Reflexión Interna Total (TIR)**. Al viajar la luz por un núcleo con índice de refracción $n_1$ rodeado por un revestimiento con $n_2 < n_1$, si el ángulo de incidencia supera el ángulo crítico $\theta_c = \arcsin(n_2 / n_1)$, la señal queda confinada en el núcleo.
- **Tipos**:
  - *Monomodo (SMF)*: Núcleo de $\sim 9\,\mu\text{m}$. Un solo modo de propagación. Cero dispersión modal. Distancias continentales.
  - *Multimodo (MMF)*: Núcleo de $50-62.5\,\mu\text{m}$. Múltiples modos. Distancias cortas (Data Centers).

#### B. Fibra de Vidrio (Polímero Reforzado con Vidrio - GFRP)
- **Principio Físico**: Material compuesto donde las fibras absorbentes de tracción se embeben en una matriz plástica que distribuye esfuerzos mecánicos. Sin propiedades de conducción de luz para telecomunicaciones.

> [!TIP]
> **Conexión AWS Cloud**: **AWS Direct Connect** requiere enlaces físicos de fibra óptica monomodo (10G/100G) desde los datacenters de la empresa hacia las ubicaciones Direct Connect de AWS para eludir la red pública de Internet.

---

## 3. CAPÍTULO II: INGENIERÍA DE SOFTWARE FORMAL Y ERGONOMÍA COGNITIVA

### 3.1 Ciclo de Vida del Software (SDLC ISO/IEC/IEEE 12207)

El estándar **ISO/IEC/IEEE 12207** define la estructura formal del Ciclo de Vida del Software dividida en 6 fases obligatorias:

1. **Análisis y Especificación de Requisitos (Requirements Engineering)**: Elicitación de necesidades, estudio de factibilidad y redacción de la **Software Requirements Specification (SRS)** según ISO/IEC/IEEE 29148.
2. **Diseño de Arquitectura y Sistema (Architectural Design)**: Estructuración lógica/física, patrones de diseño (Microservicios, Event-Driven), modelos de bases de datos y especificación **SDD (Software Design Document)**.
3. **Implementación y Codificación (Software Construction)**: Escritura de código limpio, guías de estilo, control de versiones (Git) y revisiones de código (Pull Requests).
4. **Verificación y Validación (Pruebas V&V)**:
   - *Verificación*: "¿Construimos el producto correctamente?" (Cumplimiento de la SRS).
   - *Validación*: "¿Construimos el producto correcto?" (Satisfacción del cliente).
   - Pruebas Unitarias, Integración, Carga (`ab`, `iperf3`), Seguridad (SAST/DAST) y Aceptación (UAT).
5. **Despliegue y Liberación (Deployment & Release Engineering)**: Automatización de pipelines CI/CD y despliegue sin inactividad (*Blue/Green*, *Canary*).
6. **Operaciones, Mantenimiento y Evolución**: Mantenimiento correctivo, adaptativo, perfectivo y preventivo.

> [!IMPORTANT]
> **Conexión AWS Cloud**: **AWS CodePipeline**, **AWS CodeBuild** y **AWS CodeDeploy** automatizan las fases de Implementación, V&V y Despliegue del SDLC permitiendo entregas continuas (CD) seguras.

---

### 3.2 Ergonomía Cognitiva y Modelos Mentales (Donald Norman)

- **Modelo Mental**: Representación interna simplificada, subjetiva y dinámica que construye el usuario sobre el funcionamiento del software.
- **Golfos de Norman**:
  - *Golfo de Ejecución*: Brecha entre la intención del usuario y los controles que ofrece la GUI.
  - *Golfo de Evaluación*: Brecha entre el estado real del sistema y la capacidad del usuario para percibirlo.
- **Entregables de Diseño**: Wireframes (esquemas estructurales estáticos) ➔ Prototipos interactivos (maquetas clicables para pruebas de usabilidad tempranas).

---

## 4. CAPÍTULO III: MARCOS NORMADOS, GOBERNANZA Y CALIDAD TECNOLÓGICA

### 4.1 CMMI Nivel 3 (Defined / Definido)
En **CMMI Nivel 3**, los procesos de la organización están **claramente caracterizados, comprendidos y descritos en estándares, procedimientos, herramientas y métodos a nivel organizacional** (PAL - Process Asset Library). Cada proyecto individual adapta estos procesos según las guías formales de **Tailoring**.

### 4.2 Normas ISO de Calidad y Seguridad
- **ISO 9001**: Sistema de Gestión de Calidad (SGC) basado en el ciclo **PHVA** (Planificar, Hacer, Verificar, Actuar) y enfoque de procesos.
- **ISO/IEC 27001**: Sistema de Gestión de Seguridad de la Información (SGSI). Preserva la **Triada CIA** (*Confidencialidad, Integridad y Disponibilidad*) aplicando controles del Anexo A.
- **ISO/IEC 25000 (SQuaRE / ISO 25010)**: Evaluador de calidad de producto software en 8 características (Adecuación funcional, Usabilidad, Mantenibilidad, Seguridad, Fiabilidad, etc.).

### 4.3 PMBOK (PMI) y Marco Ágil / Scrum
- **PMBOK**: 5 Grupos de Procesos (Inicio, Planificación, Ejecución, Monitoreo/Control, Cierre) y dominios de desempeño.
- **Scrum**: Manifiesto Ágil (4 valores, 12 principios). Roles (Product Owner, Scrum Master, Developers), Artefactos (Product Backlog, Sprint Backlog, Incremento) y Eventos (Sprint, Planning, Daily, Review, Retrospective).

### 4.4 COBIT 2019 e ITIL 4
- **COBIT 2019 (ISACA)**: Gobierno de TI Empresarial. Separa el **Gobierno (EDM: Evaluar, Dirigir, Monitorear)** llevado por el Directorio, de la **Gestión (APO, BAI, DSS, MEA)** llevada por la gerencia.
- **ITIL 4 (AXELOS)**: Gestión de Servicios de TI (ITSM). Introduce el Sistema de Valor del Servicio (SVS), la Cadena de Valor y prácticas (Incidentes, Cambios, SLAs).

> [!NOTE]
> **Conexión AWS Cloud**: **AWS Artifact** provee reportes de auditoría bajo demanda para certificar la conformidad con **ISO 27001**, **ISO 9001** y SOC, mientras que **AWS Config** audita continuamente la gobernanza de la infraestructura.

---

## 5. CAPÍTULO IV: CIENCIA DE DATOS, METODOLOGÍAS Y ANALÍTICA ESPACIAL

```
┌─────────────────────────────────────────────────────────────────────────┐
│                 METODOLOGÍAS DE MINERÍA DE DATOS                        │
├──────────────┬──────────────────────────────────────────────────────────┤
│ Metodología  │ Secuencia de Fases                                       │
├──────────────┼──────────────────────────────────────────────────────────┤
│ KDD          │ Selección ➔ Preprocesamiento ➔ Transformación ➔          │
│              │ Minería de Datos ➔ Interpretación / Evaluación           │
├──────────────┼──────────────────────────────────────────────────────────┤
│ SEMMA        │ Sample ➔ Explore ➔ Modify ➔ Model ➔ Assess              │
├──────────────┼──────────────────────────────────────────────────────────┤
│ CRISP-DM     │ Business Und. ➔ Data Und. ➔ Data Prep ➔ Modeling ➔      │
│              │ Evaluation ➔ Deployment                                  │
└──────────────┴──────────────────────────────────────────────────────────┘
```

### 5.1 Comparativa KDD, SEMMA, CRISP-DM y DATLAS
- **KDD (Knowledge Discovery in Databases)**: Proceso formal de 5 etapas para descubrir conocimiento implícito en grandes volúmenes de datos.
- **SEMMA (SAS)**: Proceso enfocado en aspectos técnicos de modelado estadístico (*Sample, Explore, Modify, Model, Assess*).
- **CRISP-DM**: Estándar industrial neutro de 6 fases iterativas desde la comprensión del negocio hasta el despliegue en producción.
- **DATLAS**: Metodología y plataforma para la **analítica espacial y territorial**, integrando Sistemas de Información Geográfica (GIS) y complejidad económica regional.

> [!TIP]
> **Conexión AWS Cloud**: **AWS Glue (ETL)** automatiza la fase de *Data Preparation* de CRISP-DM; **Amazon SageMaker** gestiona todo el ciclo de vida de ML; y **AWS EMR (Spark)** ejecuta la fase de minería de datos a escala masiva.

---

## 6. CAPÍTULO V: BIG DATA, CLOUD COMPUTING Y CONTENEDORIZACIÓN

### 6.1 Big Data (Gartner, NIST, MIT) y Arquitecturas de Procesamiento

#### A. Definiciones de Referencia
- **Gartner (Doug Laney - 3Vs)**: "Activos de información de gran volumen, alta velocidad y gran variedad que demandan formas innovadoras de procesamiento."
- **NIST (SP 1500-1)**: "Conjuntos de datos cuyas 5 V's (**Volumen, Velocidad, Variedad, Veracidad, Valor**) requieren arquitecturas escalables."

#### B. Arquitecturas de Procesamiento
- *Batch (Lote)*: MapReduce, Apache Spark.
- *Streaming (Tiempo Real)*: Apache Flink, Kafka Streams.
- *Arquitectura Lambda*: Combina procesamiento por lotes (capa Batch precisa) y procesamiento en tiempo real (capa Speed de baja latencia).
- *Arquitectura Kappa*: Elimina la capa batch procesando todo a través de un motor de streaming unificado.

---

### 6.2 Cloud Computing (NIST SP 800-145)

El NIST define Cloud Computing mediante **5 Características Esenciales**:
1. **Autoservicio bajo demanda (On-demand Self-service)**.
2. **Acceso amplio a la red (Broad Network Access)**.
3. **Agrupamiento de recursos (Resource Pooling)**.
4. **Elasticidad rápida (Rapid Elasticity)**.
5. **Servicio medido (Measured Service)**.

**Modelos de Servicio**: IaaS (AWS EC2), PaaS (AWS Elastic Beanstalk), SaaS (Google Workspace).  
**Modelos de Despliegue**: Nube Pública, Privada, Híbrida y Comunitaria.

---

### 6.3 Docker: Virtualización a Nivel de Sistema Operativo

Docker implementa contenedorización ligera aislando procesos directamente sobre el Kernel Linux del host mediante:
- **Namespaces**: Aislamiento de procesos (PID), red (NET), montaje de disco (MNT) y usuarios.
- **Control Groups (cgroups)**: Límite y contabilidad de recursos hardware (CPU, RAM).

A diferencia de las VMs (que requieren Hipervisor y SO Huésped completo), los contenedores comparten el Kernel, logrando arrancar en milisegundos.

---

### 6.4 Kubernetes (K8s): Orquestación Declarativa en Clústeres

Kubernetes automatiza el despliegue, escalado y gestión de contenedores a través de una arquitectura distribuida:

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

- **Control Plane**: `kube-apiserver` (API REST), `etcd` (almacén clave-valor distribuido del estado), `kube-scheduler` y `kube-controller-manager`.
- **Worker Nodes**: `kubelet` (agente de nodo), `kube-proxy` (enrutamiento de red) y Container Runtime.
- **Abstracciones**: Pods, Services (ClusterIP, NodePort, LoadBalancer), Deployments, Ingress.
- **Bucle de Reconciliación (Control Loop)**: Monitoreo constante de `Estado Actual vs Estado Deseado` con auto-sanación (*Self-healing*).

> [!IMPORTANT]
> **Conexión AWS Cloud**: **AWS EKS (Elastic Kubernetes Service)** ofrece un Control Plane de Kubernetes totalmente gestionado por AWS con alta disponibilidad multizona.

---

## 7. CAPÍTULO VI: MATERIAL DIDÁCTICO DE INFRAESTRUCTURA Y PRUEBAS DE CARGA (CARPETA INFORMACION)

Este capítulo sintetiza las guías didácticas y presentaciones PDF/PPTX contenidas en la carpeta `informacion`.

### 7.1 Pruebas de Rendimiento Web con Apache Bench (`ab`)

**Apache Bench** es una herramienta de línea de comandos genérica para realizar pruebas de carga y benchmarking sobre servidores web HTTP.

#### A. Sintaxis y Parámetros
```bash
ab -n 1000 -c 50 http://192.168.1.100/
```
- `-n 1000`: Número total de peticiones HTTP a enviar durante el test.
- `-c 50`: Concurrencia simultánea (50 conexiones abiertas al mismo tiempo).

#### B. Métricas Clave de Salida
- **Requests per second (RPS / Throughput)**: Peticiones completadas por segundo ($\text{RPS} = \text{Total Peticiones} / \text{Tiempo Total}$).
- **Time per request**: Latencia promedio por petición en milisegundos.
- **Percentiles de Latencia**: Distribución del tiempo de respuesta (50%, 95%, 99%). Permite verificar si existen caídas severas bajo estrés.

> [!WARNING]
> Se debe tener especial cuidado al seleccionar los valores de `-c` y `-n` para evitar provocar una denegación de servicio (DoS) involuntaria sobre servidores en producción.

---

### 7.2 Medición de Rendimiento de Red con `iperf` / `iperf3`

`iperf3` es la herramienta estándar para medir el rendimiento máximo de ancho de banda en redes IP (Capa 4: TCP y UDP).

#### A. Arquitectura Cliente-Servidor
- **Modo Servidor**: Escucha peticiones de diagnóstico en el puerto 5201:
  ```bash
  iperf3 -s
  ```
- **Modo Cliente**: Conecta al servidor y realiza la prueba de ancho de banda:
  ```bash
  iperf3 -c 192.168.1.100 -P 4 -t 30
  ```

#### B. Parámetros de Diagnóstico Avanzado
- `-P 4`: Abre **4 hilos TCP paralelos** simultáneos. Es indispensable para saturar enlaces gigabit (1 Gbps+) superando las limitaciones de tamaño de ventana de socket TCP individual.
- `-u`: Conmuta la prueba a protocolo **UDP**.
- `-b 100M`: Define el ancho de banda objetivo para pruebas UDP.
- **Métricas UDP**: Permite medir el **Jitter** (variación en la latencia de llegada) y la **Pérdida de Datagramas (Packet Loss)**.

#### C. Comparativa iperf 2 vs iperf 3
- *iperf 2*: Soporta multicast, múltiples hilos antiguos y compatibilidad con sistemas heredados.
- *iperf 3*: Versión moderna, código limpio, salida en formato JSON (`--json`) y mejor manejo de librerías.

---

### 7.3 Balanceadores de Carga y Monitoreo en Google Cloud Platform (GCP)

#### A. Balanceadores de Carga en GCP
Un balanceador de cargas en la nube distribuye el tráfico entrante de los usuarios entre múltiples instancias backend (VMs o Pods) para evitar cuellos de botella y garantizar alta disponibilidad.

- **Global HTTP(S) Load Balancer**: Proxy de capa 7 accesible mediante **Anycast VIP** global. Enruta el tráfico al grupo de instancias más cercano geográficamente al usuario.
- **Network Load Balancer**: Balanceador regional no-proxy (pass-through) para protocolos de capa 4 (TCP/UDP).

#### B. Monitoreo con Google Cloud Operations (antes Stackdriver)
Servicio integrado que supervisa, registra logs y elabora informes de errores sobre las aplicaciones en GCP. Ofrece métricas en tiempo real sobre el uso de CPU, tasa de errores HTTP y latencia de los balanceadores.

---

### 7.4 Gestor de Despliegue (GCP Deployment Manager) y Marketplace

- **GCP Deployment Manager**: Servicio de **Infraestructura como Código (IaC)** en GCP. Automatiza la creación y aprovisionamiento de recursos (VMs, redes, bases de datos) mediante archivos de configuración declarativos en formato YAML, Jinja2 o Python.
- **GCP Marketplace**: Catálogo de soluciones preconfiguradas de software (ej. InfluxDB, PostgreSQL, Nginx) que se pueden desplegar automáticamente en GCP en pocos clics utilizando plantillas de Deployment Manager.

---

## 8. CAPÍTULO VII: DISEÑO DE INTERFACES (DCU Y GUI)

### 8.1 Diseño Centrado en el Usuario (DCU ISO 9241-210)
Enfoque multidisciplinario que ubica al usuario en el centro del proceso de desarrollo.

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

### 8.2 Interfaz Gráfica de Usuario (GUI) y 10 Heurísticas de Nielsen

La **GUI** abstrae comandos complejos mediante la metáfora **WIMP** (Windows, Icons, Menus, Pointer).

#### Desglose de Componentes:
- **Contenedores**: Ventanas, Modales, Grids responsivos.
- **Widgets**: Botones, Campos de entrada (Inputs), Menús desplegables, Tablas de datos.

#### Las 10 Heurísticas de Jakob Nielsen:
1. Visibilidad del estado del sistema (Feedback).
2. Coincidencia entre el sistema y el mundo real.
3. Control y libertad del usuario (Deshacer/Rehacer).
4. Consistencia y estándares.
5. Prevención de errores.
6. Reconocimiento antes que recuerdo.
7. Flexibilidad y eficiencia de uso.
8. Diseño estético y minimalista.
9. Ayudar a los usuarios a reconocer y diagnosticar errores.
10. Ayuda y documentación.

---

## 9. CAPÍTULO VIII: APRENDIZAJE PROFUNDO, HARDWARE Y VISIÓN POR COMPUTADORA

### 9.1 TensorFlow y Cuantificación INT8 en TF Lite

- **TensorFlow**: Framework open-source basado en grafos acíclicos dirigidos (DAG) de operaciones sobre Tensores (arreglos multidimensionales) con diferenciación automática (`tf.GradientTape`).
- **TensorFlow Lite for Microcontrollers (TinyML)**: Permite ejecutar inferencias en placas Arduino con unos pocos KB de RAM aplicando **Cuantificación Lineal INT8**:
  
  $$r = S \cdot (q - Z)$$
  
  Mapea tensores de 32 bits a enteros de 8 bits, reduciendo el consumo de memoria en un 75% manteniendo una elevada precisión.

---

### 9.2 Composición Física y Anatómica del Arduino Uno R3

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

1. **Microcontrolador Principal**: ATmega328P (AVR 8-bit, 16 MHz).
2. **Memoria**: Flash 32 KB (0.5 KB bootloader), SRAM 2 KB, EEPROM 1 KB.
3. **Pines Digitales (GPIO)**: 14 pines (0 al 13). Incluye 6 pines con **PWM (`~`)** para modulación de ancho de pulso de 8 bits.
4. **Pines Analógicos**: 6 entradas (A0 a A5) conectadas a un **ADC de 10 bits** (resolución de 0 a 1023 para 0-5V).
5. **Convertidor USB-Serial**: Chip ATmega16U2 (o CH340) para comunicación UART.
6. **Alimentación**: Puerto USB (5V) o Jack VIN (7-12V) con reguladores integrados de 5V y 3.3V.

---

### 9.3 OpenCV: Procesamiento de Imágenes, Haar Cascades y Geometría

- **Estructura**: Las imágenes se representan en formato matriz **BGR** (Blue, Green, Red).
- **Aproximación Poligonal**: `cv2.approxPolyDP` implementa el algoritmo Douglas-Peucker sobre contornos para detectar el número de vértices de figuras geométricas (3 para triángulos, 4 para cuadrados).
- **Detección de Rostros**: Algoritmo de Viola-Jones utilizando **Clasificadores en Cascadas de Haar** y la **Imagen Integral $O(1)$**, permitiendo calcular sumas de áreas de píxeles en tiempo constante independientemente del tamaño de la ventana.

---

## 10. CONCLUSIONES Y RECOMENDACIONES TÉCNICAS

1. **Integración Holística**: La arquitectura de TI moderna requiere dominar desde la física de los medios guiados (fibra óptica) hasta la orquestación declarativa de contenedores en la nube (Kubernetes).
2. **Gobernanza y Estándares**: La adopción de CMMI Nivel 3, ISO 27001 e ITIL 4 garantiza la resiliencia operativa y la seguridad en despliegues sobre nubes públicas como AWS y GCP.
3. **Diagnóstico de Red**: El uso sistemático de `ab` para pruebas de carga HTTP e `iperf3` con hilos paralelos (`-P`) y UDP (`-u`) es indispensable antes de pasar cualquier sistema distribuido a entorno de producción.
4. **Optimización Edge**: La combinación de TinyML (TensorFlow Lite INT8) y OpenCV en hardware ligero como Arduino permite procesar datos de visión e IoT directamente en el borde (*Edge Computing*) reduciendo la latencia y los costos de ancho de banda.
