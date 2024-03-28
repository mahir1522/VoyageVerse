import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
// import {NgIf} from "@angular/common";
// import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  imports: [
    NgIf,
    RouterLink
  ],
  styleUrl: './menu.component.css'
})
export class MenuComponent   {

}
