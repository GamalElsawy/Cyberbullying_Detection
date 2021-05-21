  
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Post } from '../Models/post.model';
import { PostService } from '../services/post.service';
import { User } from '../Models/user.model';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {

  @Input() user;

  posts : Post [] = [];

  @ViewChild('postContent',{static:true}) postContent:ElementRef<HTMLInputElement>;

  constructor(public postService:PostService, private toaster:ToastrService,private authService:AuthService , public userService:UserService) {}

   ngOnInit() {
    this.loadPosts(this.user.id);
  }

  loadPosts(id){
    this.postService.getPosts().subscribe((res:any)=>{
      this.posts = res.data.reverse();
      this.posts.forEach(post => {
        if(post.user["_id"]===id){
          post.user.image= this.user.image;
        }
        else{
          post.user.image = this.userService.userAvatars[(Math.floor(Math.random() * (15 - 1 + 1)) + 1)-1];
        }
       });
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
      this.postContent.nativeElement.value="";
      this.toaster.success("Post Has Been Added.","Done");
      this.loadPosts(this.user.id);
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