import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {

  formData = {
    name: '',
    email: '',
    message: '',
    cel: '',
  };
  showConfirmation = false;

  isFormValid(): boolean {
    return (
      this.formData.name.length > 0 &&
      this.formData.email.length > 0 &&
      this.formData.message.length > 0 &&
      this.formData.cel.length > 0
    );
  }
  onSubmit() {
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviar los datos a un servidor
    console.log('Nombre:', this.formData.name);
    console.log('Correo Electrónico:', this.formData.email);
    console.log('Mensaje:', this.formData.message);
    console.log('cel:', this.formData.cel);

    this.showConfirmation = true;

    this.formData = {
      name: '',
      email: '',
      message: '',
      cel: '',
    };


    // Puedes redirigir o mostrar un mensaje de éxito aquí
  }
  closeConfirmation() {
    // Método para cerrar la ventana emergente
    this.showConfirmation = false;
  }
}




