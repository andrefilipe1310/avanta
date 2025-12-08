import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { closeCircle, add, search } from 'ionicons/icons';

@Component({
  selector: 'app-skills-step',
  templateUrl: './skills-step.component.html',
  styleUrls: ['./skills-step.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SkillsStepComponent implements OnInit {
  @Output() stepData = new EventEmitter<{ isValid: boolean, data: any }>();

  // --- 1. Áreas de Interesse (Seleção Fixa) ---
  // Simulação de categorias vindas do backend
  availableInterests: string[] = [
    'Desenvolvimento Web', 'Mobile', 'Data Science', 
    'DevOps', 'UI/UX Design', 'Gestão de Projetos', 
    'Cybersecurity', 'AI & Machine Learning'
  ];
  selectedInterests: string[] = [];

  // --- 2. Competências (Busca & Tags) ---
  // Banco de dados simulado de skills para autocompletar
  allSkills: string[] = [
    'Java', 'Spring Boot', 'Angular', 'Ionic', 'React', 
    'Node.js', 'Python', 'SQL', 'Docker', 'Kubernetes',
    'Scrum', 'Liderança', 'Comunicação', 'Inglês Avançado'
  ];
  
  skillInput: string = '';
  filteredSkills: string[] = [];
  selectedSkills: string[] = [];

  constructor() {
    addIcons({ closeCircle, add, search });
  }

  ngOnInit() {
    this.emitData(); // Emite estado inicial
  }

  // --- Lógica de Interesses ---
  toggleInterest(interest: string) {
    if (this.selectedInterests.includes(interest)) {
      this.selectedInterests = this.selectedInterests.filter(i => i !== interest);
    } else {
      this.selectedInterests.push(interest);
    }
    this.emitData();
  }

  // --- Lógica de Skills ---
  
  // Filtra a lista conforme o usuário digita
  onSearchChange(event: any) {
    const query = event.detail.value?.toLowerCase();
    this.skillInput = query;

    if (query && query.trim() !== '') {
      this.filteredSkills = this.allSkills.filter((skill) => {
        // Retorna skills que contêm o texto e AINDA NÃO foram selecionadas
        return (
          skill.toLowerCase().includes(query) && 
          !this.selectedSkills.includes(skill)
        );
      });
    } else {
      this.filteredSkills = [];
    }
  }

  // Adiciona skill ao clicar na sugestão
  addSkill(skill: string) {
    if (!this.selectedSkills.includes(skill)) {
      this.selectedSkills.push(skill);
      this.clearSearch();
      this.emitData();
    }
  }

  // Permite adicionar skill personalizada (que não está na lista) via Enter
  addCustomSkill() {
    const val = this.skillInput?.trim();
    if (val && !this.selectedSkills.includes(val)) {
      this.selectedSkills.push(val);
      this.clearSearch();
      this.emitData();
    }
  }

  removeSkill(skill: string) {
    this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
    this.emitData();
  }

  private clearSearch() {
    this.skillInput = '';
    this.filteredSkills = [];
    // Hackzinho para limpar o ion-searchbar visualmente se necessário
    // mas o [value]="skillInput" no HTML já deve resolver
  }

  // --- Emissão de Dados ---
  private emitData() {
    // Validação: Pelo menos 1 interesse e 1 skill
    const isValid = this.selectedInterests.length > 0 && this.selectedSkills.length > 0;

    this.stepData.emit({
      isValid,
      data: {
        interests: this.selectedInterests,
        skills: this.selectedSkills
      }
    });
  }
}