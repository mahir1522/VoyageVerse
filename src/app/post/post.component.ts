import {Component, inject, OnInit} from '@angular/core';
import {FormGroup, FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Post} from "../../models/post.model";
import {PostDalService} from "../../services/post-dal.service";
import {AuthService} from "../../services/auth.service";
import {CameraService} from "../../services/camera.service";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    JsonPipe
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

  post: Post | undefined
  message: string | undefined;

  route = inject(ActivatedRoute)
  postService = inject(PostDalService)
  auth = inject(AuthService)
  camera = inject(CameraService)

  changeRoute = inject(Router)

constructor() {
  let id = Number(this.route.snapshot.paramMap.get("postId"))
  this.postService.select(id).then((data) =>{
    this.post= data
  }).catch((e)=>{
    console.log("Error: " +  e.message)
  })
}

  onEdit(editPostForm: NgForm) {
    if (this.post?.user.userId === this.auth.getCurrentUser()?.userId) {
      if (editPostForm.valid) {
        const formData = editPostForm.value;
        let id = this.post?.postId
        const updatedPost = {
          postId: id,
          title: formData.title,
          description: formData.description,
          imageUrl: formData.imageUrl,
          user: this.auth.getCurrentUser()
        }
        this.postService.update(updatedPost).then((data) => {
          console.log("Profile updated: ", data);
          this.changeRoute.navigate(["/home"])
          alert("Post updated successfully")
        }).catch((e) => {
          console.log("Error", e)
        })
      }
    }else{
      alert("You do not have permission to edit the post")
    }
  }
  deletePost() {
    if(this.post?.user.userId === this.auth.getCurrentUser()?.userId){
      this.postService.delete(this.post).then(()=>{
        alert("Post deleted Successfully")
        this.changeRoute.navigate(["/home"])
      }).catch((e)=>{
        console.log("Gettig error: " + e)
      })
    }else{
      alert("You do not have permission to delete the post")
    }
  }
  addFromLibrary() {
    this.camera.loadPhotoFromLibrary().then(data =>{
      if(this.post){
        this.post.imageUrl = data
        this.postService.update(this.post);
      }else{
        alert("there is no post")
      }
    }).catch(e=>{
      alert(e.toString())
    })
  }
}
