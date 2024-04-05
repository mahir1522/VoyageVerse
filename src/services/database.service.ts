import { Injectable } from '@angular/core';
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }
  db:any;
  createDatabase():Promise<any>{
    return new Promise((resolve, reject) =>{
      const request = indexedDB.open("UserDB", 1);

      request.onerror = (event) =>{
        console.error("Error in creating database!");
      };
      request.onsuccess = (event) =>{
        console.log("Onsuccess called");
        // @ts-ignore
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event)=>{
        console.log("onupgradeneeded called");
        // @ts-ignore
        this.db = event.target.result;
        const userStore = this.db.createObjectStore("users",{
          keyPath: "userId",
          autoIncrement:true,
        });

        const postStore = this.db.createObjectStore("posts", {
          keyPath: "postId",
          autoIncrement:true,
        });
      };
    });
  }

  initDatabase(){
    this.createDatabase().then((data) =>{
      console.log("Database created successfully: " + data)
    }).catch((e)=>{
      console.log("Error: " + e.message)
    });
  }
}
