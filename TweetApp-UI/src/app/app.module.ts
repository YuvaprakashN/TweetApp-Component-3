import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthComponent } from './component/auth/auth.component';
import { AlertComponent } from './component/alert/alert.component';
import { TweetsComponent } from './component/tweets/tweets.component';
import { AuthRegisterationComponent } from './component/auth-registeration/auth-registeration.component';
import { TweetService } from './service/tweet.service';
import { UsersListComponent } from './component/users-list/users-list.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { TimeAgoPipe } from './service/time-ago.pipe';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
//import {TimeAgoPipe} from 'time-ago-pipe';



@NgModule({
  declarations: [
   
    AppComponent,
    LoadingSpinnerComponent,
    AuthComponent,
    AlertComponent,
    TweetsComponent,
    UsersListComponent,
    AuthRegisterationComponent,
    NavBarComponent,
    ForgotPasswordComponent,
    TimeAgoPipe,
    PageNotFoundComponent
 //   TimeAgoPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule,
  ], 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
