import { Component, EventEmitter, Output } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-rfq-main',
  templateUrl: './rfq-main.component.html',
  styleUrls: ['./rfq-main.component.css']
})
export class RfqMainComponent {
  searchQuery: string = '';
  @Output() searchQueryChanged = new EventEmitter<string>();
  constructor(private Sharedservices: SharedService) {
  }

  onInputChange(event: any) {
    this.searchQuery = event.target.value;
    this.emitSearchQuery();
  }
  onSearch() {
    this.emitSearchQuery();
  }
  emitSearchQuery() {
    this.Sharedservices.updateSearchTerm(this.searchQuery);
  }
}
