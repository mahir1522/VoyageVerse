import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {DatabaseService} from "../../services/database.service";
import {UserDalService} from "../../services/user-dal.service";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgIf
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  errorMessage: string = '';

  router = inject(Router)
  auth = inject(AuthService)
  constructor() {}


  signup(signupForm: any) {
    if(signupForm.valid){
      const formData = signupForm.value;
      const newUser = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.newUserEmail,
        password: formData.newUserPass
      }

      this.auth.register(newUser).then((data)=>{
        alert("User registered successfully");
        this.router.navigate(['/login']);
      }).catch((error) =>{
        this.errorMessage =  error.message;
      })
    }
  }
}
