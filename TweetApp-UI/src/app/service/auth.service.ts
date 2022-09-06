import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ForgotPassword } from '../model/ForgotPassword.model';
import { LoginRequest } from '../model/LoginRequest.model';
import { UserRegisteration } from '../model/Request.model';
import { User } from '../model/User.model';
import { environment } from 'src/environments/environment';

export interface AuthResponseData {
  id: number;

  username: string;

  firstName: string;

  lastName: string;

  phoneNumber: string;

  email: string;
  dob: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  LoginURL: string = environment.LoginURL;
  RegisterationURL: string = environment.RegisterationURL;
  ForgotPassword:string=environment.rootUrl;
  user = new BehaviorSubject<User>(null);

  constructor(public http: HttpClient) {}

  forgotPassword(forgotPassword:ForgotPassword){
    
    return this.http.post<AuthResponseData>(this.ForgotPassword+forgotPassword.email+"/forgot",forgotPassword).pipe(
      map((successData: AuthResponseData) => {
        console.log(successData);
        let user: User = new User(
          successData.id,
          successData.username,
          successData.firstName,
          successData.lastName,
          successData.email,
          successData.phoneNumber,
          successData.dob
        );
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        return successData;
      }),
      map((failureData) => {
        console.log(failureData);
        return failureData;
      })
    );
  }

  login(login: LoginRequest) {
    return this.http.post<AuthResponseData>(this.LoginURL, login).pipe(
      map((successData: AuthResponseData) => {
        console.log(successData);
        let user: User = new User(
          successData.id,
          successData.username,
          successData.firstName,
          successData.lastName,
          successData.email,
          successData.phoneNumber,
          successData.dob
        );
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        return successData;
      }),
      map((failureData) => {
        console.log(failureData);
        return failureData;
      })
    );
  }

  register(reg: UserRegisteration) {
    return this.http.post<AuthResponseData>(this.RegisterationURL, reg).pipe(
      map((successData: AuthResponseData) => {
        console.log(successData);
        return successData;
      }),
      map((failureData) => {
        console.log(failureData);
        return failureData;
      })
    );
  }
}
