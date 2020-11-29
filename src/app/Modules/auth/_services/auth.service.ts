
import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { Router } from "@angular/router";


@Injectable()
export class AuthService {

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);

  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(
      private router: Router,
      ) { }
  


    populate(callback?) {
      if (localStorage.jwtToken) {
        this.isAuthenticatedSubject.next(true);
        if(callback)
        callback(null, true);
      }else{
        this.isAuthenticatedSubject.next(false);
        if(callback)
        callback(true, null);
      } 
    }
  
  
    logout(){
      window.localStorage.clear();
     this.isAuthenticatedSubject.next(false);
     this.router.navigate(["/auth/login"]);
    }

  











}
