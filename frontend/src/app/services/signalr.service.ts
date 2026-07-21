import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject, Observable } from 'rxjs';

export interface SystemMetrics {
  cpuUsage: number;
  ramUsage: number;
  sensorTemperature: number;
  sensorHumidity: number;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection!: signalR.HubConnection;
  private metricsSubject = new Subject<SystemMetrics>();
  private systemMsgSubject = new Subject<string>();
  private connectionStatusSubject = new Subject<boolean>();

  constructor() {
    this.buildConnection();
    this.startConnection();
  }

  private buildConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`http://${window.location.hostname}:5000/datahub`)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    // Register event listeners
    this.hubConnection.on('ReceiveMetrics', (data: SystemMetrics) => {
      this.metricsSubject.next(data);
    });

    this.hubConnection.on('ReceiveSystemMessage', (msg: string) => {
      this.systemMsgSubject.next(msg);
    });

    this.hubConnection.onclose(() => {
      this.connectionStatusSubject.next(false);
    });

    this.hubConnection.onreconnected(() => {
      this.connectionStatusSubject.next(true);
    });
  }

  public startConnection() {
    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR connection established successfully.');
        this.connectionStatusSubject.next(true);
      })
      .catch(err => {
        console.error('Error starting SignalR connection: ', err);
        this.connectionStatusSubject.next(false);
        // Retry connection after 5 seconds
        setTimeout(() => this.startConnection(), 5000);
      });
  }

  public stopConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }

  public getMetrics(): Observable<SystemMetrics> {
    return this.metricsSubject.asObservable();
  }

  public getSystemMessages(): Observable<string> {
    return this.systemMsgSubject.asObservable();
  }

  public getConnectionStatus(): Observable<boolean> {
    return this.connectionStatusSubject.asObservable();
  }
}
