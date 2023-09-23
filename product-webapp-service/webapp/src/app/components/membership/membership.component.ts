import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { Router } from '@angular/router';
import { timestamp } from 'rxjs';
import { Payment } from 'src/app/models/payment.model';
import { Plan } from 'src/app/models/plan.model';
import { User } from 'src/app/models/user.model';
//import razorpay from 'razorpay';
import { GymService } from 'src/app/services/gym.service';
import { PaymentServiceService } from 'src/app/services/payment-service.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
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
    private us: UserService,
    private uas: UserAuthService,
    private router: Router
  ) { }

  planList: Plan[] = [];
  planPaid: User = new User();
  payment: Payment = new Payment();
  userId: string;
  isLoggedIn: boolean;
  alreadyPaid: boolean = false;

  ngOnInit() {
    this.isLoggedIn = this.uas.isLoggedIn() !== null && this.uas.isLoggedIn() !== '';
    if (this.isLoggedIn) {
      this.userId = this.uas.getUID();
    } else {
      this.router.navigate(['/login']);
    }

    this.getPlanInfo();
    this.getPaidPlanInfo();
  }

  private getPlanInfo() {
    this.gs.getPlanList().subscribe((data: any) => {
      this.planList = data;
      console.log(this.planList);
    });
  }

  createTransactionAnsPlaceOrder(plan: Plan) {
    this.ps.createTransaction(plan.planPrice, plan.planName, this.userId).subscribe(
      (response: any) => {
        console.log(response);
        this.openTransactionModel(response);
        this.planPaid.planName = plan.planName;
        this.planPaid.planPrice = plan.planPrice;
        this.planPaid.planDuration = plan.planDuration;
        this.planPaid.expirationDate = this.calculateExpirationDate(plan.planDuration);
        this.us.getUpdatePlan(this.userId, this.planPaid).subscribe((data) => {
          console.log(data);
          this.alreadyPaid = true;
          console.log(this.planPaid);
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
    this.getPaidPlanInfo();
  }

  processResponse(res: any) {
    console.log(res);
  }


  convertToDate() {
    var date = new Date(this.payment.timestamp).toLocaleDateString("en-us");
    console.log(date);
  }

  getPaidPlanInfo() {
    this.us.getUserByEmail(this.userId).subscribe((data) => {
      console.log(data);
      if (data.planName !== null && data.planName !== undefined && data.planName !== "") {
        this.alreadyPaid = true;
        this.planPaid.planName = data.planName;
        this.planPaid.planPrice = data.planPrice;
        this.planPaid.planDuration = data.planDuration;
        this.planPaid.expirationDate = data.expirationDate;
      } else {
        this.alreadyPaid = false;
      }

      console.log(this.planPaid);
    });
  }


private calculateExpirationDate(validity: string): Date {
  const currentDate = new Date();
  const [value, unit] = validity.split(" ");
  let expirationDate = new Date(currentDate);

  switch (unit.toLowerCase()) {
    case "day":
    case "days":
      expirationDate.setDate(currentDate.getDate() + parseInt(value));
      break;
    case "week":
    case "weeks":
      expirationDate.setDate(currentDate.getDate() + parseInt(value) * 7);
      break;
    case "month":
    case "months":
      expirationDate.setMonth(currentDate.getMonth() + parseInt(value));
      break;
    case "year":
    case "years":
      expirationDate.setFullYear(currentDate.getFullYear() + parseInt(value));
      break;
    default:
      throw new Error("Invalid unit of validity");
  }

  return expirationDate;
}

}
