import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { FullCalendarModule } from 'ng-fullcalendar';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxGalleryModule } from 'ngx-gallery';
import { BlogsModule } from './blogs/blogs.module';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { SignInComponent } from './SignIn/sign-in.component';
import { SignUpComponent } from './SignUp/sign-up.component';
import { SignoutComponent } from './signout/signout.component';
import * as $ from 'jquery';
import { MyLoaderComponent } from './components/my-loader/my-loader.component';
import { LoaderService } from './services/loader.service';
import { LoaderInterceptorService } from './interceptors/loader-interceptor.service';
// import { SafeHtmlPipePipe } from './pipes/safe-html-pipe.pipe';

@NgModule({
    declarations: [
        AppComponent,
        SignInComponent,
        SignUpComponent,
        SignoutComponent,
        MyLoaderComponent
                
    ],
    imports: [
        BrowserModule,
        BlogsModule,
        LayoutModule,
        HttpClientModule,
        routing,
        NgbModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        RichTextEditorAllModule,
        FullCalendarModule,
        NgMultiSelectDropDownModule.forRoot(),
        LeafletModule.forRoot(),
        NgxGalleryModule
    ],
    providers: [
        LoaderInterceptorService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
