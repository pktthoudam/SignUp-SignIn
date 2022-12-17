import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { MustMatch} from '../utils/mustMatch';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  // @ViewChild('password') passwordInput!: ElementRef;
  // @ViewChild('confPassword') confPasswordInput!: ElementRef;
  // passwordMatch:boolean = true;

  form3!: FormGroup;
  showError: boolean = false;
  errorMessage = "";
 

  constructor(private apiService: ApiServiceService, private fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {


    this.form3 = this.fb.group(
      {
        // _id: new FormControl('', [Validators.required]),
        password: new FormControl("", [Validators.required]),
        confirmPassword: new FormControl("", [Validators.required]),

        // _id: ["", [Validators.required]],
        // password: ["", [Validators.required]],
        // confirmPassword: ["", [Validators.required]],
       

      },
      {
        validators: MustMatch("password", "confirmPassword")
      }
    )
    
  }


  // get f() {
  //   return this.form3.controls;
  // }

  // matchPassword(){
  //   const pass = this.passwordInput.nativeElement.value;
  //   const conf = this.confPasswordInput.nativeElement.value;
  //  // console.log(this.passwordInput)
  //   if(pass != conf){
  //     this.passwordMatch = false;
  //   }else{
  //     this.passwordMatch = true;
  //   }
  // }

  onclick1() {
    console.log(this.form3.value);
    this.showError = true;
      this.apiService.postReset(this.form3.value).subscribe({
        next: (value) => {
          // console.log(value);
         alert(" Reset Succefully Done");
          this.router.navigate(['/signin'])
        },
        error: (error:HttpErrorResponse) => {
          if(error.error.message == "Password not matching"){
            this.errorMessage = "Please Match your Password and Confirm Password"
          }
        },
        complete: () => {
          console.log("Updated");
        }
      })
  }
}
