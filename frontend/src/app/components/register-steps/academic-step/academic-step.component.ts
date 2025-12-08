import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, trash, school, ribbon } from 'ionicons/icons';
import { AcademicModalComponent } from '../../academic-modal/academic-modal.component';

@Component({
  selector: 'app-academic-step',
  templateUrl: './academic-step.component.html',
  styleUrls: ['./academic-step.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class AcademicStepComponent {
  @Output() stepData = new EventEmitter<{ isValid: boolean, data: any }>();

  // Listas que armazenam os JSONs
  academicList: any[] = [];
  coursesList: any[] = [];

  constructor(private modalCtrl: ModalController) {
    addIcons({ add, trash, school, ribbon });
  }

  // Abre o Bottom Sheet
  async openAddModal(type: 'academic' | 'course') {
    const modal = await this.modalCtrl.create({
      component: AcademicModalComponent,
      componentProps: { type },
      // Configuração mágica para Bottom Sheet:
      breakpoints: [0, 0.5, 0.85], // 0=fechado, 0.5=metade, 0.85=quase full
      initialBreakpoint: 0.85,
      handle: true // Mostra aquele tracinho cinza no topo para puxar
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.addItem(type, data);
    }
  }

  private addItem(type: 'academic' | 'course', item: any) {
    if (type === 'academic') {
      this.academicList.push(item);
    } else {
      this.coursesList.push(item);
    }
    this.emitData();
  }

  removeItem(type: 'academic' | 'course', index: number) {
    if (type === 'academic') {
      this.academicList.splice(index, 1);
    } else {
      this.coursesList.splice(index, 1);
    }
    this.emitData();
  }

  // Emite para a RegisterPage sempre que a lista muda
  private emitData() {
    // Validamos se pelo menos 1 formação acadêmica foi adicionada (Regra de Negócio opcional)
    const isValid = this.academicList.length > 0;
    
    this.stepData.emit({
      isValid,
      data: {
        academic: this.academicList,
        courses: this.coursesList
      }
    });
  }
}