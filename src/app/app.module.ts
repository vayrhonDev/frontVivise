import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

//componentes
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { AppComponent } from './app.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { FooterComponent } from './pages/footer/footer.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { BotonCarritoComponent } from './pages/botonCarrito/boton-carrito.component';
import { CarritoComponent } from './pages/carrito/carrito.component';

//modulos
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule
import { ButtonModule } from 'primeng/button'; // Importa el módulo de botones de PrimeNG
import { CarouselModule } from 'primeng/carousel';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CheckboxModule} from 'primeng/checkbox';



@NgModule({
  declarations: [
    InicioComponent,
    ProductosComponent,
    AppComponent,
    ContactoComponent,
    CarritoComponent,
    LoginComponent,
    RegistroComponent,
    FooterComponent,
    NavbarComponent,
    BotonCarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    CarouselModule,
    FormsModule,
    DialogModule,
    RadioButtonModule,
    CheckboxModule,
  ],
  providers: [Subject],
  bootstrap: [AppComponent]
})
export class AppModule { }
