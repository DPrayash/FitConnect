import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  userEmail = 'username1@email.com';
  rescheduleMode = false;
  rescheduleId: number | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, private dialogRef: MatDialogRef<DialogComponent>, private gymService: GymService, private userService: UserService, private _snackBar: MatSnackBar) {
    this.data = dialogData;
    this.selectedSlot = this.data.slot;
    this.rescheduleMode = this.data.rescheduleMode;
    this.rescheduleId = this.data.rescheduleId;
    this.getTrainerDetailsById(this.selectedSlot.slotId);
  }

  closeForm() {
    this.dialogRef.close();
  }

  private getTrainerDetailsById(slotId: string) {
    this.gymService.getTrainersBySlotId(slotId).subscribe((trainers: Trainer[]) => {
      this.trainerList = trainers;
    }
    );
  }

  confirmAndBook() {

    const snackBarRef = this._snackBar.open('Are you sure you want to book this slot?', 'Yes', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 10000,
    });

    snackBarRef.onAction().subscribe(() => {
      const activity = new Activity();
      if (this.rescheduleMode) {
        activity.activityId = this.rescheduleId;
      }
      activity.slotNumber = this.selectedSlot.slotId;
      activity.userEmail = this.userEmail;
      activity.slotStatus = 'BOOKED';
      activity.trainerName = this.selectedTrainer;
      activity.bookingDate = new Date().toISOString().slice(0, 10);

      console.log(activity);

      if (this.rescheduleMode) {
        this.userService.rescheduleASlot(this.rescheduleId, activity).subscribe((response: any) => {
          console.log(response);
          this.openSnackBar("Slot rescheduled successfully!", "OK", () => {
            this.closeForm();
          });
        },
          (error: any) => {
            console.log(error);
            this.openSnackBar("Error while rescheduling slot. Please try again later.", "OK", () => {
              this.closeForm();
            });
          });

      } else {
        this.userService.bookASlot(activity).subscribe((response: any) => {
          console.log(response);
          this.openSnackBar("Slot booked successfully!", "OK", () => {
            this.closeForm();
          });

        },
          (error: any) => {
            console.log(error);
            this.openSnackBar("Error while booking slot. Please try again later.", "OK", () => {
              this.closeForm();
            });
          });
      }

    });

    snackBarRef.afterDismissed().subscribe((dismissedAction) => {
      if (dismissedAction.dismissedByAction) {
        console.log('Booking confirmed.');
      } else {
        console.log('Booking canceled.');
      }
    });
  }


  openSnackBar(msg: string, action: string, callback: () => void) {
    const snackBarRef = this._snackBar.open(msg, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
    });

    snackBarRef.afterDismissed().subscribe(() => {
      if (callback) {
        callback();
      }
    });
  }

}
