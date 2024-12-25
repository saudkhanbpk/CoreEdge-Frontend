import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-approved-hardware-request',
  templateUrl: './view-approved-hardware-request.component.html',
  styleUrls: ['./view-approved-hardware-request.component.css']
})
export class ViewApprovedHardwareRequestComponent {
   constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ViewApprovedHardwareRequestComponent>) {
    }
  isLoading: boolean = false; 
  isunavailable: boolean = false;
  vendors: any[] = [
    { id: 1, name: 'Vendor A' },
    { id: 2, name: 'Vendor B' },
    { id: 3, name: 'Vendor C' },
  ];
  request = [
    {
      no: '001',
      materialid: '242-X34-3422',
      price: '272',
      employeeEmail: 'saadkhan922@company.com',
    },
    {
      no: '002',
      materialid: '242-X34-3422',
      price: '272',
      employeeEmail: 'hamza002@company.com',
    },
    {
      no: '003',
      materialid: '242-X34-3422',
      price: '272',
      employeeEmail: 'asadali3@company.com',
    },
  ];
  
}
