import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  @Input() isLoggedIn: boolean;
  @Input() userId: string;
  @Input() userRole: string;

  constructor(private router: Router, private userAuthService: UserAuthService) {
  }

  ngOnInit(): void {
    console.log(this.userRole);
    console.log(this.userId);
    console.log(this.isLoggedIn);
    this.getDetails();

  }

  getDetails() {

    this.userId = this.userAuthService.getUID();
    this.userRole = this.userAuthService.getRoles();
    this.isLoggedIn = this.userAuthService.isLoggedIn() !== null && this.userAuthService.isLoggedIn() !== '';
    if (this.userRole === 'Admin' && this.isLoggedIn) {
      this.router.navigate(['/home']);

    } else if (this.userRole === 'User' && this.isLoggedIn) {

      this.router.navigate(['/userHome']);

    } else {
      this.router.navigate(['/']);
    }
    console.log(this.userRole);
    console.log(this.userId);
    console.log(this.isLoggedIn);
  }


}
