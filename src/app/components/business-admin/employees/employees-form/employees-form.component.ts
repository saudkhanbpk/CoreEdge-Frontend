import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { EmployesService } from 'src/app/services/employes.service';
import { RolesService } from 'src/app/services/roles.service';  // Import the RolesService
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.css']
})
export class EmployeesFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEdit: boolean = false;
  user: any;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = ''; // To store the preview URL
  employeeData: any;
  roles: any[] = []; // Array to store the roles

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private employeesService: EmployesService,
    private rolesService: RolesService, // Inject the RolesService
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { employeeData: any };

    if (state && state.employeeData) {
      this.employeeData = state.employeeData;
    } else if (history.state && history.state.employeeData) {
      this.employeeData = history.state.employeeData;
    }

    this.user = this.authService.getUserData();

    // Initialize the form
    this.employeeForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      role: ['', Validators.required], // Use a form control with no initial value
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      address: ['', [Validators.required, Validators.maxLength(255)]],
      isActive: [false, Validators.required],
      dateJoined: [this.getCurrentDate(), Validators.required],
      imageUrl: ['']
    });

    // Check if editing and populate form
    if (this.employeeData) {
      this.isEdit = true;
      this.employeeForm.patchValue(this.employeeData);
      this.imagePreview = this.employeeData.imageUrl || '';
    }
  }

  ngOnInit(): void {
    const user = this.authService.getUserData();
    this.loadRoles(user.id); // Load roles when the component is initialized
  }

  loadRoles(userId: number): void {
    this.rolesService.findAll(userId).subscribe((response: any) => {
      this.roles = response; // Store the roles data in the roles array
    });
  }

  // Handle file selection and show preview
  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result; // Set preview
      };
      reader.readAsDataURL(file);
    }
  }

  // Get current date
  private getCurrentDate(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  // Handle form submission
  onSubmit(): void {
    if (this.employeeForm.invalid) {
      return; // Prevent submission if form is invalid
    }

    this.employeeForm.value.user = this.user.id;

    const fileToUpload = this.selectedFile || undefined;

    if (this.isEdit) {
      // Update existing employee
      this.employeesService.updateEmployee(this.employeeForm.getRawValue().id, this.employeeForm.value, fileToUpload)
        .subscribe(
          (employee: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Employee Updated',
              text: `The employee "${employee.updatedEmployee.name}" has been updated successfully!`,
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigate(['/business-admin/employees/employees-table']);
            });
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Something went wrong while updating the employee. Please try again later.',
              confirmButtonText: 'OK'
            });
          }
        );
    } else {
      // Create new employee
      const formData = new FormData();
      formData.append('employee', JSON.stringify(this.employeeForm.value));
      if (fileToUpload) {
        formData.append('file', fileToUpload);
      }

      this.employeesService.createEmployee(formData)
        .subscribe(
          (employee: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Employee Added',
              text: `The employee "${employee.name}" has been added successfully!`,
              confirmButtonText: 'OK'
            }).then(() => {
              this.router.navigate(['/admin/employees/employees-table']);
            });
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Something went wrong while adding the employee. Please try again later.',
              confirmButtonText: 'OK'
            });
          }
        );
    }
  }

  // Cancel action
  cancel(): void {
    this.router.navigate(['/admin/employees/employees-table']);
  }
}
