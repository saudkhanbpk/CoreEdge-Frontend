import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RolesService } from 'src/app/services/roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.css']
})
export class RolesFormComponent implements OnInit {
  user:any
  constructor(private authService: AuthService, private rolesService:RolesService, private router: Router){
    this.user= this.authService.getUserData()
  }
  ngOnInit(){
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { roleData: any };
    
    if (state && state.roleData) {
      this.roleData = state.roleData;  // Populate the form with the role data
    } else if (history.state && history.state.roleData) {
      // Fallback for browser navigation or other cases
      this.roleData = history.state.roleData;
    }    
  }
  roleData = {
    id:0,
    name: '',
    isActive: false,
    userId:0
  };

  // onSubmit() {
  //   this.roleData.userId = this.user.id;
  //   this.rolesService.create(this.roleData).subscribe((item: any) => {
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Role Added',
  //       text: `The role "${item.name}" has been added successfully!`,
  //       confirmButtonText: 'OK'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         // Navigate to the roles table page after confirmation
  //         this.router.navigate(['/business-admin/roles/roles-table']);
  //       }
  //     });
  //   });
  // }

  onSubmit() {
    this.roleData.userId = this.user.id;

    if (this.roleData.id) {
      this.rolesService.update(this.roleData.id ,this.roleData).subscribe((item: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Role Updated',
          text: `The role "${item.name}" has been updated successfully!`,
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/business-admin/roles/roles-table']);
          }
        });
      });
    } else {
      this.rolesService.create(this.roleData).subscribe((item: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Role Added',
          text: `The role "${item.name}" has been added successfully!`,
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/business-admin/roles/roles-table']);
          }
        });
      });
    }
  }
}
