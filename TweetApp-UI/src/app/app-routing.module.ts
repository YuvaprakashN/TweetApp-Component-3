import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRegisterationComponent } from './component/auth-registeration/auth-registeration.component';
import { AuthComponent } from './component/auth/auth.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { TweetsComponent } from './component/tweets/tweets.component';
import { UsersListComponent } from './component/users-list/users-list.component';
import { ForgotPassword } from './model/ForgotPassword.model';
import { AuthGuard } from './service/auth.guard';

const appRoutes:Routes=[
  {path:"",redirectTo:"/tweets",pathMatch:'full'},
  {path:"login",component:AuthComponent},
  {path:"register",component:AuthRegisterationComponent},
  {path:"tweets/:userid",component:TweetsComponent,canActivate:[AuthGuard]},
  {path:"tweets",component:TweetsComponent,canActivate:[AuthGuard]},
  {path:"users",component:UsersListComponent,canActivate:[AuthGuard]},
  {path:"forgotPassword",component:ForgotPasswordComponent},
  {path:"edit/:tweetid",component:TweetsComponent,canActivate:[AuthGuard]},
  {path:"**",component:PageNotFoundComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
