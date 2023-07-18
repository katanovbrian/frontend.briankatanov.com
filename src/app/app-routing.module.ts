import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from './core/core.module';
import { LoadChildren } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path:'', pathMatch: 'full', component: HomeComponent },
  { path:'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  { path:'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
  { path:'notebooks', loadChildren: () => import('./notebooks/notebooks.module').then(m => m.NotebooksModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule,
    FormsModule
  ]
})
export class AppRoutingModule { }
