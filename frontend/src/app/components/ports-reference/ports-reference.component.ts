import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface NetworkPort {
  number: number;
  protocol: 'TCP' | 'UDP' | 'TCP/UDP';
  name: string;
  category: 'Core' | 'Web' | 'Database' | 'Security/Admin' | 'Dynamic';
  description: string;
  cvContext: string;
}

@Component({
  selector: 'app-ports-reference',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ports-reference.component.html',
  styleUrl: './ports-reference.component.css'
})
export class PortsReferenceComponent {
  searchQuery = '';
  selectedCategory = 'All';

  // Nmap Simulator states
  scanTarget = '192.168.1.100';
  scanType = '-sS';
  isScanning = false;
  scanLogs: string[] = [];

  portsList: NetworkPort[] = [
    // Core Ports
    { number: 20, protocol: 'TCP', name: 'FTP-Data', category: 'Core', description: 'Transferencia de datos en File Transfer Protocol.', cvContext: 'Históricamente usado en banca para transferencias de archivos por lotes (reemplazado por SFTP).' },
    { number: 21, protocol: 'TCP', name: 'FTP-Control', category: 'Core', description: 'Canal de control para File Transfer Protocol (comandos).', cvContext: 'Requiere cifrado SSL/TLS para cumplir regulaciones de seguridad financiera.' },
    { number: 22, protocol: 'TCP', name: 'SSH / SFTP', category: 'Core', description: 'Secure Shell para administración remota y SFTP para transferencia cifrada.', cvContext: 'Gestión segura de instancias AWS EC2 y transferencia de reportes transaccionales.' },
    { number: 23, protocol: 'TCP', name: 'Telnet', category: 'Core', description: 'Acceso a consola remota sin cifrar (inseguro).', cvContext: 'Generalmente deshabilitado en infraestructura bancaria moderna debido a vulnerabilidades de texto plano.' },
    { number: 25, protocol: 'TCP', name: 'SMTP', category: 'Core', description: 'Simple Mail Transfer Protocol para envío de correos.', cvContext: 'Configurado con cifrado STARTTLS en servidores de notificaciones transaccionales.' },
    { number: 53, protocol: 'TCP/UDP', name: 'DNS', category: 'Core', description: 'Domain Name System. Mapea nombres de dominio a IPs.', cvContext: 'Configuración en AWS Route 53 e infraestructura de red híbrida corporativa.' },
    { number: 67, protocol: 'UDP', name: 'DHCP Server', category: 'Core', description: 'Asignación dinámica de direcciones IP a clientes.', cvContext: 'Administrado en enrutadores corporativos de sucursales bancarias.' },
    { number: 68, protocol: 'UDP', name: 'DHCP Client', category: 'Core', description: 'Puerto cliente para recibir parámetros de red DHCP.', cvContext: 'Configurado en endpoints y estaciones de trabajo de oficinas.' },
    { number: 69, protocol: 'UDP', name: 'TFTP', category: 'Core', description: 'Trivial FTP. Transferencia simple sin autenticación.', cvContext: 'Carga de firmwares e imágenes de arranque inicial PXE en redes internas.' },
    { number: 80, protocol: 'TCP', name: 'HTTP', category: 'Web', description: 'Hypertext Transfer Protocol sin cifrar.', cvContext: 'Redireccionado automáticamente a HTTPS (443) mediante políticas ALB de AWS.' },
    { number: 110, protocol: 'TCP', name: 'POP3', category: 'Core', description: 'Post Office Protocol v3. Descarga correos localmente.', cvContext: 'Protocolo de recepción tradicional heredado.' },
    { number: 111, protocol: 'TCP/UDP', name: 'RPCBind', category: 'Core', description: 'Portmapper para mapeo de llamadas a procedimientos remotos (RPC).', cvContext: 'Común en montajes de almacenamiento de archivos compartidos NFS.' },
    { number: 123, protocol: 'UDP', name: 'NTP', category: 'Core', description: 'Network Time Protocol. Sincronización horaria.', cvContext: 'Crítico en auditorías bancarias para mantener relojes sincronizados en logs transaccionales.' },
    { number: 135, protocol: 'TCP/UDP', name: 'MSRPC', category: 'Core', description: 'Microsoft RPC Endpoint Mapper.', cvContext: 'Usado en entornos Active Directory corporativos de Windows Server.' },
    { number: 137, protocol: 'TCP/UDP', name: 'NetBIOS-NS', category: 'Core', description: 'NetBIOS Name Service para resolución de nombres Windows.', cvContext: 'Protocolo antiguo expuesto a escaneos en redes LAN heredadas.' },
    { number: 138, protocol: 'UDP', name: 'NetBIOS-DGM', category: 'Core', description: 'NetBIOS Datagram Service.', cvContext: 'Utilizado para la transmisión de datos en redes Samba / CIFS.' },
    { number: 139, protocol: 'TCP', name: 'NetBIOS-SSN', category: 'Core', description: 'NetBIOS Session Service.', cvContext: 'Acceso compartido a archivos e impresoras antes de SMB directo.' },
    { number: 143, protocol: 'TCP', name: 'IMAP', category: 'Core', description: 'Internet Message Access Protocol para lectura de correos.', cvContext: 'Reemplazado por IMAPS (993) para asegurar la privacidad del buzón.' },
    { number: 161, protocol: 'UDP', name: 'SNMP', category: 'Core', description: 'Simple Network Management Protocol para monitoreo de hardware.', cvContext: 'Utilizado por herramientas de monitoreo (AWS CloudWatch agent/Zabbix).' },
    { number: 162, protocol: 'UDP', name: 'SNMP-Trap', category: 'Core', description: 'Recepción de alertas automáticas SNMP.', cvContext: 'Monitoreo de caídas en switches de core bancario.' },
    { number: 443, protocol: 'TCP', name: 'HTTPS', category: 'Web', description: 'Hypertext Transfer Protocol Secure (cifrado SSL/TLS).', cvContext: 'Puerto primario de acceso a la banca móvil y APIs transaccionales seguras.' },
    { number: 445, protocol: 'TCP', name: 'SMB over TCP', category: 'Core', description: 'Server Message Block para compartir archivos de Microsoft.', cvContext: 'Montaje de discos virtuales AD y vulnerado históricamente por EternalBlue.' },
    { number: 500, protocol: 'UDP', name: 'ISAKMP (VPN)', category: 'Core', description: 'Internet Security Association and Key Management Protocol para IPsec.', cvContext: 'Establecimiento de túneles VPN híbridos sitio a sitio entre AWS y el datacenter físico.' },
    { number: 514, protocol: 'UDP', name: 'Syslog', category: 'Core', description: 'Envío de registros y logs del sistema a un colector.', cvContext: 'Centralización de auditoría de seguridad en herramientas SIEM.' },
    { number: 520, protocol: 'UDP', name: 'RIP', category: 'Core', description: 'Routing Information Protocol. Enrutamiento dinámico antiguo.', cvContext: 'Usado en entornos educativos e infraestructura legacy.' },
    { number: 631, protocol: 'TCP/UDP', name: 'IPP', category: 'Core', description: 'Internet Printing Protocol para servidores de impresión.', cvContext: 'Gestión centralizada de colas de impresión en sucursales.' },
    { number: 993, protocol: 'TCP', name: 'IMAPS', category: 'Core', description: 'IMAP con túnel SSL/TLS seguro.', cvContext: 'Estándar moderno para acceso a correo electrónico corporativo.' },
    { number: 995, protocol: 'TCP', name: 'POP3S', category: 'Core', description: 'POP3 con túnel SSL/TLS seguro.', cvContext: 'Descarga segura de correos cifrados.' },
    { number: 1434, protocol: 'UDP', name: 'MSSQL Monitor', category: 'Database', description: 'Puerto de consulta del monitor de Microsoft SQL Server.', cvContext: 'Identificación de instancias con nombres de bases de datos MSSQL.' },
    { number: 1723, protocol: 'TCP/UDP', name: 'PPTP', category: 'Core', description: 'Point-to-Point Tunneling Protocol para VPNs antiguas.', cvContext: 'Heredado e inseguro para estándares financieros modernos.' },
    { number: 1900, protocol: 'UDP', name: 'UPnP', category: 'Core', description: 'Universal Plug and Play para autodescubrimiento.', cvContext: 'Bloqueado en firewalls bancarios para mitigar ataques DDoS reflexivos.' },
    { number: 3306, protocol: 'TCP', name: 'MySQL', category: 'Database', description: 'Motor de base de datos relacional de código abierto.', cvContext: 'Migración y soporte en AWS RDS MySQL con réplicas de lectura.' },
    { number: 3389, protocol: 'TCP', name: 'RDP', category: 'Security/Admin', description: 'Remote Desktop Protocol de Microsoft.', cvContext: 'Acceso a servidores de salto (Bastion hosts) de Windows mediante AWS Systems Manager.' },
    { number: 4500, protocol: 'UDP', name: 'IPsec NAT-T', category: 'Core', description: 'NAT Traversal para túneles VPN IPsec en redes protegidas.', cvContext: 'Conexiones seguras de clientes remotos corporativos.' },
    { number: 5900, protocol: 'TCP', name: 'VNC', category: 'Security/Admin', description: 'Virtual Network Computing para compartición de escritorio.', cvContext: 'Reemplazado por herramientas auditadas con MFA en datacenters.' },
    { number: 8080, protocol: 'TCP', name: 'HTTP-Alt', category: 'Web', description: 'Puerto alternativo para servidores web y proxies.', cvContext: 'Apache Tomcat, Node.js y Jenkins corren por defecto en este puerto.' },
    { number: 49152, protocol: 'TCP/UDP', name: 'Dynamic Start', category: 'Dynamic', description: 'Inicio de la lista de puertos efímeros/dinámicos del sistema.', cvContext: 'Reservado para conexiones salientes dinámicas cliente-servidor.' },
    
    // Additional Web & DB Ports
    { number: 3000, protocol: 'TCP', name: 'React / Node', category: 'Web', description: 'Puerto común de desarrollo para frameworks JS frontend.', cvContext: 'Entorno local de maquetación y prototipado rápido.' },
    { number: 5000, protocol: 'TCP', name: 'ASP.NET API', category: 'Web', description: 'Puerto por defecto de lanzamiento local para Web APIs de .NET.', cvContext: 'Establecido como puerto por defecto para nuestra API local OIT-1.' },
    { number: 8000, protocol: 'TCP', name: 'FastAPI / Django', category: 'Web', description: 'Puerto de desarrollo por defecto para servicios web Python.', cvContext: 'Puerto que asignamos a nuestro microservicio FastAPI local.' },
    { number: 5432, protocol: 'TCP', name: 'PostgreSQL', category: 'Database', description: 'Base de datos relacional avanzada de código abierto.', cvContext: 'Usado en AWS Aurora RDS PostgreSQL para persistencia transaccional y examen OIT-1.' },
    { number: 6379, protocol: 'TCP', name: 'Redis', category: 'Database', description: 'Almacén de datos en memoria en caché de alto rendimiento.', cvContext: 'Utilizado para almacenar sesiones y reducir latencias vía AWS ElastiCache.' }
  ];

