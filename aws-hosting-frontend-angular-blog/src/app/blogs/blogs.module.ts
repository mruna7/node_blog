import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { RouterModule } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { BlogListComponent} from './blog-list/blog-list.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { routing } from './blog.routing';
import {LayoutModule} from '../layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SafeHtmlPipePipe} from '../pipes/safe-html-pipe.pipe';
import { JwPaginationModule } from 'jw-angular-pagination';
@NgModule({
	declarations: [BlogPostComponent, BlogListComponent, BlogDetailsComponent,SafeHtmlPipePipe],
	imports: [
		CommonModule,
		LayoutModule,
		routing,		
		RouterModule,
		NgxEchartsModule,
		RichTextEditorAllModule,
		FormsModule,		
		ReactiveFormsModule,
		JwPaginationModule
	],
})
export class BlogsModule { }
