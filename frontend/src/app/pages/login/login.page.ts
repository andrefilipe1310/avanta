import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router'; // Necessário para navegar para o Register
import { addIcons } from 'ionicons';
import { logoGoogle, logoLinkedin, eye, eyeOff } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterLink]
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder) {
    addIcons({ logoGoogle, logoLinkedin, eye, eyeOff });
  }

  ngOnInit() {
    this.initForm();
  }

  // Configura apenas os campos de login
  private initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Submissão do Login
  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    
    const { email, password } = this.loginForm.value;
    console.log('Authenticating user:', email);
    // Chame seu serviço de Auth aqui
  }

  // Ações sociais (opcional)
  loginWithGoogle() { console.log('Google Login'); }
  loginWithLinkedIn() { console.log('LinkedIn Login'); }
}