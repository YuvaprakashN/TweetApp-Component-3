import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

 
  myFormGroup : FormGroup;
  showSearchedText : boolean = false;
  searchedText : string;
  enableButtonForSearch : boolean = false;
  userModel : User[]=[];
  noUsersToDisplay : boolean = false;
  constructor(formBuilder : FormBuilder, public userService : UserService, public router : Router) { 
    this.myFormGroup=formBuilder.group({
      "search" : new FormControl("",Validators.required),
    })
  }
  getDetails(username : number){
    this.router.navigate(['/tweets/'+username]);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    let userName:string = form.value.userName;
console.log(userName.trim().length);

    if(userName.trim().length===0){
      this.userService.getAllUsers().subscribe((response) =>{
        this.userModel = response as User[];
       })
    
    }else{
      this.userService.searchUser(userName).subscribe((response) =>{
        this.userModel = response as User[];
       })
    }

  

  }
  
  ngOnInit(): void {
 
      this.userService.getAllUsers().subscribe((response) =>{
        this.userModel = response as User[];
       })
    
  }


}
