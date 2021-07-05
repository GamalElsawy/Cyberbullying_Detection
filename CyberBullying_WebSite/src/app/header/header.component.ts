import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../Models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {



  constructor(private userService:UserService , private authService:AuthService) {
    
  }

  ngOnInit(): void {
    this.getUser();
    //console.log("Random = ",this.userService.userAvatars[(Math.floor(Math.random() * (15 - 1 + 1)) + 1)-1]);
  }

  getUser(){
    this.authService.getMe().subscribe((res:any)=>{
      var user  = new User ();
      user.id=res.data._id;
      user.username=res.data.username;
      user.image=this.userService.userAvatars[(Math.floor(Math.random() * (15 - 1 + 1)) + 1)-1];
      user.email=res.data.email;
      user.phone=res.data.phone;
      user.address=res.data.address;
      user.password="";
      this.userService.user.next(user);
    },(err)=>{
      console.log("this is Error",err);
    });
  }


}
