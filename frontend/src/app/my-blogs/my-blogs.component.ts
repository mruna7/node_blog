import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.scss']
})
export class MyBlogsComponent implements OnInit {
  UserId: any;

  constructor() { }

  ngOnInit(): void {
    this.UserId=localStorage.getItem("UserId")
  }

}
