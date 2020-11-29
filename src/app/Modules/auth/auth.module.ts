import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthGuard } from './_guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule
} from '@angular/material';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
      },

    ]
  }
];

@NgModule({
  declarations: [AuthComponent,
    LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIconModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [
    AuthGuard]
})
export class AuthModule { }
