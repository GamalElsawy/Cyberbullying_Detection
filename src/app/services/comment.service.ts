import { Injectable } from '@angular/core';
import { Comment } from '../Models/comment.model';
import { User } from '../Models/user.model';
import { PostService } from './post.service';
import { Post } from '../Models/post.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  
  comment : Comment[]=[
    new Comment(null,new User("Marwan Eladwy","https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70","Marwan.97@gmail.com","58897sdsa9","015879875451","55 shubra cairo"),"Thank You , and you are write of what you say .",Date.now()),
    new Comment(null,new User("Bassam Saber","https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500","BassamSaber@gmail.com","111111","01141248413","62 elmaadi cairo"),"Thank You , and you are write of what you say .",Date.now()),
    new Comment(null,new User("Bassam Saber","https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500","BassamSaber@gmail.com","111111","01141248413","62 elmaadi cairo"),"Thank You , and you are write of what you say .",Date.now())
    ];

  posts = [];

  commentSend = [];
 
  constructor(private postService:PostService) {
    this.posts = this.postService.get()
    this.posts.forEach((post,i)=>{
        this.comment[i].post = post;
    });
   

   }

  get(post){
    this.comment.forEach((comment,i)=>{
      if(this.comment[i].post === post){
        this.commentSend.push(comment);
      }
    });
    return this.commentSend.slice();
  }
}
