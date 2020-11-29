import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './Modules/auth/_guards/auth.guard';
import { BaseComponent } from './Layout/base/base.component';
import { ErrorPageComponent } from './Layout/error-page/error-page.component';



const routes: Routes = [
  {path: 'auth', loadChildren:()=>import('./Modules/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path : '',
    component : BaseComponent,
    canActivate: [AuthGuard],
    children:[
    	{
				path: 'home',
				loadChildren: () => import('./Modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
				path: 'user',
				loadChildren: () => import('./Modules/user/users.module').then(m => m.UserModule)
      },
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: '**', redirectTo: 'error', pathMatch: 'full'},
      
  ]
  },
  {path: 'error', component: ErrorPageComponent},
  {path: '**', redirectTo: 'error', pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
