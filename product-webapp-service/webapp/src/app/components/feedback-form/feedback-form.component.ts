import { Component, OnInit } from "@angular/core";
import { Feedback } from "src/app/models/feedback.model";
import { FeedbackService } from "src/app/services/feedback.service";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private feedbackService: FeedbackService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group({
      customerName: ['', Validators.required],
      customerMembershipPlan: [''],
      feedbackTitle: ['', Validators.required],
      feedbackDescription: [''],
      ratings: ['0'],
      feedbackRemarks: ['']
    });
   }

  submitForm() {
    if(this.feedbackForm.valid){
      const feedback: Feedback = {
        customerName: this.feedbackForm.get('customerName').value,
        customerMembershipPlan: this.feedbackForm.get('customerMembershipPlan').value,
        feedbackTitle: this.feedbackForm.get('feedbackTitle').value,
        feedbackDescription: this.feedbackForm.get('feedbackDescription').value,
        feedbackRemarks: this.feedbackForm.get('feedbackRemarks').value,
        ratings: this.feedbackForm.get('ratings').value
      };

      this.feedbackService.submitFeedback(feedback).subscribe(
        (data) => {
          console.log("Feedback submitted successfully.");
          console.log(data);
          this.successMessage='Feedback submitted successfully.';
          this.errorMessage=null;
          this.feedbackForm.reset();
        },
        (error) => {
          this.errorMessage = 'Error submitting feedback. Please try again';
          this.successMessage = null;
        }
      );
    }
  }
}