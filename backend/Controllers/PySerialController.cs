using Microsoft.AspNetCore.Mvc;

namespace OIT1_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PySerialController : ControllerBase
    {
        /// <summary>
        /// Pregunta 12: Comunicación Python-Arduino con PySerial
        /// </summary>
        [HttpGet("pyserial-communication")]
        public IActionResult GetPySerialInfo()
        {
            return Ok(new
            {
                question = "Comunicación eficiente Python-Arduino con PySerial",
                installation = "pip install pyserial",
                configuration = new
                {
                    code = @"
import serial
import time

# Configurar conexión
arduino = serial.Serial(
    port='COM3',        # Puerto (Windows) o '/dev/ttyUSB0' (Linux)
    baudrate=9600,      # Velocidad de comunicación
    timeout=1,          # Tiempo de espera en segundos
    bytesize=8,         # Bits de datos
    parity='N',         # Sin paridad
    stopbits=1          # Bits de parada
)
time.sleep(2)  # Esperar inicialización del Arduino"
                },
                send_data = new
                {
                    description = "Enviar datos desde Python a Arduino",
                    code = @"
# Enviar comando '1'
arduino.write(b'1\n')  # bytes con newline

# Enviar string convertido
comando = 'LED_ON'
arduino.write(comando.encode())

# Enviar múltiples datos
datos = '25.5,60.2,1013'
arduino.write(datos.encode())"
                },
                receive_data = new
                {
                    description = "Recibir datos desde Arduino",
                    code = @"
# Leer un dato
if arduino.in_waiting > 0:
    data = arduino.readline().decode().strip()
    print(f'Recibido: {data}')

# Leer continuamente
while True:
    if arduino.in_waiting:
        data = arduino.readline().decode().strip()
        if data:
            temperatura = float(data)
            print(f'Temperatura: {temperatura}°C')
    time.sleep(0.1)"
                },
                bidirectional = new
                {
                    description = "Comunicación bidireccional completa",
                    code = @"
# Python envía comando y espera respuesta
def send_and_receive(command):
    arduino.write(command.encode())
    time.sleep(0.5)  # Esperar procesamiento
    if arduino.in_waiting:
        response = arduino.readline().decode().strip()
        return response
    return None

# Ejemplo
respuesta = send_and_receive('READ_TEMP')
print(f'Respuesta del Arduino: {respuesta}')"
                },
                error_handling = new
                {
                    description = "Manejo de errores",
                    code = @"
try:
    arduino = serial.Serial('COM3', 9600, timeout=1)
except serial.SerialException as e:
    print(f'Error de conexión: {e}')
except Exception as e:
    print(f'Error: {e}')
finally:
    if 'arduino' in locals():
        arduino.close()  # Cerrar conexión"
                },
                arduino_code = @"
void setup() {
    Serial.begin(9600);
    pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
    // Leer comandos de Python
    if (Serial.available() > 0) {
        char command = Serial.read();
        
        // Procesar comando
        if (command == '1') {
            digitalWrite(LED_BUILTIN, HIGH);
            Serial.println('LED_ON');
        } else if (command == '0') {
            digitalWrite(LED_BUILTIN, LOW);
            Serial.println('LED_OFF');
        }
    }
    
    // Enviar datos a Python
    int sensor = analogRead(A0);
    float voltage = sensor * (5.0 / 1023.0);
    float temperature = voltage * 100.0;
    Serial.println(temperature);
    
    delay(100);
}"
            });
        }
    }
}
