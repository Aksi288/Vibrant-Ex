import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { finalize } from 'rxjs/operators';


import { forkJoin } from 'rxjs';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserApiService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {


  @ViewChild(UserFormComponent, {static : true}) sampleFormRef: UserFormComponent;
  isViewMode :boolean = false;
   text:string;
   isSubmitPending: boolean = false;


  constructor(private router :Router,
    private route: ActivatedRoute,
    private userApiService :UserApiService,
    private toastrService: ToastrService,
    private loaderService: Ng4LoadingSpinnerService,
  ) {
 
    }


  ngOnInit() {

  }





/** Function to get samples data from route */






  /** Function to update samples data  */
  whenSubmitClicked(formData){
  this.loaderService.show()
     this.userApiService
    .addUser(formData)
    .pipe(
      finalize(() => {
       this.loaderService.hide();
            })
    )
    .subscribe(
      data => {
        this.router.navigate(["user", "user-list"]);
        let succesMessage = `User Add successfully`;
         this.toastrService.success(succesMessage, '', {
           easing:'ease-in',
           easeTime: 300,
           progressBar:true,
           progressAnimation : 'increasing'
         });
      },
    
    );
  }



}





