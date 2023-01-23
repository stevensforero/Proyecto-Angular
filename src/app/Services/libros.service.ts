import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';
import { Libros } from '../Interfaces/libros';


@Injectable({
  providedIn: 'root'
})
export class LibrosService {
//librosUrl = "https://localhost:44328/api/Libros/Get";
private endpoint:string = environment.endPoint;
private apirUrl:string = this.endpoint + "api/Libros/";

  constructor(private http:HttpClient) { }
  getList():Observable<Libros[]>{
    return this.http.get<Libros[]>(`${this.apirUrl}Get`);
  }

  add(modelo:Libros):Observable<Libros>{
    return this.http.post<Libros>(`${this.apirUrl}InsertLibros`,modelo);
  }

  
  update(idLibro:number,modelo:Libros):Observable<Libros>{
    return this.http.put<Libros>(`${this.apirUrl}ModificarLibros/${idLibro}`,modelo);
  }

  delete(idLibro:number):Observable<void>{
    return this.http.delete<void>(`${this.apirUrl}EliminarLibros/${idLibro}`);
  }
}
