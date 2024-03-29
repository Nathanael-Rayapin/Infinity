import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterAnimation } from 'src/app/layout/material/animation/register-animation';
import { StateRegisterService } from 'src/app/layout/material/animation/register-animation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [RegisterAnimation]
})
export class RegisterComponent implements OnInit {

  constructor(
    public stateRegister: StateRegisterService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void { }

  // Transition Sign in to Log in
  tologIn(): void {
    this.stateRegister.toLoginState();
  }

  // Transition Log in to Sign in
  tosignIn(): void {
    this.stateRegister.toSignInState();
  }

  // Close
  closeModal(): void {
    this.dialog.closeAll();
  }

}
