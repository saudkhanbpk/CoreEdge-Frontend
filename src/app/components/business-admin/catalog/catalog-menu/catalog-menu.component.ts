import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { FilterService } from 'src/app/services/filter.service';
import { SearchService } from 'src/app/services/search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-catalog-menu',
  templateUrl: './catalog-menu.component.html',
  styleUrls: ['./catalog-menu.component.css']
})
export class CatalogMenuComponent {
 

}
