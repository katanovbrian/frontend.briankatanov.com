import { Component } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {
  constructor(private authService:AuthService){}
  registerFlag = true;
  
  newUser = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  newPassword = new FormGroup({
    oldPassword : new FormControl(''),
    newPassword : new FormControl(''),
  })

  public isAdmin(){
    return this.authService.isAdmin();
  }

  public loggedIn(){
    return this.authService.loggedIn();
  }

  public getUsername(){
    return this.authService.getUsername();
  }
  
  showLoginForm(){
    this.registerFlag = false;
  }
  showRegisterForm(){
    this.registerFlag = true;
  }

  parseForm() : FormData {
    const formData = new FormData();
    formData.append('username', this.newUser.get('username')?.value || '');
    formData.append('email', this.newUser.get('email')?.value || '');
    formData.append('password', this.newUser.get('password')?.value || '');
    return formData
  }

  parsePasswordForm(){
    const formData = new FormData();
    formData.append('oldPassword', this.newPassword.get('oldPassword')?.value || '');
    formData.append('newPassword', this.newPassword.get('newPassword')?.value || '');
    return formData
  }

  submitRegister(){
    const formData = this.parseForm()
    this.authService.register(formData)
  }

  submitLogin(){
    const formData = this.parseForm()
    this.authService.login(formData)
  }

  submitPassword(){
    const formData = this.parsePasswordForm()
    this.authService.resetPassword(formData)
    this.clearFormPassword()
  }

  submitLogout(){
    this.authService.logout()
  }

  onSubmit(){
    if (this.newUser){
      if(this.registerFlag) {
        this.submitRegister();
      } else {
        this.submitLogin();
      }
    }
    this.clearForm()
  }

  clearForm() {
    this.newUser.reset()
  }

  clearFormPassword() {
    this.newPassword.reset()
  }

}
