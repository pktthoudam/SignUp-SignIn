import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { SocialAuthService, SocialUser, GoogleLoginProvider } from '@abacritt/angularx-social-login'
  // import { Validations } from '../utils/Validations';
  ;
// import { ThisReceiver } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  errorMessage = "";
  successMessage = "";
  user!: SocialUser;
  isSignIn !: boolean
  loginForm!: FormGroup;
  isLoggedin?: boolean;

  signedIn = false;


  constructor(private apiService: ApiServiceService,
    private fb: FormBuilder, private socialAuthService: SocialAuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      // confirmPassword: new FormControl('', [Validators.required]),
    })

    // {
    //   validator: MustMatch("password", "confirmPassword")
    // });

    this.socialAuthService.authState.subscribe((data) => {
      this.user = data;
      this.isSignIn = (data != null);

    })


  }

  Submit() {
    console.log(this.form.value);
    
    this.apiService.postSignup(this.form.value).subscribe({
      next: (value) => {
        console.log(value);
        this.successMessage = "Check Your Mail to Verified";
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        if (error.error.message == "Email Already Exist") {
          this.errorMessage = "Email already exist"
        }
      },
      complete: () => {
        console.log("Sucessfully signUp");
      }
    })
  };
  GoogleLoginProvider: boolean = false;
  GoogelSignIn() {
    // this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
    //   .then((data) => {
    //     console.log("zzz", data);

    //     localStorage.setItem('google_auth', JSON.stringify(data));
    //     this.router.navigate(['/dashboard']).then();
    //   });
    // if (this.GoogleLoginProvider == true) {
    //   this.router.navigate(["/dashboard"]);
    //   console.log("jgfds");

    if (localStorage.getItem("g_token")) {
      this.signedIn = true;
      this.router.navigate(["dashboard"])
    } else {
      this.router.navigate([""])
    }
  }
}




