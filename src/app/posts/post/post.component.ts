import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {




  @Input() user;
  
  @Input() post;
  
  constructor(private userService:UserService) { }

  ngOnInit(): void { 
    this.post.createdAt = new Date(this.post.createdAt);
  }

  


}
