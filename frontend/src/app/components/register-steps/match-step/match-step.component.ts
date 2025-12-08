import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { business, rocket, home, globe, storefront, medkit, wallet, codeSlash } from 'ionicons/icons';

@Component({
  selector: 'app-match-step',
  templateUrl: './match-step.component.html',
  styleUrls: ['./match-step.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class MatchStepComponent implements OnInit {
  @Output() stepData = new EventEmitter<{ isValid: boolean, data: any }>();

  // --- Opções Disponíveis (Mock) ---
  
  // Modelos de Trabalho
  workModels = [
    { id: 'remote', label: '100% Remoto', icon: 'globe' },
    { id: 'hybrid', label: 'Híbrido', icon: 'home' },
    { id: 'onsite', label: 'Presencial', icon: 'business' }
  ];

  // Tipos de Empresa
  companyTypes = [
    { id: 'startup', label: 'Startup', icon: 'rocket' },
    { id: 'mid_large', label: 'Médio/Grande Porte', icon: 'business' },
    { id: 'consultancy', label: 'Consultoria', icon: 'briefcase' } // ícone padrão se não tiver específico
  ];

  // Setores
  sectors = [
    { id: 'fintech', label: 'Fintech / Bancário', icon: 'wallet' },
    { id: 'health', label: 'HealthTech / Saúde', icon: 'medkit' },
    { id: 'retail', label: 'Varejo / E-commerce', icon: 'storefront' },
    { id: 'tech', label: 'Software House', icon: 'codeSlash' },
    { id: 'agrotech', label: 'Agro', icon: 'leaf' }, // ícone precisa ser importado se usar
    { id: 'edtech', label: 'Educação', icon: 'school' } // ícone precisa ser importado se usar
  ];

  // --- Seleções do Usuário ---
  selectedWorkModels: string[] = [];
  selectedCompanyTypes: string[] = [];
  selectedSectors: string[] = [];

  constructor() {
    // Registrando ícones usados
    addIcons({ business, rocket, home, globe, storefront, medkit, wallet, codeSlash });
  }

  ngOnInit() {
    this.emitData();
  }

  // --- Lógica de Toggle (Genérica) ---
  
  toggleSelection(list: string[], item: string) {
    const index = list.indexOf(item);
    if (index > -1) {
      list.splice(index, 1); // Remove se já existe
    } else {
      list.push(item); // Adiciona se não existe
    }
    this.emitData();
  }

  // Wrappers específicos para o HTML
  toggleWorkModel(id: string) { this.toggleSelection(this.selectedWorkModels, id); }
  toggleCompanyType(id: string) { this.toggleSelection(this.selectedCompanyTypes, id); }
  toggleSector(id: string) { this.toggleSelection(this.selectedSectors, id); }

  // --- Validação e Emissão ---
  private emitData() {
    // Regra: O usuário deve selecionar pelo menos 1 modelo e 1 setor
    const isValid = 
      this.selectedWorkModels.length > 0 && 
      this.selectedSectors.length > 0;

    this.stepData.emit({
      isValid,
      data: {
        workModelPreference: this.selectedWorkModels,
        companyTypePreference: this.selectedCompanyTypes,
        sectorPreference: this.selectedSectors
      }
    });
  }
}