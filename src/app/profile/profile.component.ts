import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user.model";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {Post} from "../../models/post.model";
import {PostDalService} from "../../services/post-dal.service";
import {CameraService} from "../../services/camera.service";
import {UserDalService} from "../../services/user-dal.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  posts: Post[] = []

  currentUser: User | null = null;

  auth = inject(AuthService)
  postService = inject(PostDalService)
  userService = inject(UserDalService)

  router = inject(Router)
  camera = inject(CameraService)

  ngOnInit(){
    this.currentUser = this.auth.getCurrentUser();
    this.postService.selectAll().then(posts =>{
      this.posts = posts.filter(p => p.user.userId === this.currentUser?.userId);
    }).catch(error =>{
      console.error("Error fetching posts: ", error);
    })
  }
  takePicture() {
    this.camera.capturePhoto().then(data=>{
      if(this.currentUser){
        this.currentUser.image = data
        this.userService.update(this.currentUser);
      }else{
        alert("Current user is null")
      }
    }).catch(e=>{
      alert(e.toString())
    });
  }
  addFromLibrary(){
    this.camera.loadPhotoFromLibrary().then(data=>{
      if(this.currentUser){
        this.currentUser.image = data
        this.userService.update(this.currentUser);
      }else{
        alert("Current user is null")
      }
    }).catch(e=>{
      alert(e.toString())
    })
  }

  editProfile() {
    this.router.navigate([`/edit-user/${this.currentUser?.userId}`]);
  }

  showPost(postId: number | undefined) {
    this.router.navigate(['/post', postId])
  }
}
