import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import {UserDalService} from "../../services/user-dal.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  standalone: true,
  imports: [
    RouterLink
  ],
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  auth = inject(AuthService)
  user = inject(UserDalService)
  router = inject(Router)

  currentUser: User | null = null;

  constructor() {}

  async ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();
  }

  async goToProfile(): Promise<void> {
    const currentUser = this.auth.getCurrentUser();
    if (currentUser) {
      try {
        const userProfile = await this.user.getUserProfile(currentUser.userId) as User;
        if (userProfile) {
          this.router.navigate([`/profile/${userProfile.userId}`]);
        } else {
          console.error('User profile not found');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    } else {
      console.error('Current user is not logged in');
    }
  }

  logout() {
    this.auth.logout()
    this.router.navigate(['/login']);
  }
}
