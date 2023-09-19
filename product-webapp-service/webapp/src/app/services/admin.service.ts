import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../models/admin.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:8014/api/v1/user-service/admin';

  constructor(private http: HttpClient) { }

  getAdminInfo(): Observable<Admin> {
    return this.http.get<Admin>(this.apiUrl);
  }

  updateAdminInfo(AdminInfo: Admin): Observable<Admin> {
    return this.http.put<Admin>(this.apiUrl, AdminInfo);
  }

  updateAdminProfilePic(adminMail, formData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${adminMail}`, formData);
  }

}
