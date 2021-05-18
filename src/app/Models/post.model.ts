import { User } from './user.model';
export class Post {
    public id: string;
    public user: User;
    public description: string;
    public dateAdded: number;
    constructor(user: User, desc: string, date: number){
        this.user = user;
        this.description = desc;
        this.dateAdded = date;
    }
}
