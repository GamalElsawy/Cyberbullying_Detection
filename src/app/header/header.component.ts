import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {



  constructor(private userService:UserService , private authService:AuthService) {
    
  }

  ngOnInit(): void {

    this.authService.getMe().subscribe((res:any)=>{
      var user = {
        id:res.data._id,
        username:res.data.username,
        image:"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        email:res.data.email,
        phone:res.data.phone,
        address:res.data.address,
        password:""
      };
      this.userService.user.next(user);

    },(err)=>{
      console.log("this is Error",err);
    });


    
  }


}
