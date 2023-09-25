import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrl } from '../baseUrl';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  constructor(private httpClient: HttpClient) {}

    public createTransaction(amount: any, name: string, userId: string) {
      const formData = new FormData();
      formData.append('amount', amount);
      formData.append('name', name);
      formData.append('userId', userId);
      return this.httpClient.post(BaseUrl+"/payment/created", formData);
    }

    public getAllTransactions() {
      return this.httpClient.get(BaseUrl+"/payment/all");
    }

    public getTransactionByUser(userEmail: any) {
      return this.httpClient.get(BaseUrl+"2/payment/transactions/"+userEmail);
    }
}
