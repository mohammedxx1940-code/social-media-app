import { Routes } from '@angular/router';
import { LayoutWithNavbarComponent } from './core/layouts/layout-with-navbar/layout-with-navbar.component';
import { EmptyLayoutComponent } from './core/layouts/empty-layout/empty-layout.component';
import { authGuard } from './core/auth/guards/auth-guard';

export const routes: Routes = [
    {path : "" , redirectTo : "auth" , pathMatch : "full"} ,
    {path : "main" , component : LayoutWithNavbarComponent , canActivate : [authGuard] ,
        loadChildren : ()=> import('./features/features.routes').then(f => f.routes)} ,
    {path : "auth" , component : EmptyLayoutComponent ,
        loadChildren: () => import('./core/auth/auth.routes').then(r => r.routes)} ,  
    {path : "**" , loadComponent : ()=> import('./core/layouts/components/notfound/notfound.component')
        .then(n=>n.NotfoundComponent) , title : "NotFound"}    
];