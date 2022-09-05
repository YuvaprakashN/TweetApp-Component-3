import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  private userSub: Subscription;
  isAuthenticated:boolean=false;
  constructor( public router : Router,public authService:AuthService) { 
  
  }

  logout(){
    localStorage.setItem('userData',null);
    this.isAuthenticated=false;
    this.authService.user.next(null);
    this.router.navigate(['/login']);
  }
   user:any ;
  ngOnInit(): void {
    // this.user = JSON.parse(localStorage.getItem('userData'));
    this.userSub = this.authService.user.subscribe(user => {
    

     this.isAuthenticated = !!user;
     if(this.isAuthenticated){
       this.user=user;
     }
     console.log("Logged User Data: "+user);
     
   });
    
  }



}
