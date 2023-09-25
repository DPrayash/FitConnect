import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Feedback } from "../models/feedback.model";
import { BaseUrl } from "../baseUrl";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = BaseUrl+'/feedback';

  constructor(private http: HttpClient) {}

  submitFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.apiUrl}/addFeedback`, feedback);
  }

  getAllFeedback(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/getAll`);
  }
}