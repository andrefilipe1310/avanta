import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { camera, logoLinkedin, logoGithub, globe } from 'ionicons/icons';

@Component({
  selector: 'app-identity-step',
  templateUrl: './identity-step.component.html',
  styleUrls: ['./identity-step.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class IdentityStepComponent implements OnInit {
  // Recebe dados pré-preenchidos (ex: vindos do Login Social na página anterior)
  @Input() prefilledData: any = null;

  // Emite o status do formulário para o pai (RegisterPage)
  @Output() stepData = new EventEmitter<{ isValid: boolean, data: any }>();

  identityForm!: FormGroup;
  avatarPreview: string | ArrayBuffer | null = null; // Para mostrar a imagem selecionada

  constructor(private fb: FormBuilder) {
    addIcons({ camera, logoLinkedin, logoGithub, globe });
  }

  ngOnInit() {
    this.initForm();
    this.checkPrefilledData();
  }

  // Inicializa o formulário do step
  private initForm() {
    this.identityForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      linkedinUrl: [''],
      githubUrl: [''],
      portfolioUrl: [''],
      avatar: [null] // Armazena o arquivo ou base64
    });

    // Observa mudanças para avisar a página pai em tempo real
    this.identityForm.valueChanges.subscribe(value => {
      this.stepData.emit({
        isValid: this.identityForm.valid,
        data: value
      });
    });
  }

  // UX: Preenche dados se o usuário veio de login social
  private checkPrefilledData() {
    if (this.prefilledData) {
      this.identityForm.patchValue({
        fullName: this.prefilledData.name,
        linkedinUrl: this.prefilledData.linkedin,
        // Se tiver foto vindo da rede social:
        // avatar: this.prefilledData.photoUrl 
      });
      
      if (this.prefilledData.photoUrl) {
        this.avatarPreview = this.prefilledData.photoUrl;
      }
    }
  }

  // Lógica de Upload de Imagem (Simples)
  triggerImageUpload() {
    const fileInput = document.getElementById('avatarInput') as HTMLElement;
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Cria preview da imagem
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result;
        // Atualiza o form
        this.identityForm.patchValue({ avatar: file });
      };
      reader.readAsDataURL(file);
    }
  }
}