import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlogService } from '../blog.service';
@Component({
  selector: 'app-read-blog',
  templateUrl: './read-blog.component.html',
  styleUrls: ['./read-blog.component.scss']
})
export class ReadBlogComponent implements OnInit{
  private routeSub: Subscription = new Subscription;
  postAction: any;
  id: any;
 constructor(private route: ActivatedRoute,private blog:BlogService){
   
 }
 public postData: any = {};
ngOnInit(): void {
  this.routeSub = this.route.params.subscribe((params: Params): void => {
    const postid = params['id'];
    this.blog.get_blog_details(postid).subscribe((data: any)=>{
      this.postData=data;
    })
    console.log(postid);
    this.id=localStorage.getItem("UserId");
});


}

dislikePost(postID: any){
  console.log("dislike");
  this.postAction={
   "postId" : postID,
   "userId": this.id,
   "actionType": "dislike",
  }
  this.blog.dislikePost(this.postAction).subscribe((data)=>{
   console.log(data);
 })
   }
   likePost(postID:any){
     this.postAction={
       "postId" : postID,
       "userId": this.id,
       "actionType": "like",
      }
     this.blog.likePost(this.postAction).subscribe((data)=>{
       console.log(data);
     })
  console.log("like");
   }
ngOnDestroy(): void {
  this.routeSub.unsubscribe();
}
}
