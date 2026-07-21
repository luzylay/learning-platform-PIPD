# GUÍA DE ESTUDIO OFICIAL: OPERACIONES E INFRAESTRUCTURA TECNOLÓGICA (OIT 1)

Esta guía contiene la fundamentación teórica, fórmulas matemáticas, flujos de extremo a extremo (E2E) y buenas prácticas de la industria requeridas para el examen de OIT 1. Está estructurada para ser impresa directamente o exportada a PDF/Word.

---

## ÍNDICE DE TEMAS
1. **Física Cuántica y Medios Físicos** (Cúbits, Fibra Óptica de Sílice vs Vidrio)
2. **Modelos Mentales y SDLC** (UX/UI y Ciclo de Vida del Software)
3. **Big Data y Cloud Computing** (5 Vs, Teorema CAP, IaaS/PaaS/SaaS, Docker y Kubernetes)
4. **Diseño Centrado en el Usuario (DCU)** (ISO 9241-210 y Heurísticas de Nielsen)
5. **Inteligencia Artificial y TinyML** (Redes Neuronales, OpenCV, approxPolyDP y TensorFlow Lite)
6. **SciPy y Procesamiento de Señales** (FFT, Identidad de Euler y Filtro Butterworth)
7. **Pandas y Comunicación Serial** (SIMD, PySerial, time.sleep(2) por DTR y Matplotlib plt.ion)
8. **Visión Artificial Integrada** (Clasificador Haar Cascade e Imagen Integral O(1))
9. **Guía Rápida de Puertos e Instrucciones Nmap** (45+ Puertos y Protocolos)

---

## 1. FÍSICA CUÁNTICA Y MEDIOS FÍSICOS

### Fundamentos desde Cero
- **Bit Clásico**: Sistema digital binario basado en transistores físicos que operan en dos estados mutuamente excluyentes: corte (0) o saturación (1).
- **Cúbit (Bit Cuántico)**: Unidad de información cuántica que puede representar ambos estados (0 y 1) de forma simultánea gracias al principio físico de **Superposición**.
- **Notación de Dirac (Bra-Ket)**: Representación de vectores en espacios complejos. `|ψ⟩` (Ket psi) representa el vector de estado cuántico. Los estados básicos ortonormales son:
  $$|0\rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \quad |1\rangle = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$$
- **Espacio de Hilbert ($\mathbb{H}^2$)**: Espacio geométrico bidimensional sobre el cuerpo de los números complejos ($\mathbb{C}$) donde habitan los vectores de estado de los cúbits.

### Ecuaciones Matemáticas
- **Ecuación de Estado**:
  $$|ψ\rangle = \alpha|0\rangle + \beta|1\rangle \quad (\alpha, \beta \in \mathbb{C})$$
- **Regla de Born e Hipótesis de Normalización**: Al medir físicamente el cúbit, la superposición colapsa. La probabilidad de obtener el estado clásico 0 es $|\alpha|^2$ y el estado 1 es $|\beta|^2$. La probabilidad total debe sumar el 100%:
  $$|\alpha|^2 + |\beta|^2 = 1$$
- **Entrelazamiento Cuántico**: Fenómeno donde dos partículas correlacionan sus estados físicos de forma que no pueden describirse por separado mediante un producto tensorial:
  $$|ψ\rangle_{AB} \neq |ψ\rangle_A \otimes |ψ\rangle_B$$

### Fibra Óptica de Sílice vs Vidrio Común
- **Reflexión Total Interna (TIR)**: Principio que guía los fotones de luz dentro de la fibra. Ocurre cuando la luz viaja de un núcleo con alto índice de refracción ($n_1$) hacia un revestimiento con menor índice ($n_2$) bajo un ángulo superior al **Ángulo Crítico** ($\theta_c$):
  $$\theta_c = \arcsin\left(\frac{n_2}{n_1}\right) \quad (\text{Derivado de la Ley de Snell: } n_1 \sin\theta_1 = n_2 \sin\theta_2)$$
