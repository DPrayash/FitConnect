import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
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
  updateForm: any;
  
 
  constructor(private userService: UserService){

  }
  ngOnInit(): void {
   this.getUserDetails();
  }
  getUserDetails() {
    this.isLoading = true;
    this.userService.getUserByEmail("abd@yahoo.com").subscribe(
      (data) => {
        console.log(data);
        this.user = data; // Update the user object with retrieved data
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

    this.userService.updateUserDetails("abd@yahoo.com",user).subscribe(                 //this.user.userEmail
      (updatedUser) => {
        console.log('User updated:', updatedUser);
        this.isLoading = false;
        this.userUpdate = false; 
        this.user=updatedUser;
        this.getUserDetails();
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
  
 
