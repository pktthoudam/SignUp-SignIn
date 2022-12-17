import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  form2!: FormGroup;
  successMessage = "";
  errorMessage = "";

  constructor(private apiService: ApiServiceService) { }


  ngOnInit(): void {
    this.form2 = new FormGroup({
      email: new FormControl("")
    })
  }

  onclick1() {
    this.apiService.postForgot(this.form2.value).subscribe({
      next: (value) => {
       this.successMessage = " Please check your Email to Reset your Password "
      },
      error:(error:HttpErrorResponse)=>{ 
        if(error.error.message=="Email not found"){
          this.errorMessage = "Email Does Not Exist"
        }
            
      },
      complete:()=>{
        console.log("succesffull");
        
      }
    })
  }

}
