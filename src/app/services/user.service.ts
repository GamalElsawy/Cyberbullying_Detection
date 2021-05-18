import { Injectable, Output , EventEmitter} from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   user  = new Subject<User>();

  constructor() { }



 
}