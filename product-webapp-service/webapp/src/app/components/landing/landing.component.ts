import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Slot } from 'src/app/models/slot.model';
import { Trainer } from 'src/app/models/trainer.model';
import { Plan } from 'src/app/models/plan.model';
import { GymService } from 'src/app/services/gym.service';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import Swiper from 'swiper';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  contactForm: FormGroup;

  constructor(private gymService: GymService, private feedbackService: FeedbackService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.getTrainerList();
    this.getPlanList();
    this.getFeedbackList();
  }

  OnLogin() {
    this.router.navigate(['login']);
  }

  OnRegister() {
    this.router.navigate(['registerUser']);
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
      if (data == null || data.length == 0) {
        this.planList = [];
      }
    });
  }
  getFeedbackList() {
    this.feedbackService.getAllFeedback().subscribe((data) => {
      console.log("feedback List:", data);
      this.FeedbackList = data;
      if (data == null || data.length == 0) {
        this.FeedbackList = [];
      }
    });
  }

  images: string[] = [
    '../../../assets/images/Fitness_Header.jpg',
    // '../../../assets/images/Fitness_Header2.jpeg',
    '../../../assets/images/Fitness_Header3.jpeg'

  ];


  slickCarouselConfig = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };
}