- **Atenuación Óptica**: Pérdida de potencia de la señal expresada en decibelios por kilómetro:
  $$A \text{ (dB/km)} = \frac{10}{L} \log_{10}\left(\frac{P_{\text{entrada}}}{P_{\text{salida}}}\right)$$
- **Diferencia de Materiales**:
  - **Sílice Purificada ($SiO_2$)**: Libre de metales e impurezas. Su atenuación es ultra baja (apox. **0.2 dB/km** a 1550 nm), lo que reduce la **Dispersión de Rayleigh** y permite enlaces de larga distancia sin repetidores.
  - **Vidrio Convencional**: Posee microburbujas de aire e impurezas de hierro ($Fe^{2+}$) que provocan alta dispersión, atenuando la luz por completo en pocos metros.

### Flujo Extremo a Extremo (E2E)
```
[Láser Emisor 1550nm] ➔ [Modulador Mach-Zehnder] ➔ [Fibra Sílice Monomodo] ➔ [Fotodetector PIN/APD] ➔ [Servidor]
```

### Buenas Prácticas y Terminología
- **Optical Link Budget**: Calcular la pérdida total acumulada de la infraestructura ($A_{\text{total}} = \alpha L + N \cdot L_{\text{empalme}} + M \cdot L_{\text{conector}}$) asegurando un margen de reserva mayor a +3 dB.
- **Dispersión Cromática vs Modal**: La cromática se debe a diferencias de velocidad por la longitud de onda; la modal ocurre en fibras multimodo por diferencias de camino geométrico.

---

## 2. MODELOS MENTALES Y SDLC

### Fundamentos desde Cero
- **Modelo Mental**: El mapa mental conceptual y subjetivo que un usuario crea sobre cómo funciona un software en base a su experiencia previa.
- **Golfos de Donald Norman**:
  - **Golfo de Ejecución**: Brecha entre la intención de acción del usuario y las acciones que la interfaz le permite realizar físicamente.
  - **Golfo de Evaluación**: Brecha entre la respuesta visual del sistema y la comprensión del usuario sobre el nuevo estado del software.

### Características del Modelo Mental
1. **Subjetivo**: Difiere por persona según su contexto, edad y antecedentes tecnológicos.
2. **Dinámico**: Se transforma, refina y actualiza mediante la interacción repetida y el feedback.
3. **Simplificador**: Elimina la complejidad del código (bases de datos, APIs) convirtiéndola en analogías funcionales directas.

### Ciclo de Vida del Desarrollo de Software (SDLC)
Consta de 7 etapas organizadas: 1. Planificación, 2. Análisis, 3. Diseño, 4. Implementación (Codificación), 5. Pruebas, 6. Despliegue, 7. Mantenimiento.

#### Fase de Diseño de GUI: Wireframes vs Prototipos
- **Wireframe**: Esquema visual plano, estático y de baja fidelidad. Define la estructura de contenidos sin usar colores, imágenes o tipografías.
- **Prototipo Interactivo**: Maqueta clicable que emula la interacción del software. Permite simular los flujos de usuario para aplicar **Pruebas de Usabilidad** con operarios reales antes de programar el backend.

### Flujo Extremo a Extremo (E2E)
```
[User Research] ➔ [Especificación ISO 9241-210] ➔ [Wireframes] ➔ [Prototipo Clicable] ➔ [Pruebas Usabilidad] ➔ [Código Angular]
```

### Buenas Prácticas y Terminología
- **Pruebas con Usuarios**: Evaluar los prototipos interactivos con al menos 5 usuarios reduce el 85% de los problemas de usabilidad, evitando costes de refactorización tardía.
- **Diferencia**: *Wireframe* (estructural estático) vs *Mockup* (diseño visual estático) vs *Prototipo* (interactivo dinámico).

---

## 3. BIG DATA Y CLOUD COMPUTING

