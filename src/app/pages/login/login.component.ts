import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formData = {
    email: '',
    password: '',
  };
  isFormValid(): boolean {
    return (
      this.formData.email.length > 0 &&
      this.formData.password.length > 0
    );
  }
  constructor(private router: Router){}

  passwordVisible: boolean = false; // Variable para rastrear la visibilidad de la contraseña

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
  redirectToRegistration() {
    this.router.navigate(['/registro']); // Reemplaza '/registro' con la URL de tu página de registro
  }

  onSubmit() {

  }

}
