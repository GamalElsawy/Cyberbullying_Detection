import { Component, OnInit } from '@angular/core';
import { Account } from '../Model/Account';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})

export class InfoComponent implements OnInit {

  acc : Account = {
    Name : "Bassam",
    Address:"62 elmaadi cairo",
    EMail:"BassamSaber@gmail.com",
    Image:"http://simpleicon.com/wp-content/uploads/user1.png",
    Password:"111111",
    Phone:"01141248413"
  };

  opened=false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
