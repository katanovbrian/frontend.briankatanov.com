import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotebooksComponent } from './components/notebooks/notebooks.component';
import { NotebooksAppRoutingModule } from './notebooks-app-routing.module';



@NgModule({
  declarations: [
    NotebooksComponent
  ],
  imports: [
    CommonModule,
    NotebooksAppRoutingModule
  ]
})
export class NotebooksModule { }
