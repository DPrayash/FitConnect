import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/authentication.service';

function nameValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const name = control.value;
  if (name && !/^[A-Z][a-zA-Z ]*$/.test(name)) {
    return { 'invalidName': true };
  }
  return null;
}

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.css']
})
export class UserRegistrationFormComponent implements OnInit {

  GymInformation = "Join us";
  GymBody = "We are ready to welcome you ";

  registrationForm!: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private authService:AuthenticationService
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      userName: ['', [Validators.required, nameValidator]],
      userEmail: ['', [Validators.required, Validators.email]],
      userPasswordHash: ['', [Validators.required, Validators.minLength(8)]],
      userMobile: ['', [Validators.required, Validators.maxLength(12)]]
    });
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  registerUser() {
    if (this.registrationForm.valid) {
      const user: User = {
        userName: this.registrationForm.get('userName').value,
        userEmail: this.registrationForm.get('userEmail').value,
        userPasswordHash: this.registrationForm.get('userPasswordHash').value,
        userMobile: this.registrationForm.get('userMobile').value,
        userAge: 0,
        userProfilePicUrl: '',
        height: '',
        weight: 0,
        planName: '',
        planPrice: 0,
        planDuration: '',
        expirationDate: undefined
      };
      const authData:any={
        emailId: this.registrationForm.get('userEmail').value,
        userPassword: this.registrationForm.get('userPasswordHash').value
      }
      console.log(user);
      this.userService.registerUser(user).subscribe(
        (data) => {
          console.log("User Registered!!");
          console.log(data);
          this.authService.register(authData).subscribe((res:any)=>{
            console.log(res);
          })
          this.registrationForm.reset();
          this.openSnackBar("User Registered Successfully!", "Close");
          this.router.navigate(['/login']);
        }, (error) => {
          console.log(error);
          this.openSnackBar("User Registration Failed!", "Close");
        }
      );
    }
  }

  onSubmit() {
    this.registerUser();
  }


  openSnackBar(msg: string, action: string) {
    const snackBarRef = this._snackBar.open(msg, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
    });
  }
}


