import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/Models/post.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment;
  
  constructor() { }

  ngOnInit(): void {
  }

}
