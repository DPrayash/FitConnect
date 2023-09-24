import { Component, OnInit } from "@angular/core";
import { Feedback } from "src/app/models/feedback.model";
import { FeedbackService } from "src/app/services/feedback.service";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { GymService } from "src/app/services/gym.service";

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm: FormGroup;
  planList: String[] = [];
  constructor(
    private router: Router,
    private feedbackService: FeedbackService,
    private gymService: GymService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
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
    this.getPlanList();
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

      console.log("FEEDBACK: ", feedback);
      this.feedbackService.submitFeedback(feedback).subscribe(
        (data) => {
          console.log("Feedback submitted successfully.");
          console.log(data);
          this.openSnackBar("Feedback submitted successfully.", "Okay");
          this.feedbackForm.reset();
          this.router.navigate(["/bookings"])
        },
        (error) => {
          this.openSnackBar("Error submitting feedback. Please try again", "Okay");
        }
      );
    }
  }

  getPlanList() {
    this.gymService.getPlanList().subscribe(
      (data)=>{
        console.log("Plan List: ", data);
        if(data!=null&&data.length!=0){
          data.map(
            (plan)=>{
              this.planList.push(plan.planName);
            }
          )
          
        } else {
          this.planList = [];
        }

        console.log("Plan Names: ", this.planList);
      }
    )
  }

  openSnackBar(msg: string, action: string) {
    const snackBarRef = this._snackBar.open(msg, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
    });
  }
}