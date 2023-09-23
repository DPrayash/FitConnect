import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { AdminService } from 'src/app/services/admin.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authenticationService : AuthenticationService, 
    private userAuthService: UserAuthService,private router:Router, private userService: UserService, private adminService: AdminService) {}


  login(loginForm:NgForm) {
    console.log(loginForm.value);
    this.authenticationService.login(loginForm.value).subscribe(
      (Response:any) => {
        console.log(Response);
        console.log(Response .jwtToken);
        console.log(Response.user.role);

        this.userAuthService.setRoles(Response.user.role[0].roleName);
        this.userAuthService.setToken(Response. jwtToken);
        this.userAuthService.setUID(Response.user.emailId);

        console.log("UID: ", this.userAuthService.getUID());



        const role = Response.user.role[0].roleName;
        if(role === 'Admin' || role === 'User'){
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  
  }

  registerUser(){
    this.router.navigate(['/registerUser']);
  }

}


