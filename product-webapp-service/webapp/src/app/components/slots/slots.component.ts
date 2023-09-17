import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity.model';

import { Slot } from 'src/app/models/slot.model';
import { Trainer } from 'src/app/models/trainer.model';
import { GymService } from 'src/app/services/gym.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.css'],
})
export class SlotsComponent implements OnInit {

  constructor(private gymService: GymService, private userService: UserService) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.minDate.getDate() + 7);
  }

  ngOnInit() {
    this.getSlotList();
    this.getTrainersList();
  }


  slotList!: Slot[];
  selectedSlot: Slot | null = null;
  formMode = false;
  updateMode = false;
  filterMode = false;
  viewActivity = false;
  updateSlotId!: string;
  minDate: Date;
  maxDate: Date;
  newSlotDate!: string;
  newTimePeriod: string = '06:00 AM - 08:00 AM';
  selectedTrainers: string[] = [];
  selectedDate!: string;
  newMaxLimit: number = 10;
  activityList: Activity[] = [];
  trainersList: Trainer[] = [];

  timingsList: string[] = [
    '06:00 AM - 08:00 AM',
    '08:30 AM - 10:30 AM',
    '11:00 AM - 01:00 PM',
    '04:00 PM - 06:00 PM',
    '06:30 PM - 08:30 PM',
    '09:00 PM - 11:00 PM'
  ];











  private getSlotList() {
    this.gymService.getSlotList().subscribe((data) => {
      console.log("Slot List:", data);

      if (data == null || data.length == 0) {
        this.formMode = true;
        this.updateMode = false;
        this.newSlotDate = '';
        this.selectedTrainers = [];
        this.newMaxLimit = 10;
      }
      else {
        this.formMode = false;
        this.updateMode = false;
        this.slotList = data.map((slot) => {
          const startTime = this.convertTo12HourFormat(slot.startTime);
          const endTime = this.convertTo12HourFormat(slot.endTime);
          return { ...slot, startTime, endTime };
        });
        if (this.slotList.length > 0) {
          this.selectedSlot = this.slotList[0];
        }
      }
    });

  }

  private getTrainersList() {
    this.gymService.getTrainers().subscribe((data) => {
      console.log("Trainers List:", data);
      this.trainersList = data;
    });
  }

  createSlot() {
    if (this.newSlotDate != '' && this.newTimePeriod != '' && this.selectedTrainers.length > 0 && this.newMaxLimit > 0) {
      const [startTime, endTime] = this.newTimePeriod.split('-').map((time) => time.trim());
      const newSlot: Slot = {
        slotId: '',
        startTime: this.convertTo24HourFormat(startTime),
        endTime: this.convertTo24HourFormat(endTime),
        maximumLimit: this.newMaxLimit,
        slotDate: this.newSlotDate,
        trainerList: this.selectedTrainers,
      };

      this.gymService.addASlot(newSlot).subscribe((data) => {
        console.log("Slot Added:", data);
        this.getSlotList();
        this.formMode = false;
      });
    }

  }

  private getSlotsByDate(date: string) {
    this.gymService.getSlotsByDate(date).subscribe((data) => {
      console.log("Slot List:", data);
      if (data != null && data.length > 0) {
        this.slotList = data.map((slot) => {
          const startTime = this.convertTo12HourFormat(slot.startTime);
          const endTime = this.convertTo12HourFormat(slot.endTime);
          return { ...slot, startTime, endTime };
        });
        if (this.slotList.length > 0) {
          this.selectedSlot = this.slotList[0];
        }
      } else {
        this.slotList = [];
      }
    });
  }

  getActivityBySlotId(slotId: string) {
    this.userService.getActivityListBySlotId(slotId).subscribe((data) => {
      console.log("Activity List:", data);
      this.activityList = data;
    }
    );
  }

  updateSlot() {
    const [startTime, endTime] = this.newTimePeriod.split('-').map((time) => time.trim());
    const updatedSlot: Slot = {
      slotId: this.selectedSlot?.slotId || '',
      startTime: this.convertTo24HourFormat(startTime),
      endTime: this.convertTo24HourFormat(endTime),
      maximumLimit: this.newMaxLimit,
      slotDate: this.newSlotDate,
      trainerList: this.selectedTrainers,
    };

    this.gymService.updateSlot(this.updateSlotId, updatedSlot).subscribe((data) => {
      console.log("Slot Updated:", data);
      this.getSlotList();
      this.formMode = false;
    });

  }

  deleteSlot(slotId: string) {
    if (this.selectedSlot) {
      if (confirm(`Are you sure you want to delete the slot ${this.selectedSlot.slotDate} ${this.selectedSlot.startTime} - ${this.selectedSlot.endTime}?`)) {
        this.gymService.deleteSlot(slotId).subscribe(
          (response) => {
            console.log("Slot is Deleted successfully");
            this.getSlotList();
          },
          (error) => {
            console.error("Error deleting Slot:", error);
          }
        );
      }
    }

  }




  toggleViewActivity(slotId: string) {
    this.viewActivity = !this.viewActivity;
    if (this.viewActivity) {
      this.getActivityBySlotId(slotId);
    }
  }

  selectSlot(slot: Slot) {
    this.selectedSlot = slot;
    this.viewActivity = false;
    this.activityList = [];
  }

  closeForm() {
    this.formMode = false;
  }

  updateSlotForm(slot: Slot) {
    this.updateSlotId = slot.slotId;
    this.formMode = true;
    this.updateMode = true;
    this.newSlotDate = slot.slotDate;
    this.selectedTrainers = slot.trainerList;
    this.newMaxLimit = slot.maximumLimit;
    this.newTimePeriod = slot.startTime + " - " + slot.endTime;
  }

  addSlotForm() {
    this.formMode = true;
    this.updateMode = false;
    this.newSlotDate = '';
    this.selectedTrainers = [];
    this.newMaxLimit = 10;
  }

  getTrainerName(trainerId: string): string {
    const trainer = this.trainersList.find((trainer) => trainer.trainerId === trainerId);
    return trainer?.trainerName || '';
  }

  getTrainerImage(trainerId: string): string {
    const trainer = this.trainersList.find((trainer) => trainer.trainerId === trainerId);
    return trainer?.trainerImage || '';
  }

  startFilter() {
    this.filterMode = true;
    this.selectedDate = '';
  }

  clearFilter() {
    this.selectedDate = '';
    this.filterMode = false;
    this.getSlotList();
  }

  filterSlotsByDate() {
    console.log("Selected Date:", this.selectedDate);
    if (this.selectedDate) {
      let yyyy_mm_dd = this.formatDate(this.selectedDate);
      console.log("Selected Date:", yyyy_mm_dd);
      this.getSlotsByDate(yyyy_mm_dd);
    }

  }

  formatDate(inputDateString: string) {
    const inputDate = new Date(inputDateString);

    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const day = inputDate.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  isSlotActive(slot: Slot): boolean {
    const currentDate = new Date();
    const startTime = new Date(`${slot.slotDate} ${slot.startTime}`);
    return currentDate < startTime;
  }

  private convertTo12HourFormat(time24: string): string {
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const convertedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${convertedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  private convertTo24HourFormat(time12: string): string {
    const [time, period] = time12.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    const isPM = period.toLowerCase() === 'pm';
    const convertedHours = isPM ? hours + 12 : hours % 12;
    return `${convertedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
  }
}