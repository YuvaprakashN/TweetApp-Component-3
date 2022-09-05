import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl:string='http://localhost:9090/api/v1.0/tweets/'
  getAllUser:string='users/all';
  getUserByUserName:string='user/search/';


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
