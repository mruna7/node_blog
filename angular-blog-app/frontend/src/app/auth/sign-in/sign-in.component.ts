import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { HeaderComponent } from 'src/app/header/header.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  isLoading: boolean = false;
  email_address: string = "";
  password: string = "";
  userId:string="";
  constructor(private router: Router,private http:HttpClient,private head:HeaderComponent) { }

  ngOnInit(): void { 

  }
  getuser(userId: string){
    
    return this.http.get(environment.GET_USER + userId);

  }
  onSignIn(form: NgForm){
    if (form.valid) {
      this.isLoading = true;
      let authenticationDetails = new AuthenticationDetails({
          Username: this.email_address,
          Password: this.password,
      });
      let poolData = {
        UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
        ClientId: environment.cognitoAppClientId // Your client id here
      };

      let userPool = new CognitoUserPool(poolData);
      let userData = { Username: this.email_address, Pool: userPool };
      var cognitoUser = new CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: async (data) => {
          let tokens= data.getIdToken().getJwtToken();
           localStorage.setItem("token",tokens)
          console.log(data);
          console.log(data.getIdToken().payload['cognito:username'])
          this.userId=data.getIdToken().payload['cognito:username'];
          await this.getuser(this.userId).subscribe((data:any)=>{
            
            localStorage.setItem("UserId",this.userId);
            localStorage.setItem("UserType",data.userType);
            localStorage.setItem("isUserLoggedin","true");
            this.router.navigate(["dashboard"]).then(()=>{
              this.head.ngOnInit();
            })

          });
        },
        onFailure: (err) => {
          alert(err.message || JSON.stringify(err));
          this.isLoading = false;
        },
      });
    }
  }
  
}
