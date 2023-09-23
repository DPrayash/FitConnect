import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  user: User;
  isLoading: boolean = false;
  userUpdate: boolean = false;
  isLoggedIn: boolean;
  userId: string;
  updateForm: any;
  
 
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
    ){

  }
  ngOnInit(): void {
    this.isLoggedIn = this.userAuthService.isLoggedIn() !== null && this.userAuthService.isLoggedIn() !== '';
    if(this.isLoggedIn){
      this.userId = this.userAuthService.getUID();
      if(this.userId){
        this.getUserDetails(this.userId);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
  getUserDetails(userId: string) {
    this.isLoading = true;
    this.userService.getUserByEmail(userId).subscribe(
      (data) => {
        console.log(data);
        this.user = data; 
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching user details:', error);
        this.isLoading = false;
      }
    );
  }

  updateUserDetails() {
    this.isLoading = true;
   
    const user: User = {
      userName: this.user.userName,
      userEmail: this.user.userEmail,
      userPasswordHash: this.user.userPasswordHash,
      userMobile: this.user.userMobile,
      userAge: this.user.userAge,
      userProfilePicUrl: null,
      height: this.user.height,
      weight: this.user.weight,
      planName: '',
      planPrice: 0,
      planDuration: '',
      expirationDate: undefined
    };
    console.log(user);

    this.userService.updateUserDetails(this.userId, user).subscribe(                 
      (updatedUser) => {
        console.log('User updated:', updatedUser);
        this.isLoading = false;
        this.userUpdate = false; 
        this.user=updatedUser;
        this.getUserDetails(this.userId);
      },
      (error) => {
        console.error('Error updating user:', error);
        this.isLoading = false;
      }
    );
  }

  cancelUpdate() {
    this.userUpdate = false; 
  }
}
  
 
