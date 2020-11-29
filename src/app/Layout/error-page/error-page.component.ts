
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
	selector: 'app-error-page',
	templateUrl: './error-page.component.html',
	styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit, OnDestroy {


	private sub: Subscription;

	constructor(private route: ActivatedRoute) {
	
	}


	ngOnInit() {
		
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
	
	}
}
