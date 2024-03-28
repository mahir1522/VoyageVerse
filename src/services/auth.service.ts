import {inject, Injectable} from '@angular/core';
import {User} from "../models/user.model";
import {UserDalService} from "./user-dal.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User | null  = null;
  userDalService = inject(UserDalService)
  constructor() { }

  register(user: { firstName: any; lastName: any; password: any; email: any }):Promise<any>{
    return this.userDalService.getUserByEmail(user.email).then((existingUser: User | null) =>{
      if(existingUser){
        return Promise.reject(new Error('User with the same email already exists'));
      }else{
        return this.userDalService.addUser(user);
      }
    });
  }

  login(email:string, password:string):Promise<boolean>{
    return new Promise((resolve, reject) =>{
      this.userDalService.getUserByEmail(email).then((user: User | null) =>{
        if(user && user.password === password){
          this.currentUser = user;
          resolve(true);
        }else{
          resolve(false);
        }
      }).catch(error =>{
        console.error("Error logging in: ", error);
        reject(false);
      });
    });
  }
  logout():void{
    this.currentUser = null;
  }
  isAutheticated():boolean{
    return  !!this.currentUser;
  }
  getCurrentUser():User | null{
    return this.currentUser;
  }
}