  get filteredPorts(): NetworkPort[] {
    return this.portsList.filter(port => {
      const matchesSearch = port.number.toString().includes(this.searchQuery) ||
                            port.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            port.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            port.cvContext.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesCategory = this.selectedCategory === 'All' || port.category === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  // ============================================
  // NMAP PORT SCANNER SIMULATION
  // ============================================
  runSimulatedScan() {
    this.isScanning = true;
    this.scanLogs = [];
    
    this.log(`Iniciando Nmap 7.94 ( https://nmap.org ) en ${new Date().toISOString().split('T')[0]}`);
    this.log(`Comando: nmap ${this.scanType} -T4 ${this.scanTarget}`);
    
    // Phase 1: Host discovery
    setTimeout(() => {
      this.log(`Escaneando host ${this.scanTarget} (Descubriendo puertos abiertos)...`);
    }, 600);

    // Phase 2: Listing scan results
    setTimeout(() => {
      this.log(`Host ${this.scanTarget} está activo (latencia de 0.0042s).`);
      this.log(`Not shown: 995 closed ports (reset)`);
      this.log(`PORT     STATE SERVICE      REASON`);

      // Determine open ports based on target profile
      if (this.scanTarget.includes('192.168.1.100')) {
        this.log(`22/tcp   open  ssh          syn-ack (AWS Bastion Access)`);
        this.log(`80/tcp   open  http         syn-ack (Redirected gateway)`);
        this.log(`443/tcp  open  https        syn-ack (Secure Web Gateway)`);
        this.log(`3306/tcp open  mysql        syn-ack (Aurora Replica DB)`);
        this.log(`8080/tcp open  http-proxy   syn-ack (Jenkins Orchestration)`);
      } else if (this.scanTarget.toLowerCase().includes('banca') || this.scanTarget.includes('10.')) {
        this.log(`22/tcp   open  ssh          syn-ack (Admin Console)`);
        this.log(`53/tcp   open  domain       syn-ack (Internal Route 53)`);
        this.log(`443/tcp  open  https        syn-ack (API Banking gateway)`);
        this.log(`5432/tcp open  postgresql   syn-ack (PostgreSQL Aurora Active)`);
        this.log(`6379/tcp open  redis        syn-ack (ElastiCache layer)`);
      } else {
        this.log(`80/tcp   open  http         syn-ack (Nginx server)`);
        this.log(`443/tcp  open  https        syn-ack (Nginx SSL redirect)`);
      }
    }, 1800);

    // Phase 3: Final report
    setTimeout(() => {
      this.log(`Nmap done: 1 IP address (1 host up) scanned in 2.45 seconds.`);
      this.isScanning = false;
    }, 2800);
  }

  private log(message: string) {
    this.scanLogs.push(message);
  }
}
