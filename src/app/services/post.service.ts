import { Injectable } from '@angular/core';
import { Post } from '../Models/post.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  user = [];
  posts:Post[]=[
    new Post(null," Maxime ut excepturi ullam officiis sapiente sed eius.",Date.now()),
    new Post(null,"laborum nostrum repellendus vitae tenetur sint incidunt.",Date.now()),
    new Post(null,"Lorem ipsum dolor, sit amet consectetur adipisicing elit.",Date.now()),
  ];
  constructor(private userService:UserService) { }

  get(){
    
    this.user = this.userService.get();
    this.user.forEach((element , i) => {
      this.posts[i].user = element;
    });

    return this.posts.slice();
  
  }

}
