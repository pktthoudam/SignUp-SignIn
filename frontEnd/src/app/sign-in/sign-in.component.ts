import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  form1!:FormGroup
  errorMessage = "";
  successMessage = ""

  constructor(private apiService:ApiServiceService, private router:Router) { }

  ngOnInit(): void {
    this.form1 = new FormGroup({
      email: new FormControl(''),
      password:new FormControl("")
    })
  }
   
  onclick(){
    this.apiService.postSignin(this.form1.value).subscribe({
     next:(value)=>{this.successMessage = "Sign In Successfully";
    this.router.navigate(["/dashboard"])},
      error: (error: HttpErrorResponse)=>{
        console.log(error);
        if(error.error.message == "Email not verified.") {
          this.errorMessage = "Please verify your email first."
        } else if(error.error.message == "User not found!") {
          this.errorMessage = "Invalid  Credentials."
        }
      },
      complete:()=>{console.log("Login Success")}
    })
  }
}
