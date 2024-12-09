import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent {
  activeCard: number | null = null;

  constructor(private router:Router){}
  onCardClick(cardId: number): void {
    this.activeCard = cardId; 
  }

  goToNext(): void {
    if (this.activeCard) {
      this.router.navigate(['/auth/login']);
    }
  }
}
