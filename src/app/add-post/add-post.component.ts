import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {User} from "../../models/user.model";
import {AuthService} from "../../services/auth.service";
import {PostDalService} from "../../services/post-dal.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-post',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {
  currentUser?: User | null;


  auth = inject(AuthService)
  postService = inject(PostDalService)
  router = inject(Router)

  ngOnInit(){
    this.currentUser = this.auth.getCurrentUser()
  }

  constructor() {
  }

  addPost(addPostForm: any) {
    if(addPostForm.valid && this.currentUser){
      const formData = addPostForm.value;
      const newPost: { description: any; title: any; user: User } = {
        user: this.currentUser,
        title: formData.title,
        description: formData.description,
      }
      this.postService.addPost(newPost).then((data)=>{
        alert("Post added here")
        this.router.navigate(['/home']);
      }).catch((e)=>{
        alert("Error")
      })
    }
  }
}
