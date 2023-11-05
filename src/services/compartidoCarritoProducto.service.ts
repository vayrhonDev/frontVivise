// carrito-compras.service.ts (Servicio compartido)
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Producto } from '../app/pages/carrito/carrito/interfaceProducto';


@Injectable({
  providedIn: 'root',
})
export class CarritoComprasService {
  constructor(private http: HttpClient) {

  }
  private cartItems: Producto[] = [];

  addToCart(product: Producto) {
    this.cartItems.push(product);
  }

  getCartItems(): Producto[] {
    return this.cartItems;
  }


  // async agregarProducto(producto: Producto): Promise<any>  {
  //   console.log(JSON.stringify(producto))
  //   console.log(producto)
  //   return this.http.post('http://localhost:4000/vivise/guardarCarrito', producto);
  // }
  async agregarProducto(producto: Producto): Promise<any> {
    if (!producto) {
      return new Observable(); // Puedes retornar un Observable vacío o hacer otras acciones apropiadas aquí.
    }

    const respuesta = await this.http.post('http://localhost:4000/guardarCarrito', producto)
      .subscribe({
        next: (response) => {
          console.log(respuesta)
        },
        error: (error) => {
          // Maneja los errores aquí
        },
        complete: () => {
          // Maneja la lógica cuando la suscripción se completa (opcional)
        }
      });
  }

  async verCarrito() {
    try {
      const lista = await firstValueFrom(this.http.get<any[]>('http://localhost:4000/verCarrito'));
      console.log('Lista de productos:', lista);
      return lista;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
      } else {
        console.error('Error inesperado:', error);
      }
      return []; // Devuelve una lista vacía en caso de error
    }
  }





  }
// async getCarrito(){
//   console.log(this.x)
//   return this.x
// }


//   }
//   private carritoProductos: Producto[] = [];

//   agregarAlCarrito(producto: Producto) {
//     this.carritoProductos.push(producto);
//   }

//   obtenerCarritoProductos() {
//     return this.carritoProductos;
//   }

//   // Otros métodos relacionados con el carrito de compras
// }

// // productos.component.ts (ProductosComponent)
// import { CarritoComprasService } from 'ruta-hacia-tu-servicio';


// // ...

// constructor(private carritoService: CarritoComprasService) {}

// agregarProductoAlCarrito(producto: Producto) {
//   this.carritoService.agregarAlCarrito(producto);
// }

// // ...

// // carrito-compras.component.ts (CarritoComprasComponent)
// import { CarritoComprasService } from 'ruta-hacia-tu-servicio';

// // ...

// constructor(private carritoService: CarritoComprasService) {}

// obtenerProductosEnCarrito() {
//   return this.carritoService.obtenerCarritoProductos();
// }

// //
