import { Component, OnInit,Input } from '@angular/core';
import { Comment } from 'src/app/Models/comment.model';
import { Post } from 'src/app/Models/post.model';
import { CommentService } from '../../../services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() post;

  comments : Comment[] =[];
  

  constructor(private commentService:CommentService) { }

  ngOnInit(): void {

    this.comments=this.commentService.get(this.post);

    this.commentService.commentSend=[];


  }

}
