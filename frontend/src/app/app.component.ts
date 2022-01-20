import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  UserType:string="Guest"
   ngOnInit(): void {
    localStorage.setItem("UserType",this.UserType);
   }
}
