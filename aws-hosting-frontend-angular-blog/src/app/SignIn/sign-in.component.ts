import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  idToken: string;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    
    const url:any = this.router.url;
        const mySubString:any = url.substring(
          url.lastIndexOf('id_token=') + 9,
          url.lastIndexOf('&access_token')
        );
        sessionStorage.setItem('token', mySubString);
        
        let decoded:any = jwt_decode(mySubString);
        
        console.log('decoded', decoded);

        sessionStorage.setItem('email', decoded["email"]);
        sessionStorage.setItem('username', decoded["cognito:username"]);
        var groups = decoded["cognito:groups"]; // sessionStorage.setItem('username', decoded["cognito:groups"]);
        console.log('groups', groups);
        if(groups === undefined) {         
          sessionStorage.setItem('group', 'user');
        } else {
          console.log('groups', groups[0]);
          sessionStorage.setItem('group', groups[0]);
        }
        
        if(sessionStorage.getItem('group') === 'user') {
          this.router.navigate(['/admin/blogs/blog-list']);
        } else {
          this.router.navigate(['./admin/reviewPost']);
        }
       // sessionStorage.getItem('email');
  }

}
