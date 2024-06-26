import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserDalService {

  database = inject(DatabaseService)

  constructor() { }

  addUser(user: { firstName: any; lastName: any; password: any; email: any }): Promise<any>{
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["users"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: insert transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert transaction: " + event);
      };

      const userStore = transaction.objectStore("users");
      const req = userStore.add(user);

      req.onsuccess = (event:any) => {
        //returns the key of newly added item
        console.log(`Success: user added successfully ${event.target.result}`);
        resolve(event.target.result);
      };

      req.onerror = (event: any) => {
        console.log("Error: error in add: " + event);
        reject(event);
      };
    });
  }

  getUserByEmail(email: string): Promise<User | null>{
    return new Promise((resolve, reject) =>{
      const transaction = this.database.db.transaction(["users"]);
      const userStore = transaction.objectStore("users");


      const request = userStore.openCursor();


      request.onsuccess = (event:any)=>{
        const cursor = event.target.result;

        if(cursor){
          const user = cursor.value as User;
          if(user.email === email){
            resolve(user);
          }else{
            cursor.continue();
          }
        }else{
          resolve(null)
        }
      };
      request.onerror = (event:any)=>{
        console.error("Error getting user by email:", event);
        reject(event);
      }
    })
  }

  async getUserProfile(userId: number | undefined) {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["users"]);
      const userStore = transaction.objectStore("users");

      // Retrieve the user profile directly using the userId as the key
      const request = userStore.get(userId);

      request.onsuccess = (event: any) => {
        const user = event.target.result;
        resolve(user);
      };

      request.onerror = (event: any) => {
        console.error("Error getting user by userId:", event);
        reject(event);
      };
    });
  }

  update(user: User | null): Promise<any>{
    return new Promise((resolve, reject) =>{
      const transaction = this.database.db.transaction(["users"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: update transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in update transaction: " + event);
      };

      const userStore = transaction.objectStore("users");

      const reqUpdate = userStore.put(user);

      reqUpdate.onsuccess = (event: any) => {
        console.log(`Success: data updated successfully: ${event}`);
        resolve(event);
      };

      reqUpdate.onerror = (event: any) => {
        console.log(`Error: failed to update: ${event}`);
        reject(event)
      };
    })
  }
}
