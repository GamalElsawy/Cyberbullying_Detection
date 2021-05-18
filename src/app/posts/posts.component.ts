import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../Models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  @Input() account;

  posts: Post [] = [];
  constructor(public postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts();
  }



}
