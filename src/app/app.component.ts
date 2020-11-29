import { Component } from '@angular/core';
import { AuthService } from './Modules/auth/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'VibrantTest';
  constructor(
    private router: Router,
    private authService :AuthService
  ){

  }

  ngOnInit(){
    this.authService.populate()
 
  }
}
