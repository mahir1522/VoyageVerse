import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  currentUser: User | null = null;

  auth = inject(AuthService)

  ngOnInit(){
    this.currentUser = this.auth.getCurrentUser();
  }
}
