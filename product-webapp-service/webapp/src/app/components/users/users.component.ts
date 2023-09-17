import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  userList: User[] = [
   
  ];
  

  selectedUser: User | null = null;


  ngOnInit() {
    if (this.userList.length > 0) {
      this.selectedUser = this.userList[0];
    }
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }
}