### Fundamentos desde Cero
- **Big Data**: Conjunto de tecnologías orientadas a procesar datos masivos que superan la memoria RAM y procesador de un servidor único.
- **Teorema CAP (Brewer)**: Postulado de sistemas distribuidos que indica que ante una partición de red (P), solo es posible garantizar simultáneamente dos de tres propiedades:
  - **Consistencia (C)**: Todos los nodos leen el mismo dato idéntico.
  - **Disponibilidad (A)**: Cada petición recibe respuesta no errónea.
  - **Tolerancia a Particiones (P)**: El sistema sigue operando pese a fallas de red entre nodos.

### Las "5 V" del Big Data
1. **Volumen**: Escala y tamaño masivo de datos (Petabytes, Exabytes).
2. **Velocidad**: Generación y procesamiento en tiempo real (streaming).
3. **Variedad**: Multiplicidad de formatos (estructurados, semiestructurados JSON, no estructurados).
4. **Veracidad**: Limpieza, confiabilidad y calidad de la fuente.
5. **Valor**: Insights accionables que aportan valor monetario o de decisión.

### Cloud Computing: Modelos de Servicio
- **IaaS (Infraestructura)**: Alquiler de hardware virtual (CPU, almacenamiento, red). El usuario instala el SO y app. *Ejemplo: AWS EC2, Azure VMs.*
- **PaaS (Plataforma)**: Entorno gestionado (runtime y SO listos). El usuario solo despliega su código. *Ejemplo: Heroku, AWS Elastic Beanstalk.*
- **SaaS (Software)**: Software completo listo para su consumo vía navegador web. *Ejemplo: Gmail, Microsoft 365.*

### Virtualización: Docker vs Máquinas Virtuales
- **Máquina Virtual**: Corre sobre un hipervisor que emula hardware independiente, obligando a cada instancia a cargar un SO completo (lento, alto consumo de RAM).
- **Contenedor Docker**: Virtualiza a nivel de SO, compartiendo el mismo Kernel de la máquina anfitriona. Es extremadamente liviano e inicia en milisegundos.
- **Kubernetes (K8s)**: Orquestador distribuido que administra contenedores Docker. Ofrece escalado automático, balanceo de carga y autorrecuperación (*auto-healing*).

### Flujo Extremo a Extremo (E2E)
```
[Sensores IoT] ➔ [Ingesta Kafka] ➔ [Almacén AWS S3] ➔ [Procesamiento Spark] ➔ [Redshift Warehouse] ➔ [Instancia EC2 (IaaS)]
```

---

## 4. DISEÑO CENTRADO EN EL USUARIO (DCU)

### Fundamentos desde Cero
- **Diseño Centrado en el Usuario (DCU)**: Enfoque de ingeniería iterativo centrado en la usabilidad del software para resolver las necesidades, limitaciones y comportamientos de los operarios. Regulado por la norma **ISO 9241-210**.

### Fases del Proceso Iterativo (ISO 9241-210)
1. **Entender y especificar el contexto de uso**: Investigar quién usará el sistema y bajo qué condiciones de entorno.
2. **Especificar los requisitos del usuario**: Definir los objetivos concretos de eficiencia.
3. **Producir soluciones de diseño**: Crear los wireframes y prototipos clicables.
4. **Evaluar los diseños frente a los requisitos**: Realizar pruebas de usabilidad y evaluaciones heurísticas. Si no cumple, se repite el ciclo.

### Heurísticas de Jakob Nielsen
Son principios heurísticos para la evaluación cualitativa de interfaces:
1. **Visibilidad del estado del sistema**: Mantener informado al usuario con feedback visual (ej. indicadores de SignalR, spinners de carga).
2. **Prevención de errores**: Evitar que el usuario cometa errores de forma proactiva (ej. deshabilitar botones de envío si faltan campos).
3. **Control y libertad del usuario**: Salidas de emergencia obvias, como botones de deshacer, rehacer o cancelar operaciones.
4. **Consistencia y estándares**: Respetar patrones de iconos y layouts universales.

