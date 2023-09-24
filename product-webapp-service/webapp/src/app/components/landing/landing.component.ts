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
    'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1544033527-b192daee1f5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGd5bXxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=2000&q=60',
    'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80'

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



