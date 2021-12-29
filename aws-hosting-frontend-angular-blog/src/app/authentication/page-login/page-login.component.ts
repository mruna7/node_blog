import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-page-login',
	templateUrl: './page-login.component.html',
	styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {

	constructor(private route: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		const url = this.router.url;
	}

	onSubmit(){
		this.router.navigate(['/admin/dashboard/index']);
	}
}
