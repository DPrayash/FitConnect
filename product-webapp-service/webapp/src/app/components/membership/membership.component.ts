import { Component } from '@angular/core';
import { Plan } from 'src/app/models/plan.model';
//import razorpay from 'razorpay';
import { GymService } from 'src/app/services/gym.service';
import { PaymentServiceService } from 'src/app/services/payment-service.service';

declare var Razorpay: any;
@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent {
  constructor(
    private ps: PaymentServiceService, 
    private gs: GymService
    ) {}

  planList: Plan[] = [
  //   {
  //     "planId": "3d868e85-9ef1-4604-bf7e-de7c5db21333",
  //     "planName": "starter",
  //     "planPrice": 1500.0,
  //     "planDuration": "month"
  // },
  // {
  //     "planId": "11d23c70-3a93-4f70-b7f7-23208ef307f7",
  //     "planName": "pro",
  //     "planPrice": 5000.0,
  //     "planDuration": "6 month"
  // },
  // {
  //     "planId": "faa0b61e-b639-43ec-a832-6ab71d1fe0d8",
  //     "planName": "premium",
  //     "planPrice": 7500.0,
  //     "planDuration": "12 month"
  // }
  ];
  
  getPlanPrice(){

  }
  
  ngOnInit(){

    this.gs.getPlanList().subscribe((data: any)=>{
      this.planList = data
    });
  }

  createTransactionAnsPlaceOrder(planPrice:number){
    this.ps.createTransaction(planPrice).subscribe(
      (response: any)=> {
        console.log(response);
        this.openTransactionModel(response);
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
      description: response.paymentTitle,
      paymentStatus: response.paymentStatus,
      image: '',
      
      handler: (response: any) => {
        this.processResponse(response);
      },
      prefill: {
        'name': '',
        'email': '',
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
  
}
