import { User } from './user.model';
export class Post {
    public id:string;
    public user:User;
    public content:string;
    public createdAt:number;
    constructor(id:string,user:User,desc:string,date:number){
        this.id = id;
        this.user = user;
        this.content = desc;
        this.createdAt = date;
    }
}