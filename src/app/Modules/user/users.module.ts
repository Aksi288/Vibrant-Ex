// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './users-list/users-list.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MatButtonModule,
	MatDialogModule,
	MatInputModule,
	MatListModule,
	MatMenuModule,
	MatPaginatorModule,
	MatIconModule,
	MatProgressSpinnerModule,
	MatTableModule,
	MatToolbarModule,
	MatTooltipModule,

} from '@angular/material';

import { CoreModule } from 'src/app/core/core.module';
import { UsersComponent } from './users.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserEditComponent } from './user-edit/user-edit.component';

import { EditUserResolve } from './resolves/user.resolve';
import { UserApiService } from './service/user.service';
import { ConfirmationDialog } from './users-list/confirmation-dialog.component';
import { UserAddComponent } from './user-add/user-add.component';


const routes: Routes = [
	{
		path: '',
		component: UsersComponent,
		children: [
			{
				path: '',
				redirectTo: 'user-list',
				pathMatch: 'full'
			},
			{
				path: 'user-list',
				component: UserListComponent
			},
			{
				path: 'add',
				component: UserAddComponent,

			},

			{
				path: ':userid/edit',
				component: UserEditComponent,
				resolve: {
					editUserInfo: EditUserResolve,

				},

			}
		]
	}
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		MatButtonModule,
		MatDialogModule,
		MatInputModule,
		MatListModule,
		MatMenuModule,
		MatPaginatorModule,
		MatIconModule,
		MatProgressSpinnerModule,
		MatTableModule,
		MatToolbarModule,
		MatTooltipModule,
		CoreModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule
	],
	providers: [UserApiService, EditUserResolve],
	declarations: [
		UserListComponent,
		UsersComponent,
		UserFormComponent,
		UserEditComponent,
		ConfirmationDialog,
		UserAddComponent
	],
	entryComponents: [ConfirmationDialog]
})
export class UserModule {
}
