import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {BlogServiceService} from '../../blogs/blog-service.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnDestroy {
	isloggedIn = (sessionStorage.getItem('email') !== undefined && sessionStorage.getItem('email') !== null) ? true : false;
	login_user_email = sessionStorage.getItem('email');
	login_user_name = sessionStorage.getItem('username');
	isReviewer;
	@Input() sidebarVisible: boolean = true;
	@Input() navTab: string = "menu";
	@Input() currentActiveMenu;
	@Input() currentActiveSubMenu;
	@Output() changeNavTabEvent = new EventEmitter();
	@Output() activeInactiveMenuEvent = new EventEmitter();
    public themeClass: string = "theme-cyan";
    public darkClass: string = "";
    private ngUnsubscribe = new Subject();

	constructor(private themeService: ThemeService, private blogService: BlogServiceService) {
        this.themeService.themeClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(themeClass => {
			this.themeClass = themeClass;
        });
        this.themeService.darkClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(darkClass => {
            this.darkClass = darkClass;
		});
		this.isReviewer = this.blogService.checkIfUserReviewer();
    }
    
    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
	}

	changeNavTab(tab: string) {
		this.navTab = tab;
	}

	activeInactiveMenu(menuItem: string) {
		this.activeInactiveMenuEvent.emit({ 'item': menuItem });
	}

	changeTheme(theme:string){
		this.themeService.themeChange(theme);
    }
    
    changeDarkMode(darkClass: string) {
        this.themeService.changeDarkMode(darkClass);
    }
}