### Flujo Extremo a Extremo (E2E)
```
[Fase 1: Contexto de Uso] ➔ [Fase 2: Requisitos] ➔ [Fase 3: Prototipado] ➔ [Fase 4: Evaluación Heurística] ➔ [GUI Angular]
```

---

## 5. INTELIGENCIA ARTIFICIAL Y TinyML

### Fundamentos desde Cero
- **Perceptrón**: Unidad básica de una red neuronal que simula una neurona biológica. Realiza una suma ponderada de entradas ($x_i$), pesos ($w_i$) y un sesgo ($b$):
  $$z = \sum (w_i \cdot x_i) + b$$
- **Función de Activación**: Añade no-linealidad al modelo para resolver problemas complejos. La más común en capas ocultas es **ReLU**:
  $$f(x) = \max(0, x)$$
- **Retropropagación (Backpropagation)**: Algoritmo de optimización que calcula las derivadas parciales de la función de coste con respecto a cada peso usando la **Regla de la Cadena** matemática para ajustar los parámetros de la red.

### TinyML y TensorFlow Lite
- **Desafío**: Las placas embebidas como Arduino poseen recursos de memoria sumamente restringidos (SRAM < 256 KB, Flash < 1 MB).
- **Cuantificación Lineal (INT8)**: Proceso de compresión que mapea números flotantes continuos de 32 bits (`float32`) a enteros discretos de 8 bits (`int8` entre -128 y 127). Esto reduce en un 75% el tamaño del modelo y acelera los cálculos en microcontroladores sin FPU rápido:
  $$r = S \cdot (q - Z)$$
  *Donde $r$ es el valor real float32, $q$ el entero cuantizado, $S$ la escala y $Z$ el punto cero.*

### Visión Artificial: cv2.approxPolyDP en OpenCV
Para clasificar formas geométricas en un flujo de cámara web con OpenCV, se extraen contornos (`cv2.findContours`) y se realiza una aproximación poligonal mediante el algoritmo de **Ramer-Douglas-Peucker** (`cv2.approxPolyDP`):
- **Ecuación de Tolerancia ($\epsilon$)**:
  $$\epsilon = 0.04 \times \text{arcLength}(\text{contorno}, \text{True})$$
- **Clasificación por número de vértices de la aproximación**:
  - **3 vértices**: Triángulo (Arduino enciende LED Verde).
  - **4 vértices**: Cuadrado / Rectángulo (Arduino enciende LED Azul).
  - **>6 vértices**: Círculo (Arduino enciende LED Rojo).

### Flujo Extremo a Extremo (E2E)
```
[Cámara Embebida] ➔ [OpenCV Gris/Filtro] ➔ [approxPolyDP (Vértices)] ➔ [Inferencia TF Lite INT8] ➔ [PySerial] ➔ [Arduino (LEDs)]
```

---

## 6. SciPy Y PROCESAMIENTO DE SEÑALES

### Fundamentos desde Cero
- **Dominio del Tiempo**: Representación de la señal que muestra la amplitud de voltaje respecto al tiempo.
- **Dominio de la Frecuencia**: Representación espectral que descompone la señal en tonos sinusoidales individuales expresados en Hercios (Hz).

### Ecuaciones Matemáticas
- **Transformada Discreta de Fourier (DFT)**:
  $$X[k] = \sum_{n=0}^{N-1} x[n] \cdot e^{-i \frac{2\pi}{N} k n}$$
- **Identidad de Euler**: Convierte la exponencial compleja de Fourier en componentes trigonométricos reales e imaginarios:
  $$e^{-i\theta} = \cos\theta - i\sin\theta$$
- **Algoritmo FFT (Fast Fourier Transform)**: SciPy implementa esta optimización dividiendo recursivamente la señal en partes pares e impares, reduciendo el coste computacional de $O(N^2)$ a **$O(N \log N)$**, permitiendo análisis en tiempo real.

