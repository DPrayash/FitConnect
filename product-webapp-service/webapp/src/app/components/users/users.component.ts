import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserList();
  }

  userList: User[] = [];
  selectedUser: User | null = null;


  private getUserList() {
    this.userService.getUserList().subscribe((data) => {
      console.log(data);
      if(data != null && data.length > 0) {
        this.userList = data;
        this.selectUser(this.userList[0]);
      } else {
        this.userList = [];
      }
    });
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }
}
