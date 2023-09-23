import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private userAuthSevice: UserAuthService, private router: Router){}

  ngOnInit(): void {
    this.isLoggedIn = this.userAuthSevice.isLoggedIn() !== null && this.userAuthSevice.isLoggedIn() !== '';
    console.log(this.userAuthSevice.isLoggedIn());
    this.userId = this.userAuthSevice.getUID();
    console.log(this.userAuthSevice.getUID());
    this.userRole = this.userAuthSevice.getRoles();
  }

  title = 'fitConnect';
  isLoggedIn:boolean;
  userId:string;
  userRole:string;

  getUserRole() {
    console.log(this.userAuthSevice.getRoles());
    
  }

  signOut() {
    this.isLoggedIn = false;
    this.userId = '';
    this.userAuthSevice.clear();
    this.router.navigate(['/login']);
  }
}