### Filtro Pasa-Bajos Butterworth
- **Función de Transferencia (Magnitud)**: Ofrece una respuesta máximamente plana en la banda de paso útil sin oscilaciones ni distorsiones:
  $$|H(\omega)|^2 = \frac{1}{1 + \left(\frac{\omega}{\omega_c}\right)^{2n}}$$
  *Donde $\omega_c$ es la frecuencia de corte y $n$ el orden del filtro.*
- **Frecuencia de Nyquist ($f_{\text{nyquist}}$)**: Límite teórico de muestreo. Equivale a la mitad de la frecuencia de muestreo física ($f_s$):
  $$f_{\text{nyquist}} = \frac{f_s}{2}$$
- **Normalización**: Frecuencia de corte normalizada obligatoria para SciPy:
  $$\omega_{\text{norm}} = \frac{f_{\text{corte}}}{f_{\text{nyquist}}}$$
- **Código en SciPy**:
  ```python
  b, a = scipy.signal.butter(4, norm, btype='low')
  señal_limpia = scipy.signal.filtfilt(b, a, señal_ruidosa) # Cero fase
  ```

### Buenas Prácticas y Terminología
- **Teorema de Nyquist-Shannon**: La frecuencia de muestreo de captura debe ser mayor o igual al doble de la frecuencia máxima de la señal analógica ($f_s \ge 2 f_{\text{max}}$) para evitar el solapamiento destructivo de frecuencia (**Aliasing**).

---

## 7. PANDAS Y COMUNICACIÓN SERIAL

### Fundamentos desde Cero
- **Pandas DataFrame**: Estructura de datos bidimensional indexada. Almacena las columnas en bloques contiguos de memoria de NumPy compilados en C.
- **Vectorización SIMD (Single Instruction Multiple Data)**: Técnica de hardware que permite aplicar una sola operación matemática (ej. suma, media) sobre un vector completo de datos en un solo ciclo de CPU, evitando bucles `for` lentos en Python.

### Comunicación Física y DTR Auto-Reset
Al abrir la comunicación serial en Python mediante `serial.Serial('COM3', 9600)`:
1. La línea de control de hardware **DTR (Data Terminal Ready)** conmuta su estado lógico.
2. Esto gatilla eléctricamente el pin de reset del microcontrolador **ATmega328P** en la placa Arduino, provocando un **Auto-Reset**.
3. **Solución crítica**: Se debe llamar obligatoriamente a `time.sleep(2)` en Python inmediatamente después de instanciar el puerto para esperar que el bootloader inicie y corra la función `setup()`; de lo contrario, los comandos iniciales se perderán por completo.

### Modo Interactivo de Matplotlib (plt.ion)
Para graficar variables dinámicas de sensores seriales sin congelar el programa, se activa el modo interactivo:
- **`plt.ion()`**: Activa la actualización de gráficos interactiva en tiempo real.
- **`ax.clear()`**: Borra los trazos anteriores para evitar superposición.
- **`plt.pause(0.1)`**: Pausa brevemente el bucle de Python procesando los eventos internos de la ventana gráfica (GUI) de forma no bloqueante.

---

## 8. VISIÓN ARTIFICIAL INTEGRADA

### Fundamentos desde Cero
- **Clasificador Haar Cascade (Viola-Jones)**: Algoritmo de detección de objetos en tiempo real que evalúa diferencias de intensidad en regiones rectangulares de la imagen (rasgos de Haar).

### Optimización Matemática
- **Imagen Integral ($II$)**: Matriz acumulada que almacena la suma de los valores de píxeles situados arriba y a la izquierda de cada coordenada $(x, y)$:
  $$II(x, y) = \sum_{x' \le x, y' \le y} I(x', y')$$
