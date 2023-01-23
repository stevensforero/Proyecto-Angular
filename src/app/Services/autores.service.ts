import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';
import { Autores } from '../Interfaces/autores';

@Injectable({
  providedIn: 'root'
})
export class AutoresService {
private endpoint:string = environment.endPoint;
private apirUrl:string = this.endpoint + "api/Autores";

  constructor(private http:HttpClient) { }

  getList():Observable<Autores[]>{
    return this.http.get<Autores[]>(`${this.apirUrl}`);
    }

    add(modelo:Autores):Observable<Autores>{
      return this.http.post<Autores>(`${this.apirUrl}guardar`,modelo);
    }
  
    
    update(idEmpleado:number,modelo:Autores):Observable<Autores>{
      return this.http.put<Autores>(`${this.apirUrl}actualizar/${idEmpleado}`,modelo);
    }
  
    delete(idEmpleado:number):Observable<void>{
      return this.http.delete<void>(`${this.apirUrl}eliminar/${idEmpleado}`);
    }


}
