
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from "./interceptors/http.token.interceptor";
import { ApiService } from './services/api.service';
import { HttpClientModule } from "@angular/common/http";
@NgModule({
	imports: [CommonModule,
		HttpClientModule],
	declarations: [

	],
	exports: [],
	providers: [
		{provide : HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor,  multi: true	},
		ApiService
	]
})
export class CoreModule {
}
