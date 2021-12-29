import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isloggedIn = (sessionStorage.getItem('email') !== undefined && sessionStorage.getItem('email') !== null) ? true : false;
  login_user_email = sessionStorage.getItem('email');
  login_user_name = sessionStorage.getItem('username');
  constructor() {
    //console.log('isloggedIn', this.isloggedIn);
    
  }

  ngOnInit() {
    if(sessionStorage.getItem('email') == undefined ||  sessionStorage.getItem('email') == null || sessionStorage.getItem('email') == ""){
      this.isloggedIn = false;
    }


  }
}