- **Suma en Tiempo Constante $O(1)$**: Gracias a la imagen integral, la suma de cualquier rectángulo ABCD se calcula instantáneamente con solo 4 accesos a memoria en la CPU:
  $$\text{Suma} = II(D) + II(A) - II(B) - II(C)$$
  Esto permite evaluar miles de subventanas de video en tiempo de ejecución constante **$O(1)$** sin importar el tamaño del rectángulo.
- **Cascada de Rechazo**: Filtro jerárquico optimizado por AdaBoost que evalúa rasgos simples en las primeras capas. Si una región falla, se descarta rápidamente, reservando el procesamiento de capas complejas solo para regiones candidatas a rostro.

---

## 9. GUÍA RÁPIDA DE PUERTOS E INSTRUCCIONES NMAP

### Cabeceras OSI Capa 4
- **TCP (Transmission Control Protocol)**: Orientado a conexión, confiable, asegura entrega y orden con control de flujo. Cabecera pesada de **20 bytes**.
- **UDP (User Datagram Protocol)**: No orientado a conexión, veloz, cabecera ligera de **8 bytes**. Sin confirmación de recepción ni control de flujo.

### 3-Way Handshake (TCP)
1. **SYN**: Cliente envía petición de sincronización al servidor.
2. **SYN-ACK**: Servidor responde confirmando y sincronizando.
3. **ACK**: Cliente confirma la conexión. Canal establecido.

### Directorio de Puertos Esenciales
- **20/21**: FTP (Data/Control)
- **22**: SSH / SFTP (Acceso remoto seguro)
- **23**: Telnet (Acceso remoto inseguro - texto plano)
- **25**: SMTP (Envío de correo electrónico)
- **53**: DNS (Resolución de nombres a IPs - TCP/UDP)
- **67/68**: DHCP (Asignación de direccionamiento IP - UDP)
- **69**: TFTP (Trivial FTP - UDP sin autenticación)
- **80**: HTTP (Tránsito web sin cifrar)
- **110**: POP3 (Descarga de correos)
- **123**: NTP (Sincronización horaria de servidores - UDP)
- **143**: IMAP (Lectura de buzones de correo)
- **161/162**: SNMP (Monitoreo y trampas de red - UDP)
- **443**: HTTPS (Navegación cifrada segura TLS)
- **445**: SMB (Acceso compartido de archivos en red corporativa)
- **500/4500**: IPsec/ISAKMP (Túneles VPN seguros)
- **1433**: MSSQL (Base de datos relacional Microsoft)
- **1521**: Oracle DB (Base de datos relacional corporativa)
- **2375/2376**: Docker Engine REST API (Control remoto de contenedores)
- **3306**: MySQL (Base de datos de código abierto)
- **3389**: RDP (Escritorio remoto de Windows Server)
- **5432**: PostgreSQL (Base de datos relacional avanzada)
- **5672**: RabbitMQ AMQP Broker (Colas de mensajería distribuida)
- **6379**: Redis Cache (Almacenamiento en caché en memoria RAM)
- **6443**: Kubernetes API Server (Puerto de administración de clústeres K8s)
- **8080**: HTTP Alternativo (Servidores web como Jenkins o Tomcat)
- **9092**: Apache Kafka Broker (Event streaming masivo)
- **9200**: Elasticsearch (Indexador NoSQL RESTful)
- **27017**: MongoDB (Base de datos NoSQL documental BSON)

### Comandos Clave de Nmap
- **SYN Scan (Escaneo SYN - Sigiloso)**:
  `nmap -sS -T4 target_ip`
- **UDP Scan (Escaneo de puertos UDP)**:
  `nmap -sU target_ip`
- **Escaneo Agresivo (Detección de OS, servicios y scripts)**:
  `nmap -A target_ip`
- **Detección de Versiones específicas**:
  `nmap -sV target_ip`
- **Escaneo de los 100 puertos TCP principales**:
  `nmap --top-ports 100 target_ip`
- **Auditoría de Vulnerabilidades**:
  `nmap --script vuln target_ip`
