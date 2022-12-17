import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  verified = false
  verifyInProgress = false
  error!:any
  errorMessage = ""
  message!: string;

  constructor(
    private apiService: ApiServiceService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.verifyInProgress = true;
    this.activatedRoute.params.pipe(
      switchMap(params => {
        console.log(params);
        return this.apiService.verifyEmail(params["email"])
      })
    ).subscribe({
      next: data => {
        this.verified = true
        this.error = null
      },
      complete:() =>{
        this.verifyInProgress = false;
        this.error = null
      },
      error: (err:HttpErrorResponse) => {
        console.log(err);
        this.verifyInProgress = false;
        if(err.status == 400){
          if(err.error == "invalid user"){
            this.errorMessage = "Email does not exist."
            this.error = err
          } else if(err.error == "verified already"){
            this.message = "Email already verified."
            this.verified = true
            this.error = null
          }
        } else{
          this.error = err
        }
      }
    })
  }



}
