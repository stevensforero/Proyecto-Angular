import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA}from '@angular/material/dialog'
import { Libros } from '../Interfaces/libros';

@Component({
  selector: 'app-dialogo-delete-component',
  templateUrl: './dialogo-delete-component.component.html',
  styleUrls: ['./dialogo-delete-component.component.css']
})
export class DialogoDeleteComponentComponent implements OnInit {
  constructor(
    private dialogoReferencia:MatDialogRef<DialogoDeleteComponentComponent>,
   
    // Sirve para agregar la data que se recibe del método que está llamando a ést dialogo
    @Inject(MAT_DIALOG_DATA)public dataEmpleado:Libros
    ) {

    }

    ngOnInit(): void {
      
    }
    confirmar_Eliminar(){
      if(this.dataEmpleado){
        this.dialogoReferencia.close("Eliminar")
      }
    }

}

