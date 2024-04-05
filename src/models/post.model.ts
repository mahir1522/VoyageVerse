import {User} from "./user.model";

export class Post{

  postId:number|undefined;
  user: User;
  title:string;
  description:string;
  imageUrl: string;

  constructor(user:User,title:string, description:string, imageUrl:string){
    this.user = user;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
  }

}


