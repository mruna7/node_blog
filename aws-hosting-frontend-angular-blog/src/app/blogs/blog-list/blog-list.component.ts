import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EChartOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';
import {BlogServiceService} from '../blog-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-blog-list',
	templateUrl: './blog-list.component.html',
	styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

	public visitorsOptions: EChartOption = {};
	public visitsOptions: EChartOption = {};
	public sidebarVisible: boolean = true;
	public blogsList: any = [];
	pageOfItems: Array<any>;
	isloggedIn = (sessionStorage.getItem('email') !== undefined && sessionStorage.getItem('email') !== null) ? true : false;


	constructor(private sidebarService: SidebarService, private cdr: ChangeDetectorRef, private blogService: BlogServiceService,
		private route: ActivatedRoute, private router: Router) {
		this.visitorsOptions = this.loadLineChartOptions([3, 5, 1, 6, 5, 4, 8, 3], "#49c5b6");
		this.visitsOptions = this.loadLineChartOptions([4, 6, 3, 2, 5, 6, 5, 4], "#f4516c");	
	}
	onChangePage(pageOfItems: Array<any>) {
        // update current page of items
        this.pageOfItems = pageOfItems;
    }

	ngOnInit() {		
		this.getAllPosts();
	}

	toggleFullWidth() {
		this.sidebarService.toggle();
		this.sidebarVisible = this.sidebarService.getStatus();
		this.cdr.detectChanges();
	}

	getAllPosts() {
		this.blogService.getAllPosts().subscribe(resp => {
			let response: any = resp;
			if (this.isloggedIn && window.location.href.indexOf('admin/blogs/my-blogs') > 0) {
				let userInfo = this.blogService.getUserInfo();
				this.blogsList = response.filter(response => response.emailAddress == userInfo.userEmail);
				this.blogsList = this.showApprovedBlogsOnly(this.blogsList);
			} else {
				this.blogsList = this.showApprovedBlogsOnly(response);				
			}
		})
	}

	showApprovedBlogsOnly(response) {		
		response = response.sort((val1, val2)=> {return new Date(val2.createdDate).valueOf() - new Date(val1.createdDate).valueOf()})
		return this.blogsList = response.filter(response => response.isVerified == "true");
	}

	increasePostLike(blogId, blogIndex) {
		this.blogsList[blogIndex]['likeCount']= this.blogsList[blogIndex]['likeCount']+1;
		this.blogService.likePostById(blogId).subscribe(resp =>{})
	}

	loadLineChartOptions(data, color) {
		let chartOption: EChartOption;
		let xAxisData: Array<any> = new Array<any>();

		data.forEach(element => {
			xAxisData.push("");
		});

		return chartOption = {
			xAxis: {
				type: 'category',
				show: false,
				data: xAxisData,
				boundaryGap: false,
			},
			yAxis: {
				type: 'value',
				show: false
			},
			tooltip: {
				trigger: 'axis',
				formatter: function (params, ticket, callback) {
					return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>' + params[0].value;
				}
			},
			grid: {
				left: '0%',
				right: '0%',
				bottom: '0%',
				top: '0%',
				containLabel: false
			},
			series: [{
				data: data,
				type: 'line',
				showSymbol: false,
				symbolSize: 1,
				lineStyle: {
					color: color,
					width: 1
				}
			}]
		};
	}

}
