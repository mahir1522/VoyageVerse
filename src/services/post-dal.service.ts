import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
import {Post} from "../models/post.model";
import {readableStreamLikeToAsyncGenerator} from "rxjs/internal/util/isReadableStreamLike";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class PostDalService {

  database = inject(DatabaseService)
  constructor() { }

  addPost(post: { description: any; title: any; user: User }):Promise<any>{
    return new Promise((resolve, reject) =>{
      const transaction = this.database.db.transaction(["posts"], "readwrite");

      transaction.oncomplete = (event:any) =>{
        console.log("Success: insert transaction successful");
      };
      transaction.onerror = (event:any) =>{
        console.log("Error: error in insert transaction: " + event);
      };

      const postStore = transaction.objectStore("posts");
      const req = postStore.add(post);

      req.onsuccess = (event:any) =>{
        console.log(`Success: user added successfully ${event.target.result}`);
        resolve(event.target.result);
      };

      req.onerror = (event:any) =>{
        console.log("Error: error in add: " + event);
        reject(event);
      }
    })
  }
  selectAll(): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["posts"]); //readonly

      transaction.oncomplete = (event: any) => {
        console.log("Success: selectAll transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in selectAll transaction: " + event);
      };
      const friendsStore = transaction.objectStore("posts");
      const req = friendsStore.getAll();
      req.onsuccess = (event: any) => {
        resolve(event.target.result);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };
    });
  }
  select(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["posts"]); //readonly
      transaction.oncomplete = (event: any) => {
        console.log("Success: select transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in select transaction: " + event);
      };

      const friendsStore = transaction.objectStore("posts");

      const req = friendsStore.get(id);
      req.onsuccess = (event: any) => {
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };
    });
  }

  update(post: { imageUrl: any; description: any; postId: number | undefined; title: any }): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["posts"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: update transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in update transaction: " + event);
      };

      const postStore = transaction.objectStore("posts");

      const reqUpdate = postStore.put(post);

      reqUpdate.onsuccess = (event: any) => {
        console.log(`Success: data updated successfully: ${event}`);
        resolve(event);
      };

      reqUpdate.onerror = (event: any) => {
        console.log(`Error: failed to update: ${event}`);
        reject(event)
      };
    });
  }

  delete(post: Post | undefined): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["posts"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: delete transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in delete transaction: " + event);
      };

      const postStore = transaction.objectStore("posts");
      if (post?.postId) {
        const reqDelete = postStore.delete(post.postId);
        reqDelete.onsuccess = (event: any) => {
          console.log(`Success: data deleted successfully: ${event}`);
          resolve(event);
        };
        reqDelete.onerror = (event: any) => {
          console.log(`Error: failed to delete: ${event}`);
          reject(event);
        };
      }
      else{
        reject("post does not have id")
      }
    });
  }
}
