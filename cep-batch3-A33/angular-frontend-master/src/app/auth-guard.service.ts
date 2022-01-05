import { AuthService } from './auth.service';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private auth_service:AuthService, private router:Router) { }

  canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean{
    console.log("is logged in", this.auth_service.is_logged_in())
    if(this.auth_service.is_logged_in()) return true
    
    // this.router.navigate(['/login']);
    window.location.href = 'https://test-admin-cep-batch-3-a33.auth.us-east-1.amazoncognito.com/login?client_id=38u71cvm7cuocrrjab7v31d7cm&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://dtufxwaslylj1.cloudfront.net/admin';
    return false;
  }
}
