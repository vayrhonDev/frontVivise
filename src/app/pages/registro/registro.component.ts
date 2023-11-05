import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  constructor(private Router: Router) { }

  formData: any = {
    name: '',
    email: '',
    cel:'',
    password: '',
    passwordConfirm: ''
  };

  isFormValid(): boolean {
    if (
      this.formData.name.length > 0 &&
      this.formData.email.length > 0 &&
      this.formData.cel.length > 0 &&
      this.formData.password.length > 0 &&
      this.formData.passwordConfirm.length > 0
    ) {
      return this.formData.password === this.formData.passwordConfirm;
    }
    return false;
  }




  onSubmit() {
    console.log('Nombre:', this.formData.name);
    console.log('Correo Electrónico:', this.formData.email);
    console.log('password:', this.formData.password);
    console.log('cel:', this.formData.cel);
  }
  closeConfirmation() {
    // Método para cerrar la ventana emergente
    this.Router.navigate(['/login']);
  }
}
