import { Component, OnInit } from '@angular/core';
import { Slot } from 'src/app/models/slot.model';
import { GymService } from 'src/app/services/gym.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  selectedDate!: string;
  availableSlots: Slot[] = [];
  minDate: Date;
  maxDate: Date;

  constructor(private gymService: GymService, private dialog: MatDialog) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.minDate.getDate() + 7);
  }

  ngOnInit(): void {
    this.selectedDate = this.formatDate(this.minDate.toDateString());
    this.getAvailableSlotsAtDate();
  }

  getAvailableSlotsAtDate() {
    if(this.selectedDate) {
      this.gymService.getSlotsByDate(this.formatDate(this.selectedDate)).subscribe((slots: Slot[]) => {

        this.availableSlots = slots.map((slot: Slot) => {
          slot.startTime = this.convertTo12HourFormat(slot.startTime);
          slot.endTime = this.convertTo12HourFormat(slot.endTime);
          return slot;
        }
        );
      })
    }
  }

  openDialog(slot: Slot) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px', data: { slot: slot }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
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

  convertTo12HourFormat(time24: string): string {
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const convertedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${convertedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
}
