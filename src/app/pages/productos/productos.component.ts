import { CSP_NONCE, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { productosServices } from 'src/services/productos.service';
import { CarritoComprasService } from '../../../services/compartidoCarritoProducto.service'
import { Producto } from '../carrito/interfaceProducto';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/globalServices/auth.service';
import { Button } from 'primeng/button';
// import { LocalStorageService } from 'ngx-webstorage';
// import { Session } from '@angular/common/http';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  carrito: any[] = []; // Estructura de datos para el carrito
  cantidadProductosEnCarrito: number = 0;
  copiaProducto: any;
  copiaPrecio: number = 0;
  productos: any;



  constructor(
    // @Inject(sessionStorage) private session: Session,
    private auth: AuthService,
    private Router: Router,
    private productosServices: productosServices,
    private CarritoComprasService: CarritoComprasService,
    // private localStorage:LocalStorageService
    // private session: Session
  ) {

  }


  async ngOnInit() {
    await this.productosServices.obtenerInfo().then(productos => {
      this.productos = productos;

      // this.carrito = this.session.get('cart') ?
      // JSON.parse(this.session.get('cart')) :
      // new Cart();
    });
    await this.cartDetails()
    await this.cartNumberFunc()
    await this.loadCart()
  }

  getCartDetails:any=[];



  incrementarPag(id_producto:any, cantidad:any){
    var chanchullo:number= 0
    this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!)
    for (let i = 0; i < this.getCartDetails.length; i++){
    if(this.getCartDetails[i].id_producto === id_producto){
      this.getCartDetails[i].cantidad =this.getCartDetails[i].cantidad +1
    }
    localStorage.setItem('localCart',JSON.stringify(this.getCartDetails))
    this.cartNumberFunc()
    this.loadCart()
  }
  }

  incrementar(id_producto:any, cantidad:any){
    console.log("id del producto", id_producto, "cantidad que sumamos", cantidad)
    for (let i = 0; i < this.getCartDetails.length; i++) {
      if(this.getCartDetails[i].id_producto === id_producto){
        this.getCartDetails[i].cantidad =cantidad +1
        console.log("se agrego uno nuevo al producto ",this.getCartDetails[i].id_producto, this.getCartDetails[i].cantidad)
      }
    }
    localStorage.setItem('localCart',JSON.stringify(this.getCartDetails))
    this.cartNumberFunc()
    this.loadCart()
  }
  x:boolean=false
  decrementar(id_producto:any, cantidad:any){
    for (let i = 0; i < this.getCartDetails.length; i++) {
      if(this.getCartDetails[i].id_producto === id_producto){
        if(this.getCartDetails[i].cantidad != 1){
          this.getCartDetails[i].cantidad =cantidad -1
        }
        this.x=true
        // if(this.getCartDetails[i].cantidad == 0){
        //   this.getCartDetails.splice(i,1);
        //   localStorage.setItem('localCart',JSON.stringify(this.getCartDetails))
        // }
      }
      localStorage.setItem('localCart',JSON.stringify(this.getCartDetails))

      console.log("aqui",this.getCartDetails)
      this.cartNumberFunc()
      this.loadCart()
    }
  }

  async eliminarProducto(getCartDetail:any){
    console.log(getCartDetail)
    if(localStorage.getItem('localCart')){
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!)
      for (let i = 0; i < this.getCartDetails.length; i++){
        if(this.getCartDetails[i].id_producto == getCartDetail.id_producto ){
          this.getCartDetails.splice(i,1);
          console.log(this.getCartDetails)
          localStorage.setItem('localCart',JSON.stringify(this.getCartDetails))
        }
      }
    }
    await this.cartDetails();
    this.cartNumberFunc()

  }

  id2=0
  itemsCart:any=[];
  goToCart(producto:Producto){
    let cartDataNull = localStorage.getItem('localCart')
    if(cartDataNull == null){
      let storeDataGet:any =[];
      storeDataGet.push(producto)
      localStorage.setItem('localCart',JSON.stringify(storeDataGet))
      this.id2 = 1
      console.log("lo agregó")
    }else if(cartDataNull != null){
      var id = producto!.id_producto;
      let index:number = -1;
      this.itemsCart = JSON.parse(localStorage.getItem('localCart')!);
      for (let i = 0; i< this.itemsCart.length; i++) {
        if(id === this.itemsCart[i].id_producto){
          index=i
          this.id2=0
          console.log("aqui está repetido")
          break

        }
      }
      if(index ==-1){
        this.itemsCart.push(producto);
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart))
        console.log(this.itemsCart)
        this.id2=1
        console.log("Agregado nuevo")
      }else{
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart))
        this.incrementarPag(producto.id_producto, producto.cantidad)
        console.log("agregado")
      }
    }else if(this.id2 != 1){
      this.incrementarPag(producto.id_producto, producto.cantidad)
      console.log("hola")
    }
    this.cartNumberFunc();
  }
  b:Boolean=false
  validar2:any
  validar(producto:Producto){
    this.validar2 = JSON.parse(localStorage.getItem('localCart')!);
    var id = producto!.id_producto;
    let index:number = -1;
    this.itemsCart = JSON.parse(localStorage.getItem('localCart')!);
    for (let i = 0; i< this.validar2.length; i++) {
      if(this.itemsCart[i].id_producto === this.validar2[i].id_producto){
        this.b = true
      }
    }
  }

  cartNumber:number=0
  async cartNumberFunc(){

    var cantidadaux=0
    var cartValue = JSON.parse(localStorage.getItem('localCart')! || '[]');
    for (let j = 0; j< cartValue.length; j++){
      var hola = cartValue[j].cantidad
      cantidadaux = hola + cantidadaux
      this.cartNumber = cantidadaux
    }
    if (cartValue.length==0){
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


  total:number=0
  loadCart(){
    if(localStorage.getItem('localCart')){
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!)
      this.total=this.getCartDetails.reduce(function(acc:any, val:any){
        return acc + (val.precio * val.cantidad)

      },0)
    }
  }

  quitarTodos(){
    localStorage.removeItem('localCart');
    this.getCartDetails = []
    this.total = 0
    this.cartNumber = 0
    this.auth.cartSubject.next(this.cartNumber)
  }






  // Propiedades

  verCaracteristicas() {
    if (this.carrito.length > 0) {
    }
  }

  // agregarProducto(producto: Producto) {
  //   // Verifica si el producto ya está en el carrito
  //   const productoExistente = this.carrito.find((item) => item.id_producto === producto.id_producto);
  //   if (productoExistente) {
  //     // Si el producto existe, aumenta su cantidad
  //     this.cantidadProductosEnCarrito++;
  //   } else {
  //     // Si el producto no existe, agrega una nueva entrada al carrito
  //     this.carrito.push({ ...producto, cantidad: 1 });
  //   }
  // }








  // Función para eliminar un producto del carrito por su id_producto

  async totalProductos() {
    try {
      this.productos = await this.productosServices.obtenerInfo(); // Utiliza el servicio para obtener el total de alumnos
      console.log('Total de productos:', this.productos);
    } catch (error) {
      // Maneja los errores aquí
      console.error('Error al obtener el total de productos:', error);
    }


  }


  //   aux:any
  //   agregarAlCarrito(producto: Producto) {
  //     this.aux=producto
  //     this.CarritoComprasService.agregarProducto(this.aux)
  //   }
  // }

}


