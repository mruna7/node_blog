import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService ) { }

  ngOnInit(): void {
    sessionStorage.clear();
    this.router.navigate(['./']);
    this.showToastr();
  }

  showToastr() {
    this.toastr.info('Logout Succesfull', undefined, {
        closeButton: true,
        positionClass: 'toast-top-right'
    });
  }


}
