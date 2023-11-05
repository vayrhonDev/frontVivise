import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/globalServices/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(
    private auth:AuthService
  ){
    this.auth.cartSubject.subscribe((data)=>{
      this.cartNumber = data
    })

  }

  ngOnInit(): void {
    this.cartNumberFunc();
  }
  cartNumber:number=0
  cartNumberFunc(){
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
}
