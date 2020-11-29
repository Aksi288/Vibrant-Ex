// Angular
import { Component, OnInit, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';

import {MatDialog,  MatPaginator, MatDialogConfig} from '@angular/material';
import { UserService } from '../service/tableClass';
import { UserApiService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialog } from './confirmation-dialog.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
	selector: 'users-list',
	templateUrl: './users-list.component.html',
	styleUrls: ['users-list.component.scss'],
})
export class UserListComponent implements OnInit {

	displayedColumns = ['id', 'first_name',  'last_name','email','actions'];

	public dataSource: UserService;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	constructor(
		private router: Router,
		private userApiService : UserApiService,
		private toastrService : ToastrService,
		private loaderService: Ng4LoadingSpinnerService,
		private dialog: MatDialog,
	) {
	  
	}


    ngOnInit( ){
         this.setDataSource()
	}

	
	setDataSource() {
		this.dataSource = new UserService(
			`users?`,
			this.paginator
		  );
		  this.dataSource.loadListData();
	  }
  


	  AddUser(){
		this.router.navigate(["user", "add"]);
	  }

	  editUser(userId:number){
		this.router.navigate(["user", userId, "edit"]);
	  }


	  viewUserDetails(userId) {
		this.router.navigate(["user", userId, "edit"], { queryParams: { view: 'true' } });
	  }



	  deleteUserDetails(rowData: object) {
	
		let userid = rowData["id"];
	
		const dialogConfig = new MatDialogConfig();
	
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
		  message: 'Do you really want to delete User?',
		  buttonText: {
			ok: 'Yes',
			cancel: 'No'
		  }
		};
	
		const dialogRef = this.dialog.open(ConfirmationDialog, dialogConfig);
	
		dialogRef.afterClosed().subscribe(result => {
		  if (result) {
			this.deleteUser(userid)
		  }
		}
		)
	  }

	  deleteUser(userId:number){
		  this.loaderService.show();
		this.userApiService.deleteUser(userId).subscribe(
			data => {
				this.loaderService.hide()
			  this.dataSource.whenDeleteData();
			  let succesMessage = `User deleted successfully`;
			  this.toastrService.success(succesMessage, '', {
				easing:'ease-in',
				easeTime: 300,
				progressBar:true,
				progressAnimation : 'increasing'
			  });
			},
			error => {
	  
			}
		  );
	  }


  }
 

  
 
  

