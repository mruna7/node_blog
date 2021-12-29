import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EChartOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';
import {BlogServiceService} from '../../blogs/blog-service.service';

@Component({
  selector: 'app-page-projects-list',
  templateUrl: './page-projects-list.component.html',
  styleUrls: ['./page-projects-list.component.css']
})
export class PageProjectsListComponent implements OnInit {

  public visitorsOptions: EChartOption = {};
  public visitsOptions: EChartOption = {};
  public sidebarVisible: boolean = true;
  public blogsList: any = [];

  constructor(private sidebarService: SidebarService, private cdr: ChangeDetectorRef, private blogService: BlogServiceService) {
    this.visitorsOptions = this.loadLineChartOptions([3, 5, 1, 6, 5, 4, 8, 3], "#49c5b6");
    this.visitsOptions = this.loadLineChartOptions([4, 6, 3, 2, 5, 6, 5, 4], "#f4516c");
  }

  ngOnInit() {
    this.getAllBlogsToVerify();
  }

  getAllBlogsToVerify() {
    this.blogService.getBlogsToReview().subscribe(resp=>{   
      let response:any = resp  
      this.blogsList = JSON.parse(response.body);
      this.blogsList = this.blogsList.sort((val1, val2)=> {return new Date(val2.createdDate).valueOf() - new Date(val1.createdDate).valueOf()})

    })
  }

  approveBlog(blogId){
    this.blogService.approveBlogById(blogId).subscribe(resp=>{
      console.log(resp);
      this.blogsList = this.blogsList.filter(blogsList => blogsList.postId != blogId);
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
