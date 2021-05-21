import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Comment } from 'src/app/Models/comment.model';
import { CommentService } from '../../../services/comment.service';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {


  @Input() user;

  @Input() post;

  comments : Comment[] = [];

  @ViewChild('commentContent',{static:true}) commentContent:ElementRef<HTMLInputElement>;

  
  constructor(private commentService:CommentService , private  userService:UserService,private toaster:ToastrService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(){
    this.commentService.getComments(this.post.id).subscribe((res:any)=>{
      this.comments = res.data.reverse();
      
      this.comments.forEach(comment => {        
        comment.user.image = "";
        if(comment.user["_id"]===this.user.id){
          comment.user.image= this.user.image;
        }
        else if(comment.user["_id"]===this.post.user["_id"]){
          comment.user.image= this.post.user.image;
        }
        else{
         comment.user.image = this.userService.userAvatars[(Math.floor(Math.random() * (15 - 1 + 1)) + 1)-1];
        }
       });
       
   });
  }


  addComment(commentContent){
   
    if(commentContent !== ""){
      var comment = {
        user:this.user.id,
        content:commentContent
      };
      this.commentService.createComment(this.post.id,comment).subscribe((res)=>{
        this.commentContent.nativeElement.value="";
        console.log(res);
        this.toaster.success("Comment Has Been Added.","Done");
        this.loadComments();
  
      },(err)=>{
        this.toaster.error("Something Wrong Happened.","Error");
        console.log("err in create comment");
      })    
    }
    else{
      this.toaster.error("Please Enter Content Of Comment.","Error");
    }
  }

}
