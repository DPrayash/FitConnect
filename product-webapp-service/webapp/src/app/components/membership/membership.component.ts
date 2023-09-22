import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { timestamp } from 'rxjs';
import { Payment } from 'src/app/models/payment.model';
import { Plan } from 'src/app/models/plan.model';
import { User } from 'src/app/models/user.model';
//import razorpay from 'razorpay';
import { GymService } from 'src/app/services/gym.service';
import { PaymentServiceService } from 'src/app/services/payment-service.service';
import { UserService } from 'src/app/services/user.service';

declare var Razorpay: any;
@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {
  constructor(
    private ps: PaymentServiceService, 
    private gs: GymService,
    private us: UserService
    ) {}

  planList: Plan[] = [];
  plansInfo: string[] = [];
  planPaid: User = new User();
  payment: Payment = new Payment();
  
  ngOnInit(){
    this.getPlanInfo();
  }

  private getPlanInfo(){
    this.gs.getPlanList().subscribe((data: any)=>{
      this.planList = data;
    });
  }

  createTransactionAnsPlaceOrder(planPrice:number){
    this.ps.createTransaction(planPrice).subscribe(
      (response: any)=> {
        console.log(response);
        this.openTransactionModel(response);
       this.us.getUpdatePlan('username1@email.com', this.planPaid).subscribe((data)=>{
        console.log(data);

        this.planPaid.planName = data.planName;
        this.planPaid.planPrice = data.planPrice;
        this.planPaid.planDuration = data.planDuration;
       });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  openTransactionModel(response: any) {
    var options = {
      order_id: response.paymentId,
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      name: response.userEmail,
      description: response.planName,
      paymentStatus: response.paymentStatus,
      image: '',
      
      handler: (response: any) => {
        this.processResponse(response);
      },
      prefill: {
        'name': '',
        'email': response.userEmail,
        'contact': ''
      },
      notes: {
        'address': ''
      },
      theme: {
        'color': '#F37254'
      }
    };

    var razorPayObject = new Razorpay(options);
    razorPayObject.open();
  }

  processResponse(res: any){
    console.log(res);
  }

  
  convertToDate() {
    var date = new Date(this.payment.timestamp).toLocaleDateString("en-us");
    console.log(date);
  }

  getPaidPlanInfo(){
    // this.ps.getTransactionByUser()
  }
}
