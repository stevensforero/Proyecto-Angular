import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
// "MAT_DIALOG_DATA es para obtener los datos a traves de los datos"
import {MatDialogRef, MAT_DIALOG_DATA,MatDialogModule}from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS} from '@angular/material/core';
import * as moment from 'moment';
import { Autores } from '../Interfaces/autores';
import { Libros } from '../Interfaces/libros';
import { AutoresService } from '../Services/autores.service';
import { LibrosService } from '../Services/libros.service';
import { HomeComponentComponent } from 'src/app/home-component/home-component.component';

export class DatepickerOverviewExample {}

export const MY_DATE_FORMATS = {
  parse:{
    dateInput:'DD/MM/YYYY',
  },
  display:{
    dateInput:'DD/MM/YYYY',
    monthYearLabel:'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel:'MMMM YYYY'
    
  }
}

@Component({
  selector: 'app-dialog-add-edit-component',
  templateUrl: './dialog-add-edit-component.component.html',
  styleUrls: ['./dialog-add-edit-component.component.css'],
  providers:[
    {provide:MAT_DATE_FORMATS,useValue:MY_DATE_FORMATS}
  ]
})
export class DialogAddEditComponentComponent {
  formEmpleado:FormGroup;
  tituloAccion:string = "Nuevo";
  botonAccion:string = "Guardar";
  listaAutores:Autores[]=[];

  constructor(
    private dialogoReferencia:MatDialogRef<DialogAddEditComponentComponent>,
    private tb:FormBuilder,
    private _snackBar: MatSnackBar,
    private _autoresServicio:AutoresService,
    private _librosServicio: LibrosService,
    // Sirve para agregar la data que estamos recibiendo del método que está llamando a ést dialogo
    @Inject(MAT_DIALOG_DATA)public dataEmpleado:Libros
    ){
  
      this.formEmpleado = this.tb.group({
        libroTitulo:['',Validators.required],
        libroGenero:['',Validators.required],
        numeroPaginas:['',Validators.required],
        idAutor:[``,Validators.required],
        libroFecha:[``,Validators.required]
      })
  
      this._autoresServicio.getList().subscribe({
        next:(data)=>{
          console.log(data);
          this.listaAutores = data;
        },error:(e)=>{}
      })
  }


  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    });
  }
  
  addEditEmpleado(){
    
    console.log(this.formEmpleado.value)
    const modelo:Libros = {
      idLibro:0,
      libroTitulo:this.formEmpleado.value.libroTitulo,
      libroGenero:this.formEmpleado.value.libroGenero,
      numeroPaginas:this.formEmpleado.value.numeroPaginas,
      idAutor:this.formEmpleado.value.idAutor,
      libroFecha:moment(this.formEmpleado.value.libroFecha).format("DD/MM/YYYY")
      
    }
  
    if(this.dataEmpleado == null){
      this._librosServicio.add(modelo).subscribe({
        next:(data)=>{
          this.mostrarAlerta("Autor fue creado","Listo");
          this.dialogoReferencia.close("Creado");
        },error:(e)=>{
          this.mostrarAlerta("No se pudo crear","Error");
        }
      })
    }else{
      this._librosServicio.update(this.dataEmpleado.idLibro, modelo).subscribe({
        next:(data)=>{
          this.mostrarAlerta("Autor fue editado","Listo");
          this.dialogoReferencia.close("Editado");
        },error:(e)=>{
          this.mostrarAlerta("No se pudo editar","Error");
        }
      })
    }
   
    
  }
  
    ngOnInit():void{
      if(this.dataEmpleado){
        this.formEmpleado.patchValue({
          libroTitulo:this.dataEmpleado.libroTitulo,
          libroGenero:this.dataEmpleado.libroGenero,
          numeroPaginas:this.dataEmpleado.numeroPaginas,
          idAutor:this.dataEmpleado.idAutor,
          libroFecha:moment(this.dataEmpleado.libroFecha,'DD/MM/YYYY'),
        })
        this.tituloAccion = "Editar";
        this.botonAccion = "Actualizar";
      }
  
  
  }

}
