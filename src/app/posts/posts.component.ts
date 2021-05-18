  
import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../Models/post.model';
import { PostService } from '../services/post.service';
import { User } from '../Models/user.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  @Input() user;

  posts : Post [] = [];
  constructor(public postService:PostService, private toaster:ToastrService ) { }

  ngOnInit(): void {
     this.postService.getPosts().subscribe((res:Post[])=>{
       this.posts = res.data.reverse();
       console.log(res.data.reverse());
     });
  }

  addPost(postContent){

    if(postContent !== ""){
    var post = {
      user:this.user.id,
      content:postContent
    }
    console.log(post);
    this.postService.createPost(post).subscribe((res)=>{
      console.log(res);
      this.toaster.success("Post Has Been Added.","Done");
    },(err)=>{
      this.toaster.error("Something Wrong Happened.","Error");
      console.log("err in create post");
    })    
  }
  else{
    this.toaster.error("Please Enter Content Of Post.","Error");
  }
}

 

}