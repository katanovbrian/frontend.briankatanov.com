import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotebooksComponent } from './components/notebooks/notebooks.component';

const routes: Routes = [{ path: '', component: NotebooksComponent }];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class NotebooksAppRoutingModule { }
