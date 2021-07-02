import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {

  @Input() comment;
  
  constructor() { }

  
  ngOnInit(): void {
    this.comment.createdAt = new Date(this.comment.createdAt);
  }

}
