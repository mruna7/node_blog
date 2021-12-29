import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EChartOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';
import {BlogServiceService} from '../blog-service.service';
import { ActivatedRoute } from '@angular/router';
import { param } from 'jquery';
@Component({
	selector: 'app-blog-details',
	templateUrl: './blog-details.component.html',
	styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

	public visitorsOptions: EChartOption = {};
	public visitsOptions: EChartOption = {};
	public sidebarVisible: boolean = true;
	public blogDetails:any = {};
	 currentBlogId = "";	

	constructor(
		private sidebarService: SidebarService,
		private cdr: ChangeDetectorRef,
		private blogService: BlogServiceService,
		private activatedRoute: ActivatedRoute
	) {
		this.visitorsOptions = this.loadLineChartOptions([3, 5, 1, 6, 5, 4, 8, 3], "#49c5b6");
		this.visitsOptions = this.loadLineChartOptions([4, 6, 3, 2, 5, 6, 5, 4], "#f4516c");
	}

	ngOnInit() {
		this.getSingleBlogByPostId();
	}

	getSingleBlogByPostId() {	
		
		this.activatedRoute.paramMap.subscribe(param => {
			 this.currentBlogId = param.get('id');
			this.blogService.getSingleBlogByPostId(this.currentBlogId).subscribe(resp =>{
				console.log(resp);				
				this.blogDetails = resp;			
			})
		})

		
	}


	toggleFullWidth() {
		this.sidebarService.toggle();
		this.sidebarVisible = this.sidebarService.getStatus();
		this.cdr.detectChanges();
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
