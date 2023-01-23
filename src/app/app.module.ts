import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Para trabajar con formularios reactivos
import {ReactiveFormsModule} from '@angular/forms';
//para trabajar con peticiones http
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
//Para trabajar con controles de formularios de material
import{MatFormFieldModule} from '@angular/material/form-field';
import{MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
// Sin este "MatNativeDateModule" no funcionaria "MatDatepickerModule" 
import {MatNativeDateModule} from '@angular/material/core';
import {MomentDateModule} from '@angular/material-moment-adapter';

//para trabajar con mensajes de alertas
import {MatSnackBarModule} from '@angular/material/snack-bar';

//Para trabajar con los íconos de material
import {MatIconModule} from '@angular/material/icon';

//Para trabajar con modales
import {MatDialogModule, MatDialogRef } from '@angular/material/dialog';

//Para trabaajr con grillas
import {MatGridListModule} from '@angular/material/grid-list';
import { HomeComponentComponent } from './home-component/home-component.component';
import { DialogAddEditComponentComponent } from './dialog-add-edit-component/dialog-add-edit-component.component';
import { DialogoDeleteComponentComponent } from './dialogo-delete-component/dialogo-delete-component.component';
import { ProyectosComponentComponent } from './proyectos-component/proyectos-component.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes:Routes=[
  {path:'', component:HomeComponentComponent},
  //{path:'empleados', component:DialogAddEditComponent},
  {path:'proyectos', component:ProyectosComponentComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    DialogAddEditComponentComponent,
    DialogoDeleteComponentComponent,
    ProyectosComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
