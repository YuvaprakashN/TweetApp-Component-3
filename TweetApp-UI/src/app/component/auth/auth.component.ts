import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LoginRequest } from 'src/app/model/LoginRequest.model';
import { User } from 'src/app/model/User.model';
import { AuthResponseData, AuthService } from 'src/app/service/auth.service';
import { AlertComponent } from '../alert/alert.component';
import { PlaceHolderDirective } from './placeHolder/placeHolder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  isLoading = false;
  error: string = '';

  // alertSub: Subscription;
  // @ViewChild(PlaceHolderDirective, { static: false })
  // alertHost: PlaceHolderDirective;
  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }
  ngOnInit(): void {

    let user: User = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      this.authService.user.next(user);
      this.router.navigate(['/tweets']);
    }
  }


  onhandleError() {
    this.error = '';
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;


    let req = new LoginRequest(email, password);
    console.log(req);

    authObs = this.authService.login(req);


    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/tweets']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage.error.message;
        // this.invalid=true;
        //  this.showAlert(errorMessage);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  // showAlert(message: string) {
  //   const alertComponentFactory =
  //     this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
  //   const hostViewCiontainer = this.alertHost.viewContainerRef;
  //   hostViewCiontainer.clear();
  //   const componentRef = hostViewCiontainer.createComponent(
  //     alertComponentFactory
  //   );

  //   componentRef.instance.message = message;

  //   this.alertSub = componentRef.instance.errorClose.subscribe(() => {
  //     this.alertSub.unsubscribe();
  //     hostViewCiontainer.clear();
  //   });
  // }
}
