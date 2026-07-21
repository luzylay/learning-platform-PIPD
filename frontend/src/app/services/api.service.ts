import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = `http://${window.location.hostname}:5000/api`;

  constructor(private http: HttpClient) {}

  // ============================================
  // QUANTUM ENDPOINTS
  // ============================================
  getQuantumExplain(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Quantum/explain`);
  }

  getFiberComparison(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Quantum/fiber-comparison`);
  }

  simulateQubit(state: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/Quantum/simulate-qubit`, { state });
  }

  // ============================================
  // IA & CV ENDPOINTS
  // ============================================
  trainModel(modelType: string, epochs: number, dataset: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/IA/train-model`, { modelType, epochs, dataset });
  }

  classifyShape(imageBase64: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/IA/classify-shape`, { imageBase64 });
  }

  detectFace(imageBase64: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/IA/detect-face`, { imageBase64 });
  }

  // ============================================
  // SIGNAL PROCESSING ENDPOINTS
  // ============================================
  getFourierInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Signal/fourier-transform`);
  }

  getSensorMonitoring(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Signal/sensor-monitoring`);
  }

  getLowPassFilterInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Signal/low-pass-filter`);
  }

  analyzeSignal(signalValues: number[], samplingRate: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/Signal/analyze`, { signalValues, samplingRate });
  }

  filterSignal(signalValues: number[], cutoffFrequency: number, samplingRate: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/Signal/filter`, { signalValues, cutoffFrequency, samplingRate });
  }

  // ============================================
  // PANDAS & SERIAL
  // ============================================
  getPandasAdvantages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Pandas/pandas-advantages`);
  }

  getPySerialInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/PySerial/pyserial-communication`);
  }

  // ============================================
  // GENERAL LEARNING & DATABASE ENDPOINTS
  // ============================================
  getExamQuestions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Learning/exam-questions`);
  }

  submitScore(username: string, score: number, totalQuestions: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/Learning/submit-score`, { username, score, totalQuestions });
  }

  getScores(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Learning/scores`);
  }

  getMentalModel(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Learning/mental-model`);
  }

  getSoftwareLifecycle(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Learning/software-lifecycle`);
  }

  getBigData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Learning/big-data`);
  }

  getCloudComputing(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Learning/cloud-computing`);
  }

  getUserCenteredDesign(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Learning/user-centered-design`);
  }

  getGuiDesignFlow(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Learning/gui-design-flow`);
  }
}
