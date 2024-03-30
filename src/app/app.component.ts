import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {LoginComponent} from "./login/login.component";


@Component({
  selector: 'app-root',
  standalone: true,
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
