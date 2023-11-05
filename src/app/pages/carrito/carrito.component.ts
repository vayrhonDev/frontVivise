import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoComprasService } from 'src/services/compartidoCarritoProducto.service';
import { AuthService } from 'src/globalServices/auth.service';
import { CarritoService } from '../../../services/carrito.service';
import { from } from 'rxjs';




@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {


  // carrito: Producto[] = [];
  constructor(
    private auth: AuthService,
    private router: Router,
    private CarritoService: CarritoService) {

  }
  checked: boolean = false;
  checked2: boolean = false;
  ngOnInit(): void {
    this.cartDetails();
    this.loadCart()
    this.cupones()

  }
  formData = {
    direccion:'',
    ncasa:'',
    region:'',
    ciudad:''
  };


  isFormValid2(): boolean {
    console.log(this.formData.direccion.length)
    console.log(this.formData.ncasa.length)
    console.log(this.formData.region.length)
    console.log(this.formData.ciudad.length)
    return (
      this.formData.direccion.length > 0 &&
      this.formData.ncasa.length > 0 &&
      this.formData.region.length > 0 &&
      this.formData.ciudad.length > 0
    );

  }
  onSubmit() {

    console.log('direccion:', this.formData.direccion);
    console.log('nCasa', this.formData.ncasa);
    console.log('region:', this.formData.region);
    console.log('ciudad:', this.formData.ciudad);

    this.entrega = 5990

    this.formData = {
      direccion: '',
      ncasa: '',
      region: '',
      ciudad: '',
    };
  }


  city: string = "";
  entrega = 0
  incrementar(id_producto: any, cantidad: any) {
    for (let i = 0; i < this.getCartDetails.length; i++) {
      if (this.getCartDetails[i].id_producto === id_producto) {
        this.getCartDetails[i].cantidad = cantidad + 1

        console.log("se agrego uno nuevo al producto ", this.getCartDetails[i].id_producto, this.getCartDetails[i].cantidad)
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails))
    this.cartNumberFunc()
    this.loadCart()
  }

  decrementar(id_producto: any, cantidad: any) {
    for (let i = 0; i < this.getCartDetails.length; i++) {
      if (this.getCartDetails[i].id_producto === id_producto) {
        this.getCartDetails[i].cantidad = cantidad - 1
        if (this.getCartDetails[i].cantidad == 0) {
          this.getCartDetails.splice(i, 1);
          localStorage.setItem('localCart', JSON.stringify(this.getCartDetails))
        }
      }
      localStorage.setItem('localCart', JSON.stringify(this.getCartDetails))
      console.log("aqui", this.getCartDetails)
      this.cartNumberFunc()
      this.loadCart()
    }
  }

  total: number = 0
  loadCart() {
    if (localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!)
      this.total = this.getCartDetails.reduce(function (acc: any, val: any) {
        return acc + (val.precio * val.cantidad)

      }, 0)
    }
  }

  getCartDetails: any = [];
  cartDetails() {
    if (localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!)
    }
  }
  cartNumber: number = 0
  async cartNumberFunc() {
    var cantidadaux = 0
    var cartValue = JSON.parse(localStorage.getItem('localCart')! || '[]');
    for (let j = 0; j < cartValue.length; j++) {
      var hola = cartValue[j].cantidad
      cantidadaux = hola + cantidadaux
      this.cartNumber = cantidadaux
    }
    if (cartValue.length == 0) {
      this.cartNumber = 0
    }
    this.auth.cartSubject.next(this.cartNumber)
  }

  changes: boolean = false
  valorEntrega = 0
  onSwitchChange(event: any): void {
    if (event.target.checked) {
      this.changes = true
    } else {
      this.changes = false
      this.entrega = 0
      this.city=""

    }
  }

  cuponcitos: any
  async cupones() {
    try {
      this.cuponcitos = await this.CarritoService.cupones(); // Utiliza el servicio para obtener el total de alumnos
      console.log('Total de cupone:', this.cuponcitos);
    } catch (error) {
      // Maneja los errores aquí
      console.error('Error al obtener el total de productos:', error);
    }
  }
  montoMinimo: number = 10000000000;
  descuento: number=0;
  usado:number=0;
  cupon: string = ''
  coincidencia() {
    console.log(this.cupon)
    this.CarritoService.getCupon(this.cupon).subscribe(response => {
      this.montoMinimo = response[0].monto_minimo;
      this.descuento = response[0].monto_descuento;
      // La respuesta del servidor está disponible en la variable `response`
      console.log(this.montoMinimo)
      if(this.montoMinimo > this.total){
        console.log("No puedes aplicar el codigo")
        this.descuento = 0;
      }else if(this.total >= this.montoMinimo && this.usado < 1){
        console.log("codigo aplicado")
        this.usado = 1
      }
    }, error => {
      console.log("el codigo no existe")
      this.montoMinimo = 10000000000;
      this.descuento = 0;
    });
  }


  // cupon: string = ''
  // async coincidencia() {
  //   this.CarritoService.getCupon(this.cupon).subscribe(response => {
  //     console.log(response)
  //   })
  //   // respuesta.subscribe((response) => {
  //   //   console.log(JSON.parse(response))
  //   //   // La respuesta del servidor está disponible en la variable `response`
  //   // });
  // }
}

// verCarrito() {
//   const carrito = this.CarritoComprasService.verCarrito(); // Suponiendo que tienes un método getCarrito en tu servicio
//   console.log(carrito);
// }
//   agregarProducto(producto: Producto) {
//     this.carrito.push(producto);
//     console.log(producto)
//   }

//   eliminarProducto(producto: Producto) {
//     const index = this.carrito.indexOf(producto);
//     if (index !== -1) {
//       this.carrito.splice(index, 1);
//     }
//   }
//   calcularTotal() {
//     let total = 0;
//     for (const producto of this.carrito) {
//       total += producto.precio;
//     }
//     return total;
//   }
// }

// interface Producto {
//   nombre: string;
//   precio: number;

interface Producto {
  nombre: string;
  precio: number;
}
