import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity.model';
import { Slot } from 'src/app/models/slot.model';
import { User } from 'src/app/models/user.model';
import { GymService } from 'src/app/services/gym.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  constructor(
    private gs: GymService,
    private us: UserService,
    private uas: UserAuthService
  ) { }
  isLoggedIn: boolean;
  user: User = new User()
  activityList: Activity[] = [];
  latestActivity: Activity;
  slotInfo: Slot;
  userId: string;
  slotMetrics: string[];

  ngOnInit() {
    this.setUp();
  }

  setUp() {
    this.isLoggedIn = this.uas.isLoggedIn() !== null && this.uas.isLoggedIn() !== '';
    if (this.isLoggedIn) {
      this.userId = this.uas.getUID();
      if (this.userId) {
        this.getUserName(this.userId);
        this.getSlotInfo(this.userId);
      }
    }
  }

  getUserName(userId: string) {
      this.us.getUserByEmail(userId).subscribe((data) => {
        this.user.userName = data.userName;
        console.log(data.userName);
      })
  }

  getSlotInfo(userId: string) {
    this.us.getUserActivityListByUserEmail(userId).subscribe((data) => {
      this.activityList = data;
      console.log("Activity list", this.activityList);
      this.latestActivity = this.activityList[this.activityList.length - 1];
      console.log("Latest activity", this.latestActivity);
      this.gs.getSlotBySlotId(this.latestActivity.slotNumber).subscribe(
        (data) => {
          this.slotInfo = data;
          console.log("Data:", data);
        }
      );
      this.getSlotMetrics();
    })
  }

  getSlotMetrics() {
    this.slotMetrics = [];
    let tot = 0;
    let cancelled = 0;

    this.activityList.forEach((activity) => {
      tot++;
      if (activity.slotStatus === 'CANCELLED') {
        cancelled++;
      }
    });

    this.slotMetrics.push("Total slots booked are " + tot.toString());
    this.slotMetrics.push("Cancelled slots are " + cancelled.toString());

  }

}
