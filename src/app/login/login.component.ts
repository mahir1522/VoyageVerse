import {Component, inject} from '@angular/core';
import {CommonModule, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    FormsModule
  ],
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userEmail: string = '';
  userPass: string = '';
  errorMessage: string = '';

  auth = inject(AuthService)
  router = inject(Router)

  constructor() {
  }


  login() {
    if (this.userEmail && this.userPass) {
      this.auth.login(this.userEmail, this.userPass).then((loggedIn) =>{
        if(loggedIn){
          alert("Login successful")
          this.router.navigate(['/home']);
        }else{
          this.errorMessage = 'Invalid email or password';
        }
      }).catch((error) =>{
        console.error("Error logging in: ", error)
        this.errorMessage = 'An error occurred while logging in';
      });
    }else{
      this.errorMessage = 'Please enter both email and password.';
    }
  }
}














