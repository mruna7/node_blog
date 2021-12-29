import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EChartOption } from 'echarts';
import { SidebarService } from '../../services/sidebar.service';
import {BlogServiceService} from '../blog-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as S3 from 'aws-sdk/clients/s3';
// import * as S3 from 'aws-sdk/clients/s3';

@Component({
	selector: 'app-blog-post',
	templateUrl: './blog-post.component.html',
	styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {

	public visitorsOptions: EChartOption = {};
	public visitsOptions: EChartOption = {};
	public sidebarVisible: boolean = true;
	public selectedFiles: any;
	uploadedFile :any;
	
	formGroup;
	public config: object = {
		items: [
			'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
			'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
			'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
			'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
			'Indent', 'Outdent', '|', 'CreateLink', 'CreateTable',
			'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
	};
	public htmlContent: string = "";

	constructor(private sidebarService: SidebarService, private cdr: ChangeDetectorRef, private blogService: BlogServiceService,
		 private formBuilder: FormBuilder,
		 private router: Router,
		 private toastr: ToastrService
		 ) {
		this.visitorsOptions = this.loadLineChartOptions([3, 5, 1, 6, 5, 4, 8, 3], "#49c5b6");
		this.visitsOptions = this.loadLineChartOptions([4, 6, 3, 2, 5, 6, 5, 4], "#f4516c");
		this.htmlContent = "<h3 class='m-b-0'>hi,</h3><h4 class='m-t-0'>we are Wrraptheme.</h4><p></p>";
		this.formGroup = this.formBuilder.group({
			title: '',
			content: ''					
		  });	
	}

	showToastr(message) {
		this.toastr.info(message, undefined, {
			closeButton: true,
			positionClass: 'toast-top-right'
		});
	  }

	createNewPost(postInfo){
		this.blogService.createNewPost(postInfo).subscribe(resp => {
			this.showToastr('New Post Created Sucessfully.');
			this.router.navigate(['/admin/blogs/blog-list']);
		})
	}

	onSubmit(formData) {	
		let userInfo = this.blogService.getUserInfo();	
		console.log(this.uploadedFile);	
		let postInfo = {
			"emailAddress": userInfo.userEmail,
			"summary": formData['title'],
			"content": formData['content'],
			"userName": userInfo.userName,
			"imageUrl": localStorage.getItem('uploadedImage')
			}			
		localStorage.removeItem('uploadedImage')
		this.createNewPost(postInfo);
	}


	selectFile(event) {
		this.selectedFiles = event.target.files;
		// checking the file size should not be greater than 5mb
		console.log('this selected file', this.selectedFiles);
		const file = this.selectedFiles.item(0);
		const contentType = file.type;
		const bucket = new S3(
			{
				accessKeyId: 'AKIAQRBRELXB5W5XR7OL',
				secretAccessKey: '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',
				region: 'us-east-1'
			}
		);
		const fileName = file.name;

		const params = {
			Bucket: 'cep3-ashok',
			Key: 'blog-images/' + fileName,
			Body: file,
			ACL: 'public-read',
			ContentType: contentType
		};
		this.uploadedFile = bucket.upload(params, function (err, data) {
			if (err) {
				console.log('There was an error uploading your file: ', err);
			}
			localStorage.setItem('uploadedImage',data.Location);			
			console.log('Successfully uploaded file.', data);
		});
		
	}

	ngOnInit() {
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
