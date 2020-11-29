import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	OnInit,
	Renderer2,
} from '@angular/core';
import {Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Modules/auth/_services/auth.service';

@Component({
	selector: 'app-aside-left',
	templateUrl: './aside-left.component.html',
	styleUrls: ['./aside-left.component.scss'],

})
export class AsideLeftComponent implements OnInit, AfterViewInit {

	constructor(

		private authService : AuthService,
	

		
	) {
	}

	ngAfterViewInit(): void {
	}

	ngOnInit() {
		var sideItem = document.getElementById("sideItem");
		var btns = sideItem.getElementsByClassName("module");
		for (var i = 0; i < btns.length; i++) {
		  btns[i].addEventListener("click", function() {
		  var current = document.getElementsByClassName("active");
		  current[0].className = current[0].className.replace(" active", "");
		  this.className += " active";
		  });
		}
	}


	logout(){
		this.authService.logout()
	}
	

}
