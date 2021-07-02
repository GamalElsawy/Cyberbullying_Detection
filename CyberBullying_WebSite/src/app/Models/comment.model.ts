import { Post } from './post.model';
import { User } from './user.model';
export class Comment{

    constructor(public post:Post,public user : User, public content : string){
       this.user = user;
       this.content = content;
       this.post = post;
    }
}