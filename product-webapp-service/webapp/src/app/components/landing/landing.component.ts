import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Slot } from 'src/app/models/slot.model';
import { Trainer } from 'src/app/models/trainer.model';
import { Plan } from 'src/app/models/plan.model';
import { GymService } from 'src/app/services/gym.service';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';
// import Swiper from 'swiper';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit  {

  constructor(private gymService: GymService, private feedbackService: FeedbackService) {};
  ngOnInit() {
    this.getTrainerList();
    this.getPlanList();
    this.getFeedbackList();
  }  

  trainerList: Trainer[] = [];
  planList: Plan[] = [];
  FeedbackList: Feedback[] = [];
  getTrainerList() {
    this.gymService.getTrainers().subscribe((data) => {
      console.log("Trainer List:", data);
      this.trainerList = data;
      if (data == null || data.length == 0) {
        this.trainerList = [];
      }
    });
  }
  
 getPlanList() {
  this.gymService.getPlanList().subscribe((data) => {
    console.log("Plan List:", data);
    this.planList = data;
    if(data == null || data.length == 0) {
      this.planList = [];
    }
  });
}
getFeedbackList() {
  this.feedbackService.getAllFeedback().subscribe((data) => {
    console.log("feedback List:", data);
    this.FeedbackList = data;
    if(data == null || data.length == 0) {
      this.FeedbackList = [];
    }
  });
}

  slideConfig = {
  "slidesToShow": 3,
  "slidesToScroll": 3,
  "autoplay": false,
  "autoplaySpeed" : 5000,
  "pauseOnHover" : true,
  "infinite": true,
  "responsive" : [
  { 
    "breakpoint": 992,
  
  "settings": {
  "arrows": true,
  "infinite": true,
  "slidesToShow": 3,
  "slidesToScroll": 3
}
  },
  {
    "breakpoint": 992,
  
  "settings": {
  "arrows": true,
  "infinite": true,
  "slidesToShow": 3,
  "slidesToScroll": 3
  }
}
]
  };
}




