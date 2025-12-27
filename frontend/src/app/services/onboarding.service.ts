import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ProfileDNA } from 'src/app/core/models/dna.model';

@Injectable({ providedIn: 'root' })
export class OnboardingService {

  // Simula salvar o perfil no backend
  saveProfile(profile: ProfileDNA): Observable<{ success: boolean; id?: string }> {
    const fakeResponse = { success: true, id: 'user_' + Math.random().toString(36).slice(2, 9) };
    return of(fakeResponse).pipe(delay(800));
  }

}
