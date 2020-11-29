import { Component, OnInit, Output,EventEmitter, Input, ViewChild, TemplateRef } from "@angular/core";
import { ActivatedRoute, Router, Routes } from "@angular/router";
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: "user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss"],

})
export class UserFormComponent implements OnInit {


  public userForm :FormGroup ;
  @Output() whenSubmitClicked: EventEmitter<any> = new EventEmitter();
  @Output() whenCancelClicked: EventEmitter<any> = new EventEmitter();
  @Input() userData : any;
  @Input() mode : any;
   @Input() isViewMode : any;


  constructor(

    public dialog: MatDialog,
    public router : Router


  ) { }


  ngOnInit() {
    this.createUserForm();
     this.isEditForm();
    
  }


 /** Create Form */
 createUserForm(){
    this.userForm = new FormGroup({
      first_name: new FormControl(null ,Validators.required),
      last_name: new FormControl(null, Validators.required),
      email :  new FormControl(null,Validators.required),
      name :  new FormControl(null),
      phone: new FormControl(null ),
      address: new FormControl(null),
      pincode :  new FormControl(null), 
    }
    )
  
  }


  isEditForm(){
    if(this.mode == "edit" || this.mode == "view"){
      this.userForm.patchValue(this.userData);
    }
  
    if(this.isViewMode){
      this.userForm.disable();
    }

  }
  
/** Submit Form data to update user*/
onSubmit(): void {
  if (this.userForm.valid) {
    let data = this.userForm.getRawValue();
    this.whenSubmitClicked.emit(data);
  }
}

  onCancel(){
    this.router.navigate(["user", "user-list"]);
  }



  get emailcontrol(){
return this.userForm.controls.email;
  }

get lastnamecontrol(){
  return this.userForm.controls.last_name;
}

get firstnamecontrol(){
 return this.userForm.controls.first_name;
}








  

}

