import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login'
import { SocialUser } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { GoogleApiService, UserInfo } from '../google-api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // public user!: any;
  // isSignin?: boolean;
  userInfo?: UserInfo;
  isLoggedIn:any;
  constructor(private socailAuthService: SocialAuthService, private router: Router, private readonly googleApi: GoogleApiService) {
    googleApi.userProfileSubject.subscribe(info => {
      this.userInfo = info
    })
  }

  ngOnInit() {



  }

  logout(){
    
  }
}




