  
import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user.model';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  providers: [UserService]
})

export class InfoComponent implements OnInit  {

  user:any="";
  subscribe=new Subscription();

  opened=false;

  private data : Subscription;
  
  constructor(public userService:UserService,private authService:AuthService , private router:Router ) {}

    ngOnInit() {

     this.subscribe = this.userService.user.subscribe((res:any)=>{
      this.user = {
        id:res.id,
        username:res.username,
        image:res.image,
        email:res.email,
        phone:res.phone,
        address:res.address,
        password:""
      };
    });
    
    

  }
  logout(){
    this.authService.logout().subscribe((res)=>{
      localStorage.setItem("token"," ");
      this.router.navigate(['']);
    },(err)=>{
      console.log("err logout",err);
    });
  }
}