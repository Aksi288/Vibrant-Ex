
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import {  FormGroup, Validators, FormControl } from '@angular/forms';
import { finalize,  tap } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public hide: boolean = true
	public loginForm: FormGroup;
	public loading : boolean =  false


	constructor(
		private router: Router,
		private apiService: ApiService,
		private authService: AuthService,
	) {
	
	}

	ngOnInit(): void {
		this.initLoginForm();
	}

	initLoginForm() {
		this.loginForm = new FormGroup({
			email: new FormControl(null, [
				Validators.required,
				Validators.email,
				Validators.minLength(5),
				Validators.maxLength(254)
			]),
			password: new FormControl(null,
				[Validators.required,
				Validators.minLength(8),
				Validators.maxLength(30)
				])

		})
	}


submit() {
	this.loading = true
		if (this.loginForm.valid) {
			this.apiService.post('login', this.loginForm.value).pipe(
				tap(user => {
					if (user) {
						window.localStorage["jwtToken"] = user["token"];
						this.authService.populate((error, done) => {
							if (done) {
								this.router.navigateByUrl(`/home`);
							}
							else{
								this.router.navigate(["/auth/login"]);
							}
						})

					}

				}),
				finalize(() => {
				this.loading = false
				})
			)
				.subscribe();

		}
	}


	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}




}
