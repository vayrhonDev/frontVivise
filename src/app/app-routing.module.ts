import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [

  {
    path: '',
    component: InicioComponent
  },
  {
    path: 'productos',
    component: ProductosComponent
  },
  {
    path: 'contacto',
    component: ContactoComponent
  },
  {
    path: 'cart',
    component: CarritoComponent
  },
  {
    path: '', redirectTo: '/productos', pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
