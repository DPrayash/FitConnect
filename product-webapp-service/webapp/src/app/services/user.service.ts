import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Activity } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8014/api/v1/user-service';

  constructor(private http: HttpClient) { }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getActivityListBySlotId(slotId: string): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiUrl}/slots/slotByNumber/${slotId}`);
  }


}
