import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-academic-modal',
  templateUrl: './academic-modal.component.html',
  styleUrls: ['./academic-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class AcademicModalComponent implements OnInit {
  // Define se é 'academic' (Faculdade) ou 'course' (Curso extra)
  @Input() type: 'academic' | 'course' = 'academic';

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    // Campos comuns
    const commonControls = {
      institution: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]] // Validação de ano simples
    };

    if (this.type === 'academic') {
      this.form = this.fb.group({
        ...commonControls,
        degree: ['', Validators.required], // Ex: Bacharelado, Tecnólogo
        fieldOfStudy: ['', Validators.required] // Ex: Engenharia de Software
      });
    } else {
      this.form = this.fb.group({
        ...commonControls,
        name: ['', Validators.required], // Nome do curso
        hours: ['', Validators.required] // Carga horária
      });
    }
  }

  dismiss() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  save() {
    if (this.form.valid) {
      // Fecha o modal e retorna os dados do formulário
      this.modalCtrl.dismiss(this.form.value, 'confirm');
    } else {
      this.form.markAllAsTouched();
    }
  }
}