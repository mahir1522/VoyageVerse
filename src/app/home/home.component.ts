import {Component, inject, OnInit} from '@angular/core';
import {Post} from "../../models/post.model";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {PostDalService} from "../../services/post-dal.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    NgIf,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  posts: Post[] = []

  route= inject(Router)

  postService = inject(PostDalService)

  ngOnInit() {
    this.postService.selectAll().then(posts =>{
      this.posts = posts
    }).catch(error =>{
      console.error("Error fetching posts: ", error);
    })
  }

  showPost(postId: number | undefined) {
    this.route.navigate(['/post', postId])
  }
}
