import { Component } from '@angular/core';
import { AuthService } from 'src/globalServices/auth.service';

@Component({
  selector: 'app-boton-carrito',
  templateUrl: './boton-carrito.component.html',
  styleUrls: ['./boton-carrito.component.css']
})
export class BotonCarritoComponent {



  constructor(
    private auth: AuthService
  ) { }

  async ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    await this.cartDetails()
    await this.cartNumberFunc()
    await this.loadCart()
  }


  getCartDetails: any = [];



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

  async eliminarProducto(getCartDetail: any) {
    console.log(getCartDetail)
    if (localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!)
      for (let i = 0; i < this.getCartDetails.length; i++) {
        if (this.getCartDetails[i].id_producto == getCartDetail.id_producto) {
          this.getCartDetails.splice(i, 1);
          console.log(this.getCartDetails)
          localStorage.setItem('localCart', JSON.stringify(this.getCartDetails))
        }
      }
    }
    await this.cartDetails();
    this.cartNumberFunc()

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

  cartDetails() {
    if (localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!)
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
  quitarTodos(){
    localStorage.removeItem('localCart');
    this.getCartDetails = []
    this.total = 0
    this.cartNumber = 0
    this.auth.cartSubject.next(this.cartNumber)
  }
}
