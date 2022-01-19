import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  postArraydummy = [
    {
      id: '1',
      title: 'blog1-title',
      content: 'test',
      postType: 'test',
      img: '',
      userId: '1',
      createdAt: '2022-01-04T23:16:08.000Z',
      updatedAt: '2022-01-04T23:16:12.000Z',
      UserId: '1',
      User: {
        id: '1',
        name: 'vikas',
        email: 'vikas.k.gupta@impetus.com',
        emailVerified: true,
        userType: 'Blogger',
        currentState: 'Active',
        createdAt: '2022-01-04T23:14:41.000Z',
        updatedAt: '2022-01-04T23:14:41.000Z'
      },
      PostActions: [{ PostCount: 1 }]
    },
    {
      id: '2',
      title: 'blog2-title',
      content: 'test',
      postType: 'test',
      img: '',
      userId: '1',
      createdAt: '2022-01-04T23:16:08.000Z',
      updatedAt: '2022-01-04T23:16:12.000Z',
      UserId: '1',
      User: {
        id: '1',
        name: 'vikas',
        email: 'vikas.k.gupta@impetus.com',
        emailVerified: true,
        userType: 'Blogger',
        currentState: 'Active',
        createdAt: '2022-01-04T23:14:41.000Z',
        updatedAt: '2022-01-04T23:14:41.000Z'
      },
      PostActions: [{ PostCount: 1 }]
    }
  ];
  postArray:any={};
  constructor(private blogservice:BlogService) {}
 

  ngOnInit(): void {
    this.blogservice.getBlogPosts().subscribe((data)=>{
      console.log(data);
      this.postArray=data;

    });
  }
}
