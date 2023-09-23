import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit{

  productTitle = ['Fit', 'Connect'];
  dummyProfilePic = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCpY5LtQ47cqncKMYWucFP41NtJvXU06-tnQ&usqp=CAU";
  profilePic: string;
  @Input() isLoggedIn:boolean;
  @Input() userRole:string;
  @Input() userId:string;
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private userService: UserService, 
    private adminService: AdminService
  ) {
    
  }

  logout() {
    this.signOut.emit();
  }

  ngOnInit(): void {
    if (this.userRole == "Admin") {
      this.getAdminProfilePic();
    }
    else {
      this.getUserProfilePic();
    }
  }

  private getAdminProfilePic() {
    this.adminService.getAdminInfo().subscribe(
      (data) => {
        this.profilePic = data.adminProfilePic;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  private getUserProfilePic() {
    this.userService.getUserByEmail(this.userId).subscribe(
      (data) => {
        this.profilePic = data.userProfilePicUrl;
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
