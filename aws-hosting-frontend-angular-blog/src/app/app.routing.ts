import { Routes, RouterModule,CanActivate } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { SignInComponent } from './SignIn/sign-in.component';
import { SignUpComponent } from './SignUp/sign-up.component';
import { SignoutComponent } from './signout/signout.component';
import { AuthGuardService } from './service/auth-guard.service';

export const routes: Routes = [
    { path: '', redirectTo:'blogs', pathMatch: 'full'},
    // {
    //     path: 'blogs',
    //     children: [
    //         { path: '', redirectTo: 'blog-post', pathMatch: 'full' },            
    //         { path: 'blog-list', component: BlogListComponent, data: { title: ':: Lucid Angular :: Blog List :: Blog ::' } },
    //         { path: 'blog-details', component: BlogDetailsComponent, data: { title: ':: Lucid Angular :: Blog Details :: Blog ::' } }
    //     ]
    // },
    { path: 'blogs' , loadChildren: () => import('app/blogs/blogs.module').then(m => m.BlogsModule) },
    { path: 'admin',canActivate:[AuthGuardService], loadChildren: () => import('app/admin/admin.module').then(m => m.AdminModule) },
    { path: 'authentication', loadChildren: () => import('app/authentication/authentication.module').then(m => m.AuthenticationModule) },
    {path : "signin", component: SignInComponent},
    {path : "signup", component: SignUpComponent},   
    {path : "admin-dashboard", redirectTo:'/admin/dashboard/index'},
      
    {path : "signout", component: SignoutComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });