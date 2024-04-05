import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PostComponent} from "./post/post.component";
import {ProfileComponent} from "./profile/profile.component";
import {MapComponent} from "./map/map.component";
import {SettingsComponent} from "./settings/settings.component";
import {AddPostComponent} from "./add-post/add-post.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {ErrorComponent} from "./error/error.component";
import {AuthService} from "../services/auth.service";
import {GuardService} from "../services/guard.service";
import {EditUserComponent} from "./edit-user/edit-user.component";

export const routes: Routes = [

  {path: "home", component: HomeComponent, canActivate:[GuardService]},
  {path: "profile/:userId", component: ProfileComponent, canActivate:[GuardService]},
  {path: "map", component: MapComponent, canActivate:[GuardService]},
  {path: "settings", component: SettingsComponent, canActivate:[GuardService]},
  {path: "add-post", component: AddPostComponent, canActivate:[GuardService]},
  {path: "post/:postId", component: PostComponent, canActivate:[GuardService]},
  {path: "edit-user/:userId", component: EditUserComponent, canActivate:[GuardService]},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "", component: LoginComponent},
  {path: "**", component: ErrorComponent}
];
