import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserApiService } from '../service/user.service';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {


  @ViewChild(UserFormComponent, {static : true}) userFormRef: UserFormComponent;

  isViewMode :boolean = false;
   text:string;
   isSubmitPending: boolean = false;
   userData:any


  constructor(private router :Router,
    private route: ActivatedRoute,
    private userApiService : UserApiService,
    private toastrService: ToastrService,
    private loaderService: Ng4LoadingSpinnerService,
  ) {
    }


  ngAfterViewInit() {

  }


  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      if(params["view"]){
        this.isViewMode = true;
        this.text = "View User "
        this.userFormRef.userForm.disable();
      }
      else{
        this.isViewMode = false;
        this.text = "Update User"
      }
    });

    this.routeData()
  }

  routeData(){
  this.userData = this.route.snapshot.data["editUserInfo"].data;
  }

  /** Function to update samples data  */
  whenSubmitClicked(formData){
    this.loaderService.show()
    let userID = this.route.snapshot.params["userid"];
     this.userApiService
    .updateUser(userID, formData)
    .pipe(
      finalize(() => {
        this.loaderService.hide() 
      })
    )
    .subscribe(
      data => {
        this.router.navigate(["user", "user-list"]);
       let succesMessage = `User updated successfully`;
        this.toastrService.success(succesMessage, '', {
          easing:'ease-in',
          easeTime: 300,
          progressBar:true,
          progressAnimation : 'increasing'
        });
      }
    
    );
  }


  
}





