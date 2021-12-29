import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {
  baseurl: string = 'https://s9nibbaptk.execute-api.us-east-1.amazonaws.com/dev3/';
  //private allPostBaseUrl = 'https://s9nibbaptk.execute-api.us-east-1.amazonaws.com/dev3/posts/list';
  constructor(private http: HttpClient) { }

  getAllPosts() {
    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin', '*');
    let url: string = this.baseurl + 'posts/list';
    return this.http.get(url, {'headers':headers})


  }

  getSingleBlogByPostId(blogId) {
    let signlePostUrl = this.baseurl + 'posts/' + blogId;
    return this.http.get(signlePostUrl)
  }

  createNewPost(data) {
    let userInfo = this.getUserInfo();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + userInfo.token);
    let createPostUrl = this.baseurl + 'posts/create';
    return this.http.post(createPostUrl, data, { 'headers': headers });
  }

  likePostById(blogId) {
    let userInfo = this.getUserInfo();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + userInfo.token);
    let likeApiUrl = this.baseurl + 'posts/like/' + blogId;
    return this.http.put(likeApiUrl, {}, { 'headers': headers });
  }

  checkIfUserReviewer() {
    let userGroup = sessionStorage.getItem('group');
    if (userGroup == 'reviewer') {
      return true;
    } else {
      return false;
    }
  }

  getBlogsToReview() {
    let userInfo = this.getUserInfo();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + userInfo.token);
    let url: string = this.baseurl + 'posts/review';
    return this.http.get(url, { 'headers': headers })
  }

  approveBlogById(blogId) {
    let userInfo = this.getUserInfo();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + userInfo.token);

    let url: string = this.baseurl + 'posts/approve/' + blogId;
    return this.http.put(url, {}, { 'headers': headers });
  }

  getUserInfo() {
    let userGroup = sessionStorage.getItem('group');
    let userName = sessionStorage.getItem('username');
    let userEmail = sessionStorage.getItem('email');
    let token = sessionStorage.getItem('token');
    return { 'userName': userName, 'userGroup': userGroup, 'userEmail': userEmail, 'token': token }
  }

}
