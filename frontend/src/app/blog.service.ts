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
    return this.http.post(environment.CREATE_POST, blogData);
  }

  getBlogPosts() {
    return this.http.get(environment.GET_ALL_POST);
  }
}
