import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Payment } from 'src/app/models/payment.model';
import { PaymentServiceService } from 'src/app/services/payment-service.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css']
})
export class UserPaymentComponent {

  constructor(
    private ps: PaymentServiceService,
    private uas: UserAuthService,
    private router: Router
  ) { }

  paymentList: Payment[] = [];
  isLoggedIn: boolean;
  userId: string;


  selectedPayment: Payment | null = null;

  ngOnInit() {

    this.isLoggedIn = this.uas.isLoggedIn() !== null && this.uas.isLoggedIn() !== '';
    if (this.isLoggedIn) {
      this.userId = this.uas.getUID();
      if (this.userId) {
        this.getPaymentDetails(this.userId);
      }
    } else {
      this.router.navigate(['/login']);
    }



  }

  getPaymentDetails(userId: string) {
    this.ps.getTransactionByUser(userId).subscribe((data: Payment[]) => {
      this.paymentList = data;
      console.log(data); 
      if (data != null && this.paymentList.length > 0) {
        this.selectedPayment = this.paymentList[0];
      }
    })
  }

  selectPayment(payment: Payment) {
    this.selectedPayment = payment;
  }
}
