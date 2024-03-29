import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {AuthService} from "../services/auth.service";
import {MenuComponent} from "./menu/menu.component";
import {DatabaseService} from "../services/database.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent, HomeComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  auth = inject(AuthService)
  database = inject(DatabaseService)

  constructor() {
    this.database.initDatabase();
  }
  isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }
}
