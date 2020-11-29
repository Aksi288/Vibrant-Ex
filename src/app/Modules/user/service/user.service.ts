import { Injectable } from "@angular/core";
import { ApiService } from 'src/app/core/services/api.service';
import { Observable } from 'rxjs';


@Injectable()
export class UserApiService {

constructor(private apiService: ApiService) { }


getUser(userid: number): Observable<any> {
    return this.apiService.get(`users/${userid}`);
  }
  updateUser(userid , body): Observable<any>{
    return this.apiService.put(`users/${userid}`, body);
  }

addUser( body): Observable<any>{
  return this.apiService.post(`users/`, body);
}

  deleteUser(userid: number): Observable<any> {
    return this.apiService.delete(`users/${userid}`);
}






}
