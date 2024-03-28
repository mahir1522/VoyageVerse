import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PostComponent} from "./post/post.component";
import {ProfileComponent} from "./profile/profile.component";
import {MapComponent} from "./map/map.component";
import {SettingsComponent} from "./settings/settings.component";
import {AddPostComponent} from "./add-post/add-post.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";

export const routes: Routes = [

  {path: "home", component: HomeComponent},
  {path: "profile/:userId", component: ProfileComponent},
  {path: "map", component: MapComponent},
  {path: "settings", component: SettingsComponent},
  {path: "add-post", component: AddPostComponent},
  {path: "post/:postId", component: PostComponent},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "", component: LoginComponent},

];
