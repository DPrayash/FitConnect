import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  dummyProfilePic = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCpY5LtQ47cqncKMYWucFP41NtJvXU06-tnQ&usqp=CAU";
  profilePic: String = null;
  updateForm: boolean = false;
  @Input() userRole:string;
  @Input() userId:string;
  isAdmin:boolean;
  selectedImageFile: File | null = null;

  constructor(private userService: UserService, private adminService: AdminService) { }

  ngOnInit(): void {
    console.log("UserRole: ", this.userRole);
    console.log("UserId: ", this.userId);

    if (this.userRole == "Admin") {
      this.getAdminProfilePic();
      this.isAdmin = true;
    }
    else {
      this.getUserProfilePic();
      this.isAdmin = false;
    }
  }

  private getAdminProfilePic() {
    this.adminService.getAdminInfo().subscribe(
      (data) => {
        this.profilePic = data.adminProfilePic;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  private getUserProfilePic() {
    this.userService.getUserByEmail(this.userId).subscribe(
      (data) => {
        this.profilePic = data.userProfilePicUrl;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  updateProfilePicForm() {
    this.updateForm = true;
  }

  closeForm() {
    this.updateForm = false;
  }

  updateProfilePic() {

    if (this.selectedImageFile != null) {
      const formData = new FormData();
      formData.append('file', this.selectedImageFile);
      if (this.userRole == "Admin") {
        this.adminService.updateAdminProfilePic(this.userId, formData).subscribe(
          (data) => {
            console.log(data);
            this.getAdminProfilePic();
            this.updateForm = false;
          },
          (error) => {
            console.log(error);
          }
        )
      }
      else { 
        this.userService.updateUserProfilePic(this.userId, formData).subscribe(
          (data) => {
            console.log(data);
            this.profilePic = data.userProfilePicUrl;
            this.getUserProfilePic();
            this.updateForm = false;
          },
          (error) => {
            console.log(error);
          }
        )
      }
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
}