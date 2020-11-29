
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Injectable } from "@angular/core";
import { UserApiService } from '../service/user.service';



@Injectable()
export class EditUserResolve implements Resolve<any> {
  constructor(
    private userService: UserApiService
    ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let userid = route.params.userid;
    return this.userService.getUser(userid);
  }
}



