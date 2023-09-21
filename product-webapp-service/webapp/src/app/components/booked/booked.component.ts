import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/models/activity.model';
import { Slot } from 'src/app/models/slot.model';
import { GymService } from 'src/app/services/gym.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.css']
})
export class BookedComponent implements OnInit {

  constructor(private userService: UserService, private gymService: GymService, private router: Router) { }
  myActivityList: Activity[] = [];
  activitySlotInfo: Slot[] = [];
  selectedActivity: Activity | null = null;
  selectedSlotInfo: Slot | null = null;
  userEmail = 'username1@email.com';

  ngOnInit(): void {
    this.getMyBookedSlots();
  }

  getMyBookedSlots() {
    this.userService.getUserActivityListByUserEmail(this.userEmail).subscribe(
      (data) => {
        console.log("MY ACTIVITY: ", data);
        if (data != null && data.length > 0) {
          this.myActivityList = data;
          this.getSlotInfo();
          this.selectedActivity = data[0];
        }
      }
    )
  }

  getSlotInfo() {
    let idList: string[] = [];
    this.myActivityList.map((activity) => {
      idList.push(activity.slotNumber);
    });

    this.gymService.getSlotsBySlotIds(idList).subscribe(
      (data) => {
        console.log("Slots Info: ", data);
        this.activitySlotInfo = data;
        this.selectedSlotInfo = this.activitySlotInfo[0];
      }
    )
  }

  cancelSlot(activityId: number) {
    this.userService.cancelASlot(activityId).subscribe(
      (data) => {
        console.log('Updated activity: ', data);
        this.getMyBookedSlots();
      }
    )
  }

  rescheduleSlot() {

  }

  selectActivity(activity: Activity, slot: Slot) {
    this.selectedActivity = activity;
    this.selectedSlotInfo = slot;
  }

  isSlotActive(slot: Slot): boolean {
    const currentDate = new Date();
    const startTime = new Date(`${slot.slotDate} ${slot.startTime}`);
    return currentDate < startTime;
  }

  getTimings(slot: Slot) {
    return this.convertTo12HourFormat(slot.startTime) + " - " + this.convertTo12HourFormat(slot.endTime);
  }

  private convertTo12HourFormat(time24: string): string {
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const convertedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${convertedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
}
