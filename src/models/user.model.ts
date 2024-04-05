export class User{

  userId: number | undefined
  firstName: string;
  lastName: string;
  email:string;
  password:string;
  image?: any;
  bio?: string;

  constructor(firstName: string, lastName: string,email:string, password:string){
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}

