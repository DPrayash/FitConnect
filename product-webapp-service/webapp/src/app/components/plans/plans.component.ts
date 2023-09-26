import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Plan } from 'src/app/models/plan.model';
import { GymService } from 'src/app/services/gym.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css'],
})
export class PlansComponent implements OnInit{

  constructor(private gymService: GymService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getPlanList();
  }

  planList: Plan[] = [];
  selectedPlan: Plan | null = null;
  formMode = false;
  updateMode = false;
  newPlanName = '';
  newPrice = 0;
  newDuration = '';
  newPlanDescription: string[] = [];
  newDescription: string = '';
  durationList: string[] = ['1 month', '2 months', '3 months', '6 months', '12 months', '18 months', '24 months'];


  selectPlan(plan: Plan) {
    this.selectedPlan = plan;
  }

  getPlanList() {
    this.gymService.getPlanList().subscribe((data) => {
      console.log("Plan List:", data);
      this.planList = data;
      if(data == null || data.length == 0) {
        this.formMode = true;
        this.updateMode = false;
      } else {
        this.selectedPlan = this.planList[0];
      }
    });
  }

  updatePlanForm(plan: Plan) {
    this.formMode = true;
    this.updateMode = true;
    this.newPlanName = plan.planName;
    this.newPrice = plan.planPrice;
    this.newDuration = plan.planDuration;
    this.newPlanDescription = plan.planDescription;
  }

  addPlanForm() {
    this.formMode = true;
    this.updateMode = false;
    this.newPlanName = '';
    this.newPrice = 0;
    this.newDuration = '';
    this.newPlanDescription = [];
  }

  closeForm() {
    this.formMode = false;
  }

  addDescription() {
    if (this.newDescription) {
      console.log(this.newDescription);
      console.log(this.newPlanDescription);
      this.newPlanDescription.push(this.newDescription);
      this.newDescription = '';
    }
  }

  removeDescription(index: number) {
    this.newPlanDescription.splice(index, 1);
  }

  createPlan() {

    if(this.newPlanName && this.newPrice && this.newDuration) {
      const plan = new Plan(this.newPlanName, this.newPrice, this.newDuration, this.newPlanDescription);
      this.gymService.addAPlan(plan).subscribe(
        (data) => {
          console.log("Plan Added:", data);
          this.openSnackBar("Plan Added Successfully", 'Close');
          this.getPlanList();
          this.formMode = false;
          this.updateMode = false;
          this.newPlanName = '';
          this.newPrice = 0;
          this.newDuration = '';
          this.newPlanDescription = [];
        }, (error) => {
          console.log(error);
          //this.openSnackBar(error.error.message, 'Close');
        }
      );
    }
  }

  updatePlan() {
    if (this.selectedPlan) {
      const plan = new Plan(this.newPlanName, this.newPrice, this.newDuration, this.newPlanDescription);
      this.gymService.updatePlan(this.selectedPlan.planId, plan).subscribe(
        (data) => {
          console.log("Plan Updated:", data);
          this.openSnackBar("Plan Updated Successfully", 'Close');
          this.getPlanList();
          this.formMode = false;
          this.updateMode = false;
          this.newPlanName = '';
          this.newPrice = 0;
          this.newDuration = '';
          this.newPlanDescription = [];
        }, (error) => {
          console.log(error);
          this.openSnackBar(error.error.message, 'Close');
        }
      );
    }
  }

  deletePlan(planId: string) {
    if (this.selectedPlan) {
      this.gymService.deletePlan(planId).subscribe(
        (data) => {
          console.log("Plan Deleted:", data);
          this.openSnackBar("Plan Deleted Successfully", 'Close');
          this.getPlanList();
          this.formMode = false;
        }, (error) => {
          console.log(error);
          this.openSnackBar(error.error.message, 'Close');
        }
      );
    }
  }

  openSnackBar(msg: string, action: string) {
    const snackBarRef = this._snackBar.open(msg, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
    });
  }
}
