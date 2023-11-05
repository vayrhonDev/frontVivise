import { Component } from '@angular/core';
import { productosServices } from '../../../services/productos.service';
import { AuthService } from 'src/globalServices/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  productos: any;

  constructor(private productosServices: productosServices,
    private auth:AuthService) { }


  // ngOnInit() {
  //   this.totalProductos(); // Llama a la función para obtener el total de alumnos
  // }
  ngOnInit() {
		this.productosServices.obtenerInfo().then(productos => {
			this.productos = productos;
		});
    }
  async totalProductos() {
    try {
      this.productos = await this.productosServices.obtenerInfo(); // Utiliza el servicio para obtener el total de alumnos
      console.log('Total de productos:', this.productos);
    } catch (error) {
      // Maneja los errores aquí
      console.error('Error al obtener el total de productos:', error);
    }
  }
}
