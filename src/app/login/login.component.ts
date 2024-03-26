import { Component } from '@angular/core';
import {CommonModule, NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showLogin = true;

  toggleSignup(){
    this.showLogin = !this.showLogin;
  }
}
















