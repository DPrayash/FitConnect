import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/admin.model';
import { Gym } from 'src/app/models/gym.model';
import { Slot } from 'src/app/models/slot.model';

import { GymService } from 'src/app/services/gym.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  gymInfo: Gym = new Gym();
  adminInfo: Admin = new Admin();
  slotsInfo: string[] = [];
  equipmentsInfo: string[] = [];
  usersInfo: string[] = [];
  galleryInfo: string[] = [];
  plansInfo: string[] = [];
  trainersInfo: string[] = [];


  constructor(private gymService: GymService, private userService: UserService) { }

  ngOnInit(): void {
    this.getGymInfo();
    this.getAdminInfo();
    this.getSlotsInfo();
    this.getEquipmentsInfo();
    this.getUsersInfo();
    this.getGalleryInfo();
    this.getPlansInfo();
    this.getTrainersInfo();

  }

  gymUpdate: boolean = false;
  adminUpdate: boolean = false;

  private getGymInfo() {
    this.gymService.getGymInfo().subscribe((data) => {
      console.log('Gym Info:', data);
      this.gymInfo = data;
    })
  }

  updateGymInfo() {
    if (true) {
      this.gymService.updateGymInfo(this.gymInfo).subscribe((data) => {
        console.log("Updated Gym Info:", data);
        this.gymInfo = data;
      })
    }
    this.gymUpdate = false;
  }

  private getAdminInfo() {
    this.adminInfo.userEmail = "admin@example.com";
    this.adminInfo.userName = "Admin";
    this.adminInfo.userProfilePicUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCpY5LtQ47cqncKMYWucFP41NtJvXU06-tnQ&usqp=CAU";
  }

  updateAdminInfo() {
    this.adminUpdate = false;
  }

  private getSlotsInfo() {
    let todayDate = new Date();
    let todayDateString = todayDate.toISOString().slice(0, 10);
    this.gymService.getSlotsByDate(todayDateString).subscribe((data) => {
      console.log('Slots Info:', data);
      if (data != null && data.length > 0) {
        data.map((slot, id) => {
          let slotStr = "Slot " + (id + 1) + " - " + this.convertTo12HourFormat(slot.startTime.toString()) + " to " + this.convertTo12HourFormat(slot.endTime.toString());
          this.slotsInfo.push(slotStr);
        }
        );
      } else {
        this.slotsInfo = [];
      }
    });
    console.log("Slots Info:", this.slotsInfo);
  }

  private getEquipmentsInfo() {
    this.gymService.getEquipmentList().subscribe((data) => {
      console.log('Equipments Info:', data);
      if (data != null && data.length > 0) {
        data.map((equipment) => {
          let equipmentStr = equipment.equipmentName + " ( " + equipment.quantity + " available )";
          this.equipmentsInfo.push(equipmentStr);
        }
        );
      } else {
        this.equipmentsInfo = [];
      }
    });
  }

  private getUsersInfo() {
    let totalUsers = 0;
    let subscribedUsers = 0;
    let unsubscribedUsers = 0;

    this.userService.getUserList().subscribe((data) => {
      console.log('Users Info:', data);
      if (data != null && data.length > 0) {
        totalUsers = data.length;
        data.map((user) => {
          if (user.planName != null && user.planName != "") {
            subscribedUsers++;
          } else {
            unsubscribedUsers++;
          }
        });

      }     
      this.usersInfo = [];
      this.usersInfo.push("Total Users - " + totalUsers);
      this.usersInfo.push("Subscribed Users - " + subscribedUsers);
      this.usersInfo.push("Unsubscribed Users - " + unsubscribedUsers);
    }
    );

    this.usersInfo.push("Total Users - " + totalUsers);
    this.usersInfo.push("Subscribed Users - " + subscribedUsers);
    this.usersInfo.push("Unsubscribed Users - " + unsubscribedUsers);

  }

  private getGalleryInfo() {
    let images = 0;
    let gifs = 0;
    let videos = 0;
    this.gymService.getMediaList().subscribe((data) => {
      console.log('Gallery Info:', data);
      if (data != null && data.length > 0) {
        data.map((media) => {
          if (media.mediaCategory == "image") {
            images++;
          } else if (media.mediaCategory == "gif") {
            gifs++;
          } else if (media.mediaCategory == "video") {
            videos++;
          }
        });

        this.galleryInfo.push("Images - " + images);
        this.galleryInfo.push("Gifs - " + gifs);
        this.galleryInfo.push("Videos - " + videos);
      } else {
        this.galleryInfo = [];
      }
    });
  }

  private getPlansInfo() {
    this.gymService.getPlanList().subscribe((data) => {
      console.log('Plans Info:', data);
      if (data != null && data.length > 0) {
        data.map((plan) => {
          let planStr = plan.planName + " ( " + plan.planPrice + " / " + plan.planDuration + " )";
          this.plansInfo.push(planStr);
        }
        );
      } else {
        this.plansInfo = [];
      }
    });
  }

  private getTrainersInfo() {
    this.gymService.getTrainers().subscribe((data) => {
      console.log('Trainers Info:', data);
      if (data != null && data.length > 0) {
        data.map((trainer) => {
          let trainerStr = trainer.trainerName + " ( " + trainer.trainerCategory + " )";
          this.trainersInfo.push(trainerStr);
        }
        );
      } else {
        this.trainersInfo = [];
      }
    });
  }

  closeGymUpdate() {
    this.gymUpdate = false;
    this.getGymInfo();
  }

  closeAdminUpdate() {
    this.adminUpdate = false;
    this.getAdminInfo();
  }

  redirectToSlots() {
    window.location.href = "/slots";
  }

  redirectToEquipments() {
    window.location.href = "/equipments";
  }

  redirectToUsers() {
    window.location.href = "/users";
  }

  redirectToGallery() {
    window.location.href = "/gallery";
  }

  redirectToPlans() {
    window.location.href = "/plans";
  }

  redirectToTrainers() {
    window.location.href = "/trainers";
  }

  private convertTo12HourFormat(time24: string): string {
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const convertedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${convertedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
}
