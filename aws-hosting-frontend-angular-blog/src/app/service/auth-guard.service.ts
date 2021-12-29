import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private router: Router, private toastr: ToastrService) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let isUserLoggedIn = (sessionStorage.getItem('email') !== undefined && sessionStorage.getItem('email') !== null) ? true : false;
    return new Promise((resolve, reject) => {
      if (isUserLoggedIn) {
        resolve(true);
      } else {
        this.showToastr('You Are not allowed to access admin module.');
        this.router.navigate(['./']);
        resolve(false);
      }
    });
  }

  showToastr(message) {
    this.toastr.info(message, undefined, {
      closeButton: true,
      positionClass: 'toast-top-right'
    });
  }

}
