import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor( private http: HttpClient,) { }
  createNewBlog(blogData:any){
    console.log(blogData,"inside service")
   return this.http.post("https://hixqi0g738.execute-api.us-east-1.amazonaws.com/dev/createPost",blogData);
 
  }

  getBlogPosts(){
    return this.http.get("https://hixqi0g738.execute-api.us-east-1.amazonaws.com/dev/getAllPost");
  }
}
