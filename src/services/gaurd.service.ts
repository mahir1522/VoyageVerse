import {inject, Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {CanActivate} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class GaurdService implements CanActivate{

  auth = inject(AuthService)
  router = inject(Router)
  constructor() { }

  canActivate(){

    if(this.auth.isAuthenticated()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
