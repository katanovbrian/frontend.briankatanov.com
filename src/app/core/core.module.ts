import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { CoreAppRoutingModule } from './core-app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NgParticlesModule } from "ng-particles";
@NgModule({
  declarations: [
    HomeComponent,
    TopNavComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    CoreAppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    NgParticlesModule
  ],
  exports: [
    HomeComponent,
    TopNavComponent,
    FooterComponent
  ],
  providers : [
    AuthService,
    AuthInterceptor
  ]
})
export class CoreModule { }
