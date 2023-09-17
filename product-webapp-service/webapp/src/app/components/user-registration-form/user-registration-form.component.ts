import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

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
    private userService: UserService
  ) {}

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
      console.log(user);
      this.userService.registerUser(user).subscribe((data) => {
        console.log("User Registered!!");
        console.log(data);
        this.registrationForm.reset(); // Reset the form
      });
    }
  }

  onSubmit() {
    
      this.registerUser();
      alert("You are registered");
      // this.router.navigate(['/loginUser']); // Change the path to the login user page here 
    
  }
}


