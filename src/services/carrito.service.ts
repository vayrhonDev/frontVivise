import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment'; // Asegúrate de importar el archivo de entorno correcto
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private baseUrl = environment.backend;

  constructor(private http: HttpClient) { }

  async cupones() {
    const url = `${this.baseUrl}/cupones`;
    try {
      const response = await firstValueFrom(this.http.get(url));
      return response;
    } catch (error) {
      // Maneja los errores aquí
      console.error('Error al obtener el total de cupones:', error);
      throw error;
    }
  }
  getCupon(cupon: string): Observable<any> {
    const body = { cupon: cupon };
    const url = `${this.baseUrl}/getCupon`;
    return this.http.post(url, body);
  }
  // comparar:any
  // async getCupon(cupon: string){
  //   const body = {
  //     cupon: cupon,
  //   };
  //   const url = `${this.baseUrl}/getCupon`;
  //   return await this.http.post(url, body)
  //     // .subscribe({
  //     //   next: (response) => {

  //     //   },
  //     //   error: (error) => {
  //     //     // Maneja los errores aquí
  //     //   },
  //     //   complete: () => {
  //     //     // Maneja la lógica cuando la suscripción se completa (opcional)
  //     //   }
  //     // });
  // }

}





