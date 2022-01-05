import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private add_blog_url:string = 'https://3va8g3koul.execute-api.us-east-1.amazonaws.com/dev/article/';
  private get_all_blogs_url:string = 'https://3va8g3koul.execute-api.us-east-1.amazonaws.com/dev/fetcharticles';
  private get_all_blogs_admin_url:string = 'https://3va8g3koul.execute-api.us-east-1.amazonaws.com/dev/articles';
  private get_single_blog_url:string = 'https://3va8g3koul.execute-api.us-east-1.amazonaws.com/dev/fetcharticle/';
  private get_single_blog_url_admin:string = 'https://3va8g3koul.execute-api.us-east-1.amazonaws.com/dev/article/';
  private delete_blog_url:string = 'https://3va8g3koul.execute-api.us-east-1.amazonaws.com/dev/article/';
  private update_blog_url:string = 'https://3va8g3koul.execute-api.us-east-1.amazonaws.com/dev/article/';
  constructor(private http:HttpClient) { }

  add_blog(blog_props:Object){
    const headerDict = {
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': localStorage.getItem('auth_token')
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.post(this.add_blog_url,blog_props, requestOptions);
  }

    get_all_blogs(){

    const headerDict = {
      // 'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': localStorage.getItem('auth_token_normal')
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return this.http.get(this.get_all_blogs_url, requestOptions);
  }

  get_single_blog(blog_id:string){
    const headerDict = {
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': localStorage.getItem('auth_token_normal')
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    }; 
    return this.http.get(this.get_single_blog_url + blog_id, requestOptions);
  }

  get_all_blogs_admin(){
    // const httpOptions = {
    //   headers: new Headers({
    //     'Access-Control-Allow-Origin':'*',
    //     'Authorization': localStorage.getItem('auth_token')
    //   })
    // };

    const headerDict = {
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': localStorage.getItem('auth_token')
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    console.log("request options", requestOptions)
    return this.http.get(this.get_all_blogs_admin_url,requestOptions);
  }



  get_single_blog_admin(blog_id:string){
    const headerDict = {
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'text/html',
      'Accept': 'text/html',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': localStorage.getItem('auth_token')
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.get(this.get_single_blog_url_admin + blog_id, requestOptions);
  }

  update_blog(blog_props: Object, blog_id:string){
    const headerDict = {
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'text/html',
      'Accept': 'text/html',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': localStorage.getItem('auth_token')
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.put(this.update_blog_url + blog_id, blog_props, requestOptions);
  }

  delete_blog(id:string){
    const headerDict = {
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': localStorage.getItem('auth_token')
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.delete(this.delete_blog_url + id, requestOptions);
  }
}
