import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { checkmark } from 'ionicons/icons';

@Component({
  selector: 'app-step-indicator',
  templateUrl: './step-indicator.component.html',
  styleUrls: ['./step-indicator.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class StepIndicatorComponent implements OnInit {
  @Input() currentStep: number = 1; // Passo atual (ex: 2)
  @Input() totalSteps: number = 3;  // Total de passos (ex: 3)

  stepsArray: number[] = [];

  constructor() {
    addIcons({ checkmark });
  }

  ngOnInit() {
    // Cria um array baseado no número total de steps [1, 2, 3...]
    this.stepsArray = Array(this.totalSteps).fill(0).map((x, i) => i + 1);
  }
}