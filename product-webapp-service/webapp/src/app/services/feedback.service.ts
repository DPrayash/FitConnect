import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Feedback } from "../models/feedback.model";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:8006/feedback';

  constructor(private http: HttpClient) {}

  submitFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.apiUrl}/addFeedback`, feedback);
  }

  getAllFeedback(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/getAll`);
  }

  getFeedbackById(id: string): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.apiUrl}/byId/${id}`);
  }

  deleteFeedback(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  updateFeedback(id: string, updatedFeedback: Feedback): Observable<Feedback> {
    return this.http.put<Feedback>(`${this.apiUrl}/update/${id}`, updatedFeedback);
  }
}