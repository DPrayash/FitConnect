import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaFile } from 'src/app/models/mediafile.model';
import { GymService } from 'src/app/services/gym.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {

  constructor(private gymService: GymService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMediaFileList();
  }

  mediaFiles: MediaFile[] = [];

  selectedMediaFile: MediaFile | null = null;
  formMode = false;
  updateMode = false;
  updateMediaId!: string;
  newMediaName!: string;
  newMediaCategory!: string;

  selectedImageFile: File | null = null;

  showDetails(mediaFile: MediaFile) {
    this.selectedMediaFile = mediaFile;
  }

  hideDetails() {
    this.selectedMediaFile = null;
  }

  updateMediaFileForm(mediaFile: MediaFile) {
    this.formMode = true;
    this.updateMode = true;
    this.newMediaName = mediaFile.mediaName;
    this.newMediaCategory = mediaFile.mediaCategory;
    this.selectedImageFile = null;
    this.updateMediaId = mediaFile.mediaId;
  }

  addMediaFileForm() {
    this.formMode = true;
    this.updateMode = false;
    this.newMediaName = '';
    this.newMediaCategory = '';
    this.selectedImageFile = null;
  }

  closeForm() {
    this.formMode = false;
    this.updateMode = false;
  }

  private getMediaFileList() {
    this.gymService.getMediaList().subscribe((data) => {
      console.log('Media File List:', data);
      this.mediaFiles = data;
      if (data == null || data.length == 0) {
        this.addMediaFileForm();
      } else {
        this.selectedMediaFile = this.mediaFiles[0];
      }
    });
  }

  createMediaFile() {
    if (this.selectedImageFile && this.newMediaName && this.newMediaCategory) {
      const mediaFile = new FormData();
      mediaFile.append('mediaName', this.newMediaName);
      mediaFile.append('mediaCategory', this.newMediaCategory);
      mediaFile.append('media', this.selectedImageFile);

      this.gymService.addAMedia(mediaFile).subscribe(
        (data) => {
          console.log('Media File Added:', data);
          this.openSnackBar('Media File Added', 'Close');
          this.getMediaFileList();
          this.closeForm();
        } , (error) => {
          console.log('Error', error);
          this.openSnackBar('Error in adding media file', 'Close');
        }
      );
    }
  }

  updateMediaFile() {
    const mediaFile = new FormData();
    mediaFile.append('mediaName', this.newMediaName);
    mediaFile.append('mediaCategory', this.newMediaCategory);
    if (this.selectedImageFile) {
      mediaFile.append('media', this.selectedImageFile);
    }

    this.gymService.updateMedia(this.updateMediaId, mediaFile).subscribe(
      (data) => {
        console.log('Media File Updated:', data);
        this.openSnackBar('Media File Updated', 'Close');
        this.getMediaFileList();
        this.closeForm();
      }, (error) => {
        console.log('Error', error);
        this.openSnackBar('Error in updating media file', 'Close');
      }
    );
  }

  deleteMediaFile(mediaId: string) {

    const snackBarRef = this._snackBar.open('Are you sure?', 'Yes', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
    });
  
    snackBarRef.onAction().subscribe(() => {
      this.gymService.deleteMedia(mediaId).subscribe(
        (data) => {
          console.log('Media File is Deleted successfully');
          this.openSnackBar('Media File Deleted', 'Close');
          this.getMediaFileList();
        },
        (error) => {
          console.log('Error', error);
          this.openSnackBar('Error in deleting media file', 'Close');
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

  selectImage() {
    const fileInput = document.getElementById('mediaImage');
    if (fileInput) {
      fileInput.click();
    }
  }


  onImageSelect(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImageFile = fileInput.files[0];
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
