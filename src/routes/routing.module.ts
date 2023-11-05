import { Routes } from '@angular/router';


// GUARDS y RESOLVERS

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InicioComponent } from 'src/app/pages/inicio/inicio.component';
import { ProductosComponent } from 'src/app/pages/productos/productos.component';
import { AppComponent } from 'src/app/app.component';
import { ContactoComponent } from 'src/app/pages/contacto/contacto.component';


const routes: Routes = [
    {
        path: '',
        component: AppComponent
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
      component: ContactoComponent
  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class ProjectRoutingModule {}

