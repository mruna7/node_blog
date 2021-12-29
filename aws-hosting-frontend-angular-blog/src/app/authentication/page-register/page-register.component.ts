import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-page-register',
    templateUrl: './page-register.component.html',
    styleUrls: ['./page-register.component.css']
})
export class PageRegisterComponent implements OnInit {
   
    constructor(private route: ActivatedRoute, private router: Router) { }


    ngOnInit() {
       
    }

    onSubmit() {
        this.router.navigate(['/authentication/page-login']);
    }

}
