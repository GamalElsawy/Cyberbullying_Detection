import { Injectable } from '@angular/core';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users : User[] = [
    new User("Bassam Saber","https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500","BassamSaber@gmail.com","111111","01141248413","62 elmaadi cairo"),
    new User("Marwan Eladwy","https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70","Marwan.97@gmail.com","58897sdsa9","015879875451","55 shubra cairo"),
    new User("Gamal Elsawy","http://img-cdn.tid.al/o/1bf656d56b5efcf9f4fa0e4e87701845e0e29e36.jpg","g.Elsawy@gmail.com","weq898798","0105781026","10 elsharabya cairo"),
  ]
  constructor() { }
 
  get(){
    return this.users.slice();
  }


}
