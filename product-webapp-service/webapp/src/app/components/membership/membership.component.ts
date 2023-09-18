import { Component, OnInit } from '@angular/core';
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
export class MembershipComponent implements OnInit {
  constructor(
    private ps: PaymentServiceService, 
    private gs: GymService
    ) {}

  planList: Plan[] = [];
  plansInfo: string[] = [];
  
  ngOnInit(){
    this.getPlanInfo();
  }

  private getPlanInfo(){
    this.gs.getPlanList().subscribe((data: any)=>{
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
