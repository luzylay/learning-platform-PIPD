import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SyllabusComponent } from './components/syllabus/syllabus.component';
import { QuantumSimulatorComponent } from './components/quantum-simulator/quantum-simulator.component';
import { SignalAnalyzerComponent } from './components/signal-analyzer/signal-analyzer.component';
import { FaceDetectorComponent } from './components/face-detector/face-detector.component';
import { ExamPracticeComponent } from './components/exam-practice/exam-practice.component';
import { PortsReferenceComponent } from './components/ports-reference/ports-reference.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'syllabus', component: SyllabusComponent },
  { path: 'quantum', component: QuantumSimulatorComponent },
  { path: 'signal', component: SignalAnalyzerComponent },
  { path: 'vision', component: FaceDetectorComponent },
  { path: 'exam', component: ExamPracticeComponent },
  { path: 'ports', component: PortsReferenceComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];
