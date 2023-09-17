import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../models/activity.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8014/api/v1/user-service/users';
  constructor(private http:HttpClient) { }
  
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/registerUser`, user);
}
getUserList(): Observable<User[]> {
  return this.http.get<User[]>(`${this.apiUrl}/users`);
}

getActivityListBySlotId(slotId: string): Observable<Activity[]> {
  return this.http.get<Activity[]>(`${this.apiUrl}/slots/slotByNumber/${slotId}`);
}

}