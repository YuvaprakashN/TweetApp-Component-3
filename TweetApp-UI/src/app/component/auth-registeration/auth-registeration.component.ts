import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegisteration } from 'src/app/model/Request.model';
import { User } from 'src/app/model/User.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-auth-registeration',
  templateUrl: './auth-registeration.component.html',
  styleUrls: ['./auth-registeration.component.css'],
})
export class AuthRegisterationComponent implements OnInit {
  registerationForm: UntypedFormGroup;
  error:string='';
  passwordValidation: boolean = false;
  prePasswordCheck: boolean = false;
  passwordLength: boolean = false;
  emailValid: boolean = false;
  //contactValid : boolean = false;
  phoneValidation: boolean = false;
  phoneValidationIsNan: boolean = false;
  sussesfullyRegistered: boolean = false;
  showElement: boolean = false;
  userDate: Date;
  emailNotAvailable: boolean = false;

  usersList: Array<User>;
  email: Array<string>;


  constructor(public authService:AuthService,public route:Router){

  }


  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.registerationForm = new UntypedFormGroup({
      firstName: new UntypedFormControl('User', [Validators.required]),
      lastName: new UntypedFormControl('Lnu', [Validators.required]),
      email: new UntypedFormControl('user@user.com', [Validators.required]),
      password: new UntypedFormControl('password', [Validators.required]),
      rePassword: new UntypedFormControl('password', [Validators.required]),

      contact: new UntypedFormControl('9876543211', Validators.required),
      dob: new UntypedFormControl('2022-09-09', Validators.required),
    });
  }

  //check if password and repassword are same

  checkPassword() {
    let password = this.registerationForm.value['password'];
    let rePassword = this.registerationForm.value['rePassword'];
    if (password.length != 0) {
      this.prePasswordCheck = false;
      if (password == rePassword || rePassword.length == 0) {
        this.passwordValidation = false;
      } else {
        this.passwordValidation = true;
      }
    } else {
      this.prePasswordCheck = true;
    }
    if (rePassword.length == 0) {
      this.prePasswordCheck = false;
    }
    if (this.prePasswordCheck) {
      rePassword = '';
    }
  }

  // Check prePassword
  checkPrePassword() {
    let password: string = this.registerationForm.value['password'];
    if (password.length >= 6 && password.length <= 12) {
      this.passwordLength = false;
    } else {
      this.passwordLength = true;
    }
    if (password.length != 0) {
      this.prePasswordCheck = false;
    } else {
      this.passwordLength = false;
    }
  }

  //Email Validation

  emailValidation() {
    let email: string = this.registerationForm.value['email'];
    console.log(email);

    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      this.emailValid = false;
    } else {
      this.emailValid = true;
    }
    if (email.length == 0) {
      this.emailValid = false;
    }
  }

  // validate Phone number
  phoneNumberValidaton() {
    let number: string = this.registerationForm.value['contact'];
    let mobilePattern = '^((\\+91-?)|0)?[0-9]{10}$';
    if (number.match(mobilePattern) || number.length == 0) {
      this.phoneValidation = false;
    } else {
      this.phoneValidation = true;
    }
    if (!Number.isNaN(parseInt(number)) || number.length == 0) {
      this.phoneValidationIsNan = false;
    } else {
      this.phoneValidationIsNan = true;
    }
  }

  //change date format to YYYY-MM-DD
  checkDate() {
    // console.log("called check date")
    this.userDate = this.registerationForm.controls['date'].value;
    // console.log(this.userDate);
  }

  //registering the user

  register() {
    // console.log(this.registerationForm.value);

    // console.log(this.emailValid,this.passwordLength,this.passwordValidation,this.phoneValidation);
    if (
      !this.emailValid &&
      !this.passwordLength &&
      !this.passwordValidation &&
      !this.phoneValidation
    ) {
      if (
        this.registerationForm.controls['firstName'].value.length != 0 &&
        this.registerationForm.controls['lastName'].value.length != 0 &&
        this.registerationForm.controls['email'].value.length != 0 &&
        this.registerationForm.controls['password'].value.length != 0 &&
        this.registerationForm.controls['rePassword'].value.length != 0 &&
        this.registerationForm.controls['contact'].value.length != 0
      ) {
        let userReg: UserRegisteration = {
          email: this.registerationForm.controls['email'].value,
          firstName: this.registerationForm.controls['firstName'].value,
          lastName: this.registerationForm.controls['lastName'].value,
          password: this.registerationForm.controls['password'].value,
          phoneNumber: this.registerationForm.controls['contact'].value,
          username:
            this.registerationForm.controls['firstName'].value +
            ' ' +
            this.registerationForm.controls['lastName'].value,
          dob: this.registerationForm.controls['dob'].value,
        };
        console.log(userReg);
this.authService.register(userReg).subscribe(
(res)=>{
console.log(res);
this.route.navigate(["/tweets"]);
},
(err)=>{
  console.log(err);
  this.error=err.error.message;
  
}

);
        // let user = new UserModel(
        //   this.registerationForm.controls['email'].value,
        //   this.registerationForm.controls['firstName'].value,
        //   this.registerationForm.controls['lastName'].value,
        //   this.registerationForm.controls['email'].value,
        //   this.registerationForm.controls['password'].value,
        //   this.registerationForm.controls['contact'].value,
        // )

        // this.userRegistrationService.addNewUser(user).subscribe((response) => {
        //   // console.log(response);
        //   // console.log("register user");
        //   this.registerationForm.controls['firstName'].reset();
        //   this.registerationForm.controls['lastName'].reset();
        //   this.registerationForm.controls['email'].reset();
        //   this.registerationForm.controls['password'].reset();
        //   this.registerationForm.controls['rePassword'].reset();
        //   this.registerationForm.controls['contact'].reset();
        //   this.showElement = true;
        //   setTimeout(function () {
        //     // console.log('hide');
        //     this.showElement = false;
        //     this.router.navigate(['/login'])
        //   }.bind(this), 3000);
        // },
        //   // failure function
        //   failureData => {
        //     // console.log(failureData);
        //     //alert("email alredy taken")
        //     this.emailNotAvailable = true;
        //     setTimeout(function () {
        //       // console.log('hide');
        //       this.emailNotAvailable = false;
        //     }.bind(this), 3000);
        //   });
      } else {
        alert('Required every Field');
      }
    } else {
      alert('enter valid details');
    }
  }
}
