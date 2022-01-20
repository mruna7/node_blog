import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(private http: HttpClient) {}
  createNewBlog(blogData: any) {
    console.log(blogData, 'inside service');
    return this.http.put(environment.CREATE_POST,blogData);
  }
  get_blog_details(id:string){

    return this.http.get(environment.GET_SINGLE_POST+'/'+id)

  }
  getBlogPosts() {
    return this.http.get(environment.GET_ALL_POST);
  }
  dislikePost(action:any){
   return this.http.put(environment.POST_ACTION,action);
  }
  likePost(action:any){
    return this.http.put(environment.POST_ACTION,action);
  }
}
