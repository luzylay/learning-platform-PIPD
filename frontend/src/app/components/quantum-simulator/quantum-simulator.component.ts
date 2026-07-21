import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-quantum-simulator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quantum-simulator.component.html',
  styleUrl: './quantum-simulator.component.css'
})
export class QuantumSimulatorComponent implements OnInit {
  explainData: any = null;
  fiberData: any = null;
  selectedState = '|0⟩';
  simResult: any = null;
  isSimulating = false;

  states = ['|0⟩', '|1⟩', '|+⟩', '|i⟩', 'Superposición'];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadQuantumData();
  }

  loadQuantumData() {
    this.apiService.getQuantumExplain().subscribe(data => {
      this.explainData = data;
    });

    this.apiService.getFiberComparison().subscribe(data => {
      this.fiberData = data;
    });
  }

  runSimulation() {
    this.isSimulating = true;
    this.apiService.simulateQubit(this.selectedState).subscribe({
      next: (result) => {
        this.simResult = result;
        this.isSimulating = false;
      },
      error: () => {
        this.isSimulating = false;
        // Mock fallback if offline
        this.simResult = {
          qubit_state: this.selectedState,
          superposition: [0.7071, 0.7071],
          measurement: Math.random() > 0.5 ? 1 : 0,
          probability_0: this.selectedState === '|0⟩' ? 1.0 : this.selectedState === '|1⟩' ? 0.0 : 0.5,
          probability_1: this.selectedState === '|0⟩' ? 0.0 : this.selectedState === '|1⟩' ? 1.0 : 0.5,
          entanglement: {
            qubit1: Math.random() > 0.5 ? 1 : 0,
            qubit2: Math.random() > 0.5 ? 1 : 0,
            is_entangled: true
          }
        };
      }
    });
  }
}
