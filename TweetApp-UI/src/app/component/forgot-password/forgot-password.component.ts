import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ForgotPassword } from 'src/app/model/ForgotPassword.model';
import { AuthResponseData, AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  isLoading:boolean=false;
  error:string=null;
  constructor( private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
  }


  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

console.log(form.value);
let pass=new ForgotPassword(form.value.email,form.value.newPassword,form.value.confirmPassword);
console.log(pass);
let forgotpasswordObs:Observable<AuthResponseData>;
forgotpasswordObs=this.authService.forgotPassword(pass);


forgotpasswordObs.subscribe(
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
  }
}
