import { Component } from '@angular/core';
import { Payment } from 'src/app/models/payment.model';
import { PaymentServiceService } from 'src/app/services/payment-service.service';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css']
})
export class UserPaymentComponent {

  constructor(private ps: PaymentServiceService) {}

  paymentList: Payment[] = [];

  selectedPayment: Payment | null = null;

  ngOnInit() {
    if (this.paymentList.length > 0) {
      this.selectedPayment = this.paymentList[0];
    }
    this.ps.getTransactionByUser('abc@gmail.com')
    .subscribe((response: any)=>{
      this.paymentList = response;
      console.log("Payment received");
      this.selectedPayment = this.paymentList[0];
    });
  }

  selectPayment(payment: Payment) {
    this.selectedPayment = payment;
  }
}
