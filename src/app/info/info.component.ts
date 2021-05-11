import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user.model';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})

export class InfoComponent implements OnInit {

  user:User;

  opened=false;
  
  constructor(public userService:UserService) { }

  ngOnInit(): void {
    this.user = this.userService.get()[0];
  }

}
