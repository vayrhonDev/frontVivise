import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment'; // Asegúrate de importar el archivo de entorno correcto

@Injectable({
  providedIn: 'root'
})
export class productosServices {
  private baseUrl = environment.backend; // Utiliza la URL del backend desde el archivo de entorno

  constructor(private http: HttpClient) { }

  async obtenerInfo() {
    const url = `${this.baseUrl}/a`;
    try {
      const response = await firstValueFrom(this.http.get(url));
      console.log(response)
      return response;
    } catch (error) {
      // Maneja los errores aquí
      console.error('Error al obtener el total de alumnos:', error);
      throw error;
    }
  }
}
