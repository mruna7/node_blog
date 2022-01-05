import { BlogService } from './../api-calls/blog.service';
import { Component, OnInit } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

interface Blog{
  title:string,
  feature_image:string,
  created_at:string,
  content:string
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  private all_blogs: Blog[] = [];
  constructor(private blog_service:BlogService, private jwtHelper:JwtHelperService) { }

  ngOnInit() {
    if (this.is_logged_in()) {
    this.load_all_blogs();
    } else {
      window.location.href = "https://test-cep-batch-3-a33.auth.us-east-1.amazoncognito.com/login?client_id=1n66cmohcp9qjje5s61l2lsg1h&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://dtufxwaslylj1.cloudfront.net/home";
    }
  }

  load_all_blogs(){
    this.blog_service.get_all_blogs().subscribe((response:any)=>{
      console.log(response)
      response.forEach((element:any) => {
        this.all_blogs.push(element);
      });
    })
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
  
    if (idToken) {
      localStorage.setItem('auth_token_normal', idToken);
    }

    const token = localStorage.getItem('auth_token_normal');
    if(!token) return false

    const is_expired = this.jwtHelper.isTokenExpired(token);

    return !is_expired;
  }



}
