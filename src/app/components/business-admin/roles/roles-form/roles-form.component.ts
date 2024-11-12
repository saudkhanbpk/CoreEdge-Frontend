import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.css']
})
export class RolesFormComponent {
  roleData = {
    role: '',
    active: false
  };

  onSubmit() {
    console.log('Role Data:', this.roleData);
    Swal.fire({
      icon: 'success',
      title: 'Role Added',
      text: `The role "${this.roleData.role}" has been added successfully!`,
      confirmButtonText: 'OK'
    });
  }
}
