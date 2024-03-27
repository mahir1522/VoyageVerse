import {Component, OnInit} from '@angular/core';
import {Posts} from "../models/post.model";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  posts: Posts[] = [];

  ngOnInit() {
    this.posts = Posts.getPosts()
  }

}
