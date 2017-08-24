import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { ForgetPwdComponent } from './user/forget-pwd/forget-pwd.component';
import { InforMationComponent } from './home/infor-mation/infor-mation.component';

import { AppRouter } from './app.routes';
import { HomeModule } from './home/home.module';
import { RequestService } from './services/request.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetPwdComponent,
    InforMationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HomeModule,
    AppRouter
  ],
  providers: [RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
