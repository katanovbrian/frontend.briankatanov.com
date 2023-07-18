import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuthResponse {
  message:string
  token:string
  error?:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  
  isLoggedIn : boolean;

  constructor(private http:HttpClient) {
    // or try to login using this value if it exists
    if (this.getAuthorizationToken()) {
      console.log(typeof(this.getAuthorizationToken()))
      console.log(this.getAuthorizationToken())
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
   }

  public getRoles() {
    const token = this.getAuthorizationToken()
    const decoded = token && this.parseJwt(token)
    const roles = decoded.roles.map((x:{value:string})=>x.value)
    return roles;
  }

  public getUsername() {
    const token = this.getAuthorizationToken()
    const decoded = token && this.parseJwt(token)
    return decoded.name

  }

  public hasRole(role : String) {
    const roles = this.getRoles()
    return roles.includes(role)
  }

  public isMaintainer() {
    return this.hasRole('MAINTAINER');
  }

  public canEdit() {
    return this.isLoggedIn && (this.isAdmin() || this.isMaintainer())
  }


  public isAdmin(){
    return this.hasRole('ADMIN');
  }

  public loggedIn(){
    return this.isLoggedIn;
  }

  getAuthorizationToken() : string | null {
    return localStorage.getItem('token') || null
  }

  setAuthorizationToken(tkn:string){
    localStorage.setItem('token',tkn)
  }

  deleteAuthorizationToken(){
    localStorage.removeItem('token')
  }

  parseJwt (token:string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

  login(formData:FormData){
    let url='/auth/login/password';
    this.http.post<AuthResponse>(url,formData)
    .subscribe({
      next: (response) => {
        this.isLoggedIn = true;
        console.log(response)
        console.log(this.parseJwt(response.token))
        this.setAuthorizationToken(response.token)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  logout(){
    let url='/auth/logout';
    this.http.post(url,{})
    .subscribe({
      next: () => {
        this.isLoggedIn = false;
        this.deleteAuthorizationToken()
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  register(formData:FormData){
    let url='/auth/register';
    this.http.post<AuthResponse>(url,formData)
    .subscribe({
      next: (response) => {
        this.isLoggedIn = true;
        console.log(response.message)
        this.setAuthorizationToken(response.token)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  resetPassword(formData:FormData){
    let url='/auth/password-reset';
    this.http.post(url,formData)
    .subscribe({
      next: (response) => {
        console.log(response)
        this.logout()
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  
}
