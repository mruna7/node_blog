import { Routes, RouterModule } from '@angular/router';
import {BlogListComponent} from './blog-list/blog-list.component';
import {BlogDetailsComponent} from './blog-details/blog-details.component';
const routes: Routes = [
    { path: 'blog-details/:id', component: BlogDetailsComponent, data: { title: 'Login :: Lucid Angular' } },
    { path: 'blog-list', component: BlogListComponent, data: { title: 'Login :: Lucid Angular' } },
    { path: '', component: BlogListComponent, data: { title: 'Login :: Lucid Angular' } }
    // {
    //     path: 'blog-list',
    //     component: BlogListComponent,
    //     children: [
    //         { path: '', redirectTo: 'page-login', pathMatch: 'full' },
    //         { path: 'blog-list', component: BlogListComponent, data: { title: 'Login :: Lucid Angular' } },
    //         { path: 'blog-details/:id', component: BlogDetailsComponent, data: { title: 'Login :: Lucid Angular' } }, 
    //     ]
    // }
    // {
    //     path: 'blogs',
    //     children: [
    //         { path: '', component: BlogListComponent, pathMatch: 'full' , data: { title: ':: Lucid Angular :: Blog Details :: Blog ::' }},            
    //         { path: 'blog-list', component: BlogListComponent, data: { title: ':: Lucid Angular :: Blog List :: Blog ::' } },
    //         { path: 'blog-details/:id', component: BlogDetailsComponent, data: { title: ':: Lucid Angular :: Blog Details :: Blog ::' } }
    //     ]
    // },
];

export const routing = RouterModule.forChild(routes);