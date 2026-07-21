import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-signal-analyzer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signal-analyzer.component.html',
  styleUrl: './signal-analyzer.component.css'
})
export class SignalAnalyzerComponent implements OnInit, AfterViewInit {
  @ViewChild('timeCanvas') timeCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('freqCanvas') freqCanvas!: ElementRef<HTMLCanvasElement>;

  // Controls
  freq1 = 1.0; // Hz
  freq2 = 5.0; // Hz
  noise = 0.5;
  cutoff = 2.0; // Hz
  samplingRate = 100.0; // Hz
  duration = 2.0; // seconds

  timeValues: number[] = [];
  originalSignal: number[] = [];
  filteredSignal: number[] = [];
  fftFrequencies: number[] = [];
  fftAmplitudes: number[] = [];

  scipyFourierInfo: any = null;
  scipyFilterInfo: any = null;
  sensorCodeInfo: any = null;

  isProcessing = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadInfoData();
  }

  ngAfterViewInit() {
    this.generateAndProcessSignal();
  }

  loadInfoData() {
    this.apiService.getFourierInfo().subscribe(data => {
      this.scipyFourierInfo = data;
    });

    this.apiService.getLowPassFilterInfo().subscribe(data => {
      this.scipyFilterInfo = data;
    });

    this.apiService.getSensorMonitoring().subscribe(data => {
      this.sensorCodeInfo = data;
    });
  }

  generateAndProcessSignal() {
    this.isProcessing = true;
    
    // 1. Generate local signal
    const N = this.duration * this.samplingRate;
    this.timeValues = [];
    this.originalSignal = [];
    
    for (let i = 0; i < N; i++) {
      const t = i / this.samplingRate;
      this.timeValues.push(t);
      // y = sin(2*pi*f1*t) + 0.5*sin(2*pi*f2*t) + noise
      const sineVal1 = Math.sin(2 * Math.PI * this.freq1 * t);
      const sineVal2 = 0.5 * Math.sin(2 * Math.PI * this.freq2 * t);
      const noiseVal = (Math.random() - 0.5) * 2 * this.noise;
      this.originalSignal.push(sineVal1 + sineVal2 + noiseVal);
    }

    // 2. Call backend to get filtered signal and FFT
    this.apiService.filterSignal(this.originalSignal, this.cutoff, this.samplingRate).subscribe({
      next: (filterRes: any) => {
        this.filteredSignal = filterRes.filtered_values;
        
        // Next, get FFT of original signal
        this.apiService.analyzeSignal(this.originalSignal, this.samplingRate).subscribe({
          next: (fftRes: any) => {
            this.fftFrequencies = fftRes.frequencies;
            this.fftAmplitudes = fftRes.amplitudes;
            this.isProcessing = false;
            this.drawCharts();
          },
          error: () => this.fallbackAnalysis()
        });
      },
      error: () => this.fallbackAnalysis()
    });
  }

  fallbackAnalysis() {
    // Simple local fallback calculation if backend/python APIs are offline
    this.filteredSignal = this.originalSignal.map((val, idx) => {
      // Mock simple moving average filter
      if (idx < 3) return val;
      return (this.originalSignal[idx] + this.originalSignal[idx-1] + this.originalSignal[idx-2] + this.originalSignal[idx-3]) / 4;
    });
    
    // Mock FFT output
    this.fftFrequencies = Array.from({ length: 50 }, (_, i) => i * 0.5);
    this.fftAmplitudes = this.fftFrequencies.map(f => {
      if (Math.abs(f - this.freq1) < 0.5) return 1.0;
      if (Math.abs(f - this.freq2) < 0.5) return 0.5;
      return Math.random() * this.noise * 0.2;
    });
    
    this.isProcessing = false;
    this.drawCharts();
  }

  drawCharts() {
    this.drawTimeDomain();
    this.drawFrequencyDomain();
  }

  drawTimeDomain() {
    const canvas = this.timeCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and size
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const width = canvas.width;
    const height = canvas.height;
    
    // Draw background grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Midline (0 amplitude)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Map signal values to pixels
    const maxVal = 2.5; // range [-2.5, 2.5]
    const getX = (tIndex: number) => (tIndex / this.originalSignal.length) * width;
    const getY = (val: number) => height / 2 - (val / maxVal) * (height / 2.5);

    // Plot original signal
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(getX(0), getY(this.originalSignal[0]));
    for (let i = 1; i < this.originalSignal.length; i++) {
      ctx.lineTo(getX(i), getY(this.originalSignal[i]));
    }
    ctx.stroke();

    // Plot filtered signal
    if (this.filteredSignal && this.filteredSignal.length > 0) {
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(getX(0), getY(this.filteredSignal[0]));
      for (let i = 1; i < this.filteredSignal.length; i++) {
        ctx.lineTo(getX(i), getY(this.filteredSignal[i]));
      }
      ctx.stroke();
    }
  }

  drawFrequencyDomain() {
    const canvas = this.freqCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const width = canvas.width;
    const height = canvas.height;

    // Draw background grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    if (!this.fftFrequencies || this.fftFrequencies.length === 0) return;

    // Filter frequencies to show only up to Nyquist or max 15Hz for readability
    const maxFreqShow = 15;
    const indicesToShow = this.fftFrequencies
      .map((f, idx) => ({ f, idx }))
      .filter(item => item.f <= maxFreqShow);

    const getX = (freq: number) => (freq / maxFreqShow) * (width - 40) + 20;
    const getY = (amp: number) => height - 20 - (amp / 1.2) * (height - 40);

    // Plot spectrum as filled bars / stems
    ctx.strokeStyle = '#d946ef';
    ctx.fillStyle = '#d946ef';
    ctx.lineWidth = 2.5;

    indicesToShow.forEach(item => {
      const x = getX(item.f);
      const amp = this.fftAmplitudes[item.idx];
      const y = getY(amp);

      ctx.beginPath();
      ctx.moveTo(x, height - 20);
      ctx.lineTo(x, y);
      ctx.stroke();

      // Dot at top
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Draw baseline
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.moveTo(0, height - 20);
    ctx.lineTo(width, height - 20);
    ctx.stroke();
  }
}
