import {Component, inject, OnInit} from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {User} from "../../models/user.model";
import {AuthService} from "../../services/auth.service";
import {UserDalService} from "../../services/user-dal.service";

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit{

  userDetails: User | null = null;

  auth = inject(AuthService)
  user = inject(UserDalService)
  router = inject(Router);


  ngOnInit(){
    this.userDetails = this.auth.getCurrentUser()
  }

  updated(updatedForm: NgForm) {
    if(updatedForm.valid){
      const formData = updatedForm.value;
      const id = this.userDetails?.userId;
      const updatedUser = {
        userId: id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.newUserEmail,
        password: formData.newUserPass,
        bio: formData.bio
      }

      this.user.update(updatedUser).then((data)=>{
        alert("Profile updated");
        this.router.navigate([`/profile/${id}`])
      }).catch((e)=>{
        alert("Error");
      })
    }
  }
}
