import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Trainer } from 'src/app/models/trainer.model';
import { GymService } from 'src/app/services/gym.service';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})
export class TrainersComponent implements OnInit {

  constructor(private gymService: GymService, private _snackBar: MatSnackBar) { }
  ngOnInit() {
    this.getTrainerList();
  }
  trainerList: Trainer[] = [];

  selectedTrainer: Trainer | null = null;
  formMode = false;
  updateMode = false;
  newTrainerName!: string;
  newTrainerCategory!: string;
  newTrainerBio!: string;
  categoryList: string[] = [
    'Dance',
    'Yoga',
    'Pilates',
    'Martial Arts',
    'Fitness'
  ]

  selectedImageFile: File | null = null;

  selectTrainer(trainer: Trainer) {
    this.selectedTrainer = trainer;
  }



  updateTrainerForm(trainer: Trainer) {
    this.formMode = true;
    this.updateMode = true;
    this.newTrainerName = trainer.trainerName;
    this.newTrainerCategory = trainer.trainerCategory;
    this.newTrainerBio = trainer.trainerBio;
    this.selectedImageFile = null;
  }

  addTrainerForm() {
    this.formMode = true;
    this.newTrainerName = '';
    this.newTrainerCategory = '';
    this.newTrainerBio = '';
    this.selectedImageFile = null;
  }

  closeForm() {
    this.formMode = false;
    this.updateMode = false;
  }

  getTrainerList() {
    this.gymService.getTrainers().subscribe((data) => {
      console.log("Trainer List:", data);
      this.trainerList = data;
      if (data == null || data.length == 0) {
        this.addTrainerForm();
      } else {
        this.selectedTrainer = this.trainerList[0];
      }
    });
  }

  createTrainer() {
    if (this.selectedImageFile && this.newTrainerName && this.newTrainerCategory && this.newTrainerBio) {
      const trainer = new FormData();
      trainer.append('trainerName', this.newTrainerName);
      trainer.append('trainerCategory', this.newTrainerCategory);
      trainer.append('trainerBio', this.newTrainerBio);
      trainer.append('trainerImage', this.selectedImageFile);
      this.gymService.addATrainer(trainer).subscribe(
        (data) => {
          console.log("Trainer Added:", data);
          this.openSnackBar("Trainer added successfully", "Close");
          this.getTrainerList();
          this.closeForm();
        }, (error) => {
          console.log("Error:", error);
          this.openSnackBar("Error adding trainer", "Close");
        }
      );
    }

  }

  updateTrainer() {
    if (this.selectedTrainer) {
      const trainer = new FormData();
      trainer.append('trainerName', this.newTrainerName);
      trainer.append('trainerCategory', this.newTrainerCategory);
      trainer.append('trainerBio', this.newTrainerBio);
      if (this.selectedImageFile) {
        trainer.append('trainerImage', this.selectedImageFile);
      }
      this.gymService.updateTrainer(this.selectedTrainer.trainerId, trainer).subscribe(
        (data) => {
          console.log("Trainer Updated:", data);
          this.openSnackBar("Trainer updated successfully", "Close");
          this.getTrainerList();
          this.closeForm();
        }, (error) => {
          console.log("Error:", error);
          this.openSnackBar("Error updating trainer", "Close");
        }
      );
    }
  }

  deleteTrainer(trainerId: string) {
    if (this.selectedTrainer) {

      const snackBarRef = this._snackBar.open('Are you sure you want to delete this trainer?', 'Yes', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000,
      });

      snackBarRef.onAction().subscribe(() => {
        this.gymService.deleteTrainer(trainerId).subscribe(
          (data) => {
            console.log("Trainer Deleted:", data);
            this.openSnackBar("Trainer deleted successfully", "Close");
            this.getTrainerList();
          }, (error) => {
            console.log("Error:", error);
            this.openSnackBar("Error deleting trainer", "Close");
          }
        );
      });

      snackBarRef.afterDismissed().subscribe((dismissedAction) => {
        if (dismissedAction.dismissedByAction) {
          console.log('Deleted successfully.');
        } else {
          console.log('Delete failed.');
        }
      });
    }
  }

  onImageSelect(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImageFile = fileInput.files[0];
    }
  }

  selectImage() {
    const fileInput = document.getElementById('mediaImage');
    if (fileInput) {
      fileInput.click();
    }
  }

  getSelectedImageName() {
    if (this.selectedImageFile) {
      return this.selectedImageFile.name;
    }
    return null;
  }

  imagePreview() {
    if (this.selectedImageFile) {
      return URL.createObjectURL(this.selectedImageFile);
    }
    return null;
  }

  openSnackBar(msg: string, action: string) {
    const snackBarRef = this._snackBar.open(msg, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
    });
  }
}

