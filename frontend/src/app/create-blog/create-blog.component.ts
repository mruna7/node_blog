import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';
@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {
  //  BlogPost = new FormGroup({
  //     Image:new FormControl(''),
  //     Title: new FormControl(''),
  //     Content: new FormControl(''),
  //   });
  isEdit = false;
  blog: any;
  blogForm: FormGroup;
  changesSubmited = false;
  isCanceled = false;
  blogTitle = new FormControl(null, [Validators.required]);
  blogContent = new FormControl(null, [Validators.required]);
  imageUpload = new FormControl(null, [Validators.required]);
  UserId: any = ' ';
  loader: boolean=false;
  constructor(private blogservice: BlogService,private router: Router) {
    this.blogForm = new FormGroup({
      title: this.blogTitle,
      content: this.blogContent,
      imageUpload: this.imageUpload
    });
    this.UserId = localStorage.getItem('UserId');
  }

  ngOnInit(): void {}
  onCancel() {}
  onEditBlog() {}
  onCreateBlog() {
    this.loader=true
    this.changesSubmited = true;
    let postData = {
      title: this.blogTitle.value,

      content: this.blogContent.value,

      postType: 'Blog',

      img: this.imageUpload.value,

      userId: this.UserId
    };
    console.log(postData);
    this.blogservice.createNewBlog(postData).subscribe(data => {
      console.log(data);
      
    });
    this.loader=false;
    this.router.navigate(["dashboard"])
  }
}
