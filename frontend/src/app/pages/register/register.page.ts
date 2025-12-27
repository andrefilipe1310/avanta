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
import { OnboardingService } from 'src/app/services/onboarding.service';
import { ProfileDNA } from 'src/app/core/models/dna.model';

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
    photoUrl: null,
    email: 'deco@example.com'
  };

  profile: ProfileDNA = {
    firstName: '',
    lastName: '',
    email: '',
    socialProviderId: null,
    consentTimestamp: null,
    interestsMacro: [],
    interestsSub: [],
    competenciesSelf: [],
    otherCompetencies: [],
    targetRole: null,
    companyPreferences: [],
    academicBackground: [],
    courses: []
  } as ProfileDNA;

  // Consent control for final step
  consentGiven: boolean = false;

  constructor(private onboardingService: OnboardingService) {}

  // --- Handlers (Recebem dados dos filhos) ---

  // Passo 1: Identidade
  handleIdentityStep(event: { isValid: boolean, data: any }) {
    this.isStepValid = event.isValid;
    const data: ProfileDNA = event.data;
    // Merge identity fields into profile
    this.profile.firstName = data.firstName || this.profile.firstName;
    this.profile.lastName = data.lastName || this.profile.lastName;
    this.profile.email = data.email || this.profile.email;
    this.profile.password = data.password || this.profile.password;
    this.profile.consentTimestamp = data.consentTimestamp || this.profile.consentTimestamp;
    // socialProviderId kept if provided later
  }

  // Passo 2: Acadêmico
  handleAcademicStep(event: { isValid: boolean, data: any }) {
    this.isStepValid = event.isValid;
    // event.data contains { academic, courses }
    this.profile.academicBackground = event.data.academic || [];
    this.profile.courses = event.data.courses || [];
  }

  // Passo 3: Competências
  handleSkillsStep(event: { isValid: boolean, data: any }) {
    this.isStepValid = event.isValid;
    // event.data contains { interests, skills }
    this.profile.interestsMacro = event.data.interests || [];
    // Map selected skills to otherCompetencies (could be mapped to competenciesSelf later)
    this.profile.otherCompetencies = event.data.skills || [];
  }

  // Passo 4: Match Cultural (Novo)
  handleMatchStep(event: { isValid: boolean, data: any }) {
    this.isStepValid = event.isValid;
    // event.data contains preferences
    this.profile.companyPreferences = event.data.companyTypePreference || [];
    // prefer workModelPreference and sectorPreference stored in companyPreferences as well
    this.profile.companyPreferences = [
      ...(this.profile.companyPreferences || []),
      ...(event.data.workModelPreference || []),
      ...(event.data.sectorPreference || [])
    ];
  }

  // Consent change handler (from template checkbox)
  onConsentChange(e: any) {
    const checked = !!e?.detail?.checked;
    this.consentGiven = checked;
    this.profile.consentTimestamp = checked ? new Date().toISOString() : null;
  }

  // Computed disabled state for the primary CTA
  get isContinueDisabled(): boolean {
    if (this.currentStep === this.totalSteps) {
      return !this.isStepValid || !this.consentGiven;
    }
    return !this.isStepValid;
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
    // Envia o objeto consolidado `profile`
    const finalPayload: ProfileDNA = this.profile;

    console.log('--- CADASTRO COMPLETO ---');
    console.log('Payload para API:', finalPayload);
    
    // Usa serviço de onboarding mock
    this.onboardingService.saveProfile(finalPayload).subscribe({
      next: res => {
        console.log('Resposta do serviço:', res);
        // redirecionar para painel ou mostrar sucesso
      },
      error: err => {
        console.error('Erro ao salvar perfil', err);
      }
    });
  }
}