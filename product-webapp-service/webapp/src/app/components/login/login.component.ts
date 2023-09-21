import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authenticationService : AuthenticationService, 
    private userAuthService: UserAuthService,private router:Router) {}


  login(loginForm:NgForm) {
    this.authenticationService.login(loginForm.value).subscribe(
      (Response:any) => {
        console.log(Response .jwtToken);
        console.log(Response.user.role);

        this.userAuthService.setRoles(Response.user.role);
        this.userAuthService.setToken(Response. jwtToken);



        const role = Response.user.role[0].roleName;
        if(role === 'Admin')
        {
          this.router.navigate(['/home']);

        }else {
          this.router.navigate(['/userHome']);

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


