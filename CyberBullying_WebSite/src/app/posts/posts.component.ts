  
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
import { ValidateService } from '../services/validate.service';



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {

  @Input() user;

  posts : Post [] = [];

  classess:string[]=[];

  check = false;

  @ViewChild('postContent',{static:true}) postContent:ElementRef<HTMLInputElement>;

  constructor(public validate:ValidateService,public postService:PostService, private toaster:ToastrService,private authService:AuthService , public userService:UserService) {}

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
      this.check = true;
       this.validate.validate(postContent).subscribe((res)=>{
         console.log(res);
         
          if(res.length === 0){
            this.createPost(postContent);
          }
          else{
            this.classess = res;
            this.toaster.warning("This Post Not Allowed.","Warning");
          }
       },(err)=>{
         console.log("this is error",err);
       },()=>{this.check = false});
  }
  else{
    this.toaster.error("Please Enter Content Of Post.","Error");
  }
  
}

createPost(postContent){
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

 

}