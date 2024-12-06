import { Component } from '@angular/core';
import { Vendor } from 'src/app/models/vendor.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-hardware-request',
  templateUrl: './view-hardware-request.component.html',
  styleUrls: ['./view-hardware-request.component.css']
})
export class ViewHardwareRequestComponent {
  request = [
    {
      no: '001',
      materialid: '242-X34-3422',
      price: '272',
      vendorname:'Saad Khan',
      vendorEmail: 'saadkhan922@company.com',
    },
    {
      no: '002',
      materialid: '242-X34-3422',
      price: '272',
      vendorname:'Hamza Khan',
      vendorEmail: 'hamza002@company.com',
    },
    {
      no: '003',
      materialid: '242-X34-3422',
      price: '272',
      vendorname:'Asad Ali',
      vendorEmail: 'asadali3@company.com',
    },
  ];
  
}