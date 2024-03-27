import { Component } from '@angular/core';
import {CommonModule, NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    NgIf
  ],
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showLogin = true;

  toggleSignup(){
    this.showLogin = !this.showLogin;
  }
}
















