import { Injectable, Output , EventEmitter} from '@angular/core';
import { AsyncSubject } from 'rxjs';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   user  = new Subject<User>();
   hello = "my name is service";
   userAvatars = [
     "../../../assets/user (1).png",
     "../../../assets/user (2).png",
     "../../../assets/user (3).png",
     "../../../assets/user (4).png",
     "../../../assets/user (5).png",
     "../../../assets/user (6).png",
     "../../../assets/user (7).png",
     "../../../assets/user (8).png",
     "../../../assets/user (9).png",
     "../../../assets/user (10).png",
     "../../../assets/user (11).png",
     "../../../assets/user (12).png",
     "../../../assets/user (13).png",
     "../../../assets/user (14).png",
     "../../../assets/user (15).png",
   ];

  constructor() { }


 




 
}