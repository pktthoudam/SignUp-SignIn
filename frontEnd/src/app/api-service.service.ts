import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from './person';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private httpClent: HttpClient) { }

  private apiSignUp = 'http://localhost:3000/person/signUp';
  private apiSignIn = 'http://localhost:3000/person/signIn';
  private apiForgot = 'http://localhost:3000/person/forgotPassword';
  private apiReset = 'http://localhost:3000/person/resetPassword';
  private apiVerifyEmail = 'http://localhost:3000/person/verifyEmail';

  // sign up

  postSignup(body: Person): Observable<Person> {
    return this.httpClent.post<Person>(this.apiSignUp, body)
  }

  // sign In

  postSignin(body: Person): Observable<Person> {
    return this.httpClent.post<Person>(this.apiSignIn, body)
  }

  // forgot 

  postForgot(body: Person): Observable<Person> {
    return this.httpClent.post<Person>(this.apiForgot, body)
  }

  postReset(body: Person): Observable<Person> {
    return this.httpClent.post<Person>(this.apiReset, body)
  }

  verifyEmail(email: string): Observable<any> {
    return this.httpClent.patch<any>(this.apiVerifyEmail + "/" + email, {})
  }
}
