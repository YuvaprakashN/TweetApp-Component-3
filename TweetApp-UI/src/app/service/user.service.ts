import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  baseUrl:string=environment.rootUrl;
  getAllUser:string=environment.getAllUser;
  getUserByUserName:string=environment.getUserByUserName;


  constructor(public http:HttpClient) { }

  getAllUsers() : any{
    return this.http.get(this.baseUrl+this.getAllUser);
  }

  searchUser(name : string) : any{
    console.log(name);
    
    return this.http.get(this.baseUrl+this.getUserByUserName+name);
  }
  getUserTweets(id:any){
    return this.http.get(this.baseUrl+id);
  }
}
