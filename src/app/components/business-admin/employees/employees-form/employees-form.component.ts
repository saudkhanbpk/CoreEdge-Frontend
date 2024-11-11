import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.css']
})
export class EmployeesFormComponent {
  employeeForm: FormGroup | any;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      employeename: ['', Validators.required],
      role: ['selectrole', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      address: ['', Validators.required],
      active: [false]
    });
  }
  onSubmit() {
    if (this.employeeForm.valid) {
      Swal.fire({
        title: 'Employee Added',
        text: 'The employee details have been successfully submitted!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        console.log('Form Data:', this.employeeForm.value);
        this.employeeForm.reset(); 
      });
    } else {
      Swal.fire({
        title: 'Form Incomplete',
        text: 'Please fill out all required fields before submitting.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
  
}
