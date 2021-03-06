import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/authentification/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(
    public authService: AuthService) { }

  ngOnInit(): void {
  }

  // Create a new Account
  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // User Data in arguments
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signup(username, email, password);
    form.reset();
  }
}
