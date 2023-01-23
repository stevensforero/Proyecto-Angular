import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Autores } from '../Interfaces/autores';
import { Libros } from '../Interfaces/libros';
import { LibrosService } from '../Services/libros.service';
import { AutoresService } from '../Services/autores.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddEditComponentComponent } from '../dialog-add-edit-component/dialog-add-edit-component.component';
import { DialogoDeleteComponentComponent } from '../dialogo-delete-component/dialogo-delete-component.component';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements AfterViewInit,OnInit{
  displayedColumns: string[] = ['LibroTitulo', 'LibroGenero', 'NumeroPaginas','Autores','LibroFecha','Acciones'];
  dataSource = new MatTableDataSource<Libros>();
  constructor(
    private _librosServicio:LibrosService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar 
    ){

    }
    ngOnInit(): void {
      this.mostrarEmpleados();
      
    }
    @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarEmpleados(){
    
    this._librosServicio.getList().subscribe({
      next:(dataResponse)=>{
        console.log(dataResponse)
        
        this.dataSource.data = dataResponse;
      },error:(e)=>{}
      
    })      
    }

    dialogoNuevoEmpleado() {
      this.dialog.open(DialogAddEditComponentComponent,{
        disableClose:true,
        width:"350px"
      }).afterClosed().subscribe(resultado=>{
        if(resultado==="Creado"){
          this.mostrarEmpleados();
        }
      })
    }

    dialogoEditarEmpleado(dataEmpleado:Libros) {
      this.dialog.open(DialogAddEditComponentComponent,{
        disableClose:true,
        width:"350px",
        data:dataEmpleado
      }).afterClosed().subscribe(resultado=>{
        if(resultado==="Editado"){
          this.mostrarEmpleados();
        }
      })
    }
    
    mostrarAlerta(msg: string, accion: string) {
      this._snackBar.open(msg, accion,{
        horizontalPosition:"end",
        verticalPosition:"top",
        duration:3000
      });
    }
    
    dialogoEliminarEmpleado(dataEmpleado:Libros){
      this.dialog.open(DialogoDeleteComponentComponent,{
        disableClose:true, 
        data:dataEmpleado
      }).afterClosed().subscribe(resultado=>{
        if(resultado==="Eliminar"){
          this._librosServicio.delete(dataEmpleado.idLibro).subscribe({
            next:(data)=>{
              this.mostrarAlerta("Libro fue eliminado","Listo");
              this.mostrarEmpleados();
            },error:(e)=>{}
          })
        }
      })
    }
}
