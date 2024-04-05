import {Component, inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  auth = inject(AuthService)
  router = inject(Router)


  logout() {
    this.auth.logout()
    this.router.navigate(['/login']);
  }

}
