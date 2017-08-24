import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { ForgetPwdComponent } from './user/forget-pwd/forget-pwd.component';
// import { InforMationModule } from './home/infor-mation/infor-mation.module';
import { InforMationComponent } from './home/infor-mation/infor-mation.component';

const appRoutes : Routes = <Routes> [
	{
		path : "",
		component : LoginComponent
		/*redirectTo: 'login',
    	pathMatch: 'full'*/
	},
	{
		path : "login",
		component : LoginComponent
	},
	{
		path : "home",
		component : HomeComponent
		// loadChildren : "app/home/home.module#HomeModule"
	},
	{
		path : "forgetpwd",
		component : ForgetPwdComponent
	},
	{
		path : 'info/:id',
//				loadChildren : './infor-mation/infor-mation.module#InforMationModule'
		component : InforMationComponent
	}
]

@NgModule({
	imports : [
		RouterModule.forRoot(appRoutes,{useHash:true})
	],
	exports: [ RouterModule ]
})

export class AppRouter{ }
