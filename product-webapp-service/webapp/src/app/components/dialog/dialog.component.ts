import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Activity } from 'src/app/models/activity.model';
import { Slot } from 'src/app/models/slot.model';
import { Trainer } from 'src/app/models/trainer.model';
import { GymService } from 'src/app/services/gym.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @Input() data: any;
  selectedSlot: Slot;
  trainerList: Trainer[] = [];
  selectedTrainer!: string;
  userEmail = 'username1@email.com'

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, private dialogRef: MatDialogRef<DialogComponent>, private gymService: GymService, private userService: UserService) {
    this.data = dialogData;
    this.selectedSlot = this.data.slot;
    this.getTrainerDetailsById(this.selectedSlot.slotId);
  }

  closeForm() {
    if (confirm("Are you sure you want to cancel?")) {
      this.dialogRef.close();
    }
  }

  private getTrainerDetailsById(slotId: string) {
    this.gymService.getTrainersBySlotId(slotId).subscribe((trainers: Trainer[]) => {
      this.trainerList = trainers;
    }
    );
  }

  confirmAndBook() {
    if(confirm("Are you sure you want to book this slot?")) {
      const activity = new Activity();
      activity.slotNumber = this.selectedSlot.slotId;
      activity.userEmail = this.userEmail;
      activity.slotStatus = 'BOOKED';
      activity.trainerName = this.selectedTrainer;
      activity.bookingDate = new Date().toISOString().slice(0, 10);

      console.log(activity);

      this.userService.bookASlot(activity).subscribe((response: any) => {
        console.log(response);
        alert("Slot booked successfully!" + response.toString());
        this.dialogRef.close();
      },
      (error: any) => {
        console.log(error);
        alert("Error while booking slot. Please try again later.");
        this.dialogRef.close();
      });
    }
  }
}
