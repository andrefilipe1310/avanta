import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

// Componentes dos Passos
import { IdentityStepComponent } from 'src/app/components/register-steps/identity-step/identity-step.component';
import { AcademicStepComponent } from 'src/app/components/register-steps/academic-step/academic-step.component';
import { SkillsStepComponent } from 'src/app/components/register-steps/skills-step/skills-step.component';
import { MatchStepComponent } from 'src/app/components/register-steps/match-step/match-step.component'; // <--- Novo Import
import { StepIndicatorComponent } from 'src/app/components/register-steps/step-indicator/step-indicator.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    RouterLink,
    StepIndicatorComponent,
    IdentityStepComponent,
    AcademicStepComponent,
    SkillsStepComponent,
    MatchStepComponent // <--- Adicionado aos imports
  ]
})
export class RegisterPage {
  
  // --- Controle de Estado ---
  currentStep: number = 1; // Começa do 1
  totalSteps: number = 4;  // Agora são 4 passos
  isStepValid: boolean = false;

  // --- Armazenamento de Dados ---
  // Dados simulados (ex: vindos de uma rota anterior ou Social Auth)
  socialLoginData = {
    name: 'Deco Developer',
    linkedin: 'linkedin.com/in/deco',
    photoUrl: null
  };

  identityData: any = null;
  academicData: any = null;
  skillsData: any = null;
  matchData: any = null; // <--- Dados do Step 4

  constructor() {}

  // --- Handlers (Recebem dados dos filhos) ---

  // Passo 1: Identidade
  handleIdentityStep(event: { isValid: boolean, data: any }) {
    this.isStepValid = event.isValid;
    this.identityData = event.data;
  }

  // Passo 2: Acadêmico
  handleAcademicStep(event: { isValid: boolean, data: any }) {
    this.isStepValid = event.isValid;
    this.academicData = event.data;
  }

  // Passo 3: Competências
  handleSkillsStep(event: { isValid: boolean, data: any }) {
    this.isStepValid = event.isValid;
    this.skillsData = event.data;
  }

  // Passo 4: Match Cultural (Novo)
  handleMatchStep(event: { isValid: boolean, data: any }) {
    this.isStepValid = event.isValid;
    this.matchData = event.data;
  }

  // --- Navegação ---

  nextStep() {
    if (!this.isStepValid) return; // Segurança extra

    if (this.currentStep < this.totalSteps) {
      // Avança para o próximo step
      this.currentStep++;
      // Reseta a validação temporariamente até o próximo componente carregar e emitir seu status
      this.isStepValid = false; 
    } else {
      // Se estiver no último step (4), finaliza
      this.finishRegistration();
    }
  }

  // Envio final dos dados
  finishRegistration() {
    // Monta o objeto final conforme esperado pelo Backend Java
    const finalPayload = {
      ...this.identityData, // Espalha nome, avatar, links
      academicBackground: this.academicData,
      skillsAndInterests: this.skillsData,
      preferences: this.matchData // <--- Inclui preferências de trabalho
    };

    console.log('--- CADASTRO COMPLETO ---');
    console.log('Payload para API:', finalPayload);
    
    // Exemplo de chamada de serviço:
    // this.authService.register(finalPayload).subscribe(...)
  }
}