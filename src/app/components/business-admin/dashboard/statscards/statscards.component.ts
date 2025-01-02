import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statscards',
  templateUrl: './statscards.component.html',
  styleUrls: ['./statscards.component.css']
})
export class StatscardsComponent {
constructor(private router: Router){}

navigateTo(route: string): void {
  this.router.navigate([route]);
}
}
