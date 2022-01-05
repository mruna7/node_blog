import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private login_url:string = 'http://localhost:5000/login';
  constructor(private http:HttpClient, private jwtHelper:JwtHelperService,private router:Router, private route: ActivatedRoute) { }

  login(credentials:Object){
    return this.http.post(this.login_url, credentials);
  }

  is_logged_in(){

    var hash = window.location.hash.substr(1);

    var result = hash.split('&').reduce(function (result, item) {
        var parts = item.split('=');
        result[parts[0]] = parts[1];
        return result;
    }, {});
    const idToken: string = result["id_token"]
    // const idToken: string = ""
    console.log("idToken is ", idToken);
    if (idToken) {
      localStorage.setItem('auth_token', idToken);
    }

    const token = localStorage.getItem('auth_token');
    if(!token) return false

    const is_expired = this.jwtHelper.isTokenExpired(token);
    console.log("Token details", this.jwtHelper.decodeToken(token))
    return !is_expired;
  }

  logout(){
    localStorage.removeItem('auth_token');
    this.router.navigate(['']);
  }
}
