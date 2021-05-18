  
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

export class InfoComponent implements OnInit {

  user:any="";


  opened=false;

  private data : Subscription;
  
  constructor(public userService:UserService,private authService:AuthService , private router:Router ) {}

  ngOnInit(): void {
    this.userService.user.subscribe((res:any)=>{
      console.log(res);
      this.user = {
        id:res.id,
        username:res.username,
        image:"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        email:res.email,
        phone:res.phone,
        address:res.address,
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