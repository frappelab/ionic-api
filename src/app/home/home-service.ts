import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TaskDTO, Task } from "./tasks.model";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {

  private postman = inject(HttpClient);
  private URL = 'https://todo-api-7i4r.onrender.com/api/v1/task';


  listarTareas(): Observable<Task[]> {
    return this.postman.get<Task[]>(this.URL);
  }

  crearTarea(miTarea: TaskDTO): Observable<Task> {
    return this.postman.post<Task>(this.URL, miTarea);
  }

  obtenerTarea(id: string): Observable<Task> {
    return this.postman.get<Task>(`${this.URL}/${id}`);
  }

  actualizarTarea(id: string, cambios: TaskDTO): Observable<Task> {
    return this.postman.put<Task>(`${this.URL}/${id}`, cambios);
  }

  eliminarTarea(id: string, cambios: TaskDTO): Observable<void> {
    return this.postman.delete<void>(`${this.URL}/${id}`);
  }

}
