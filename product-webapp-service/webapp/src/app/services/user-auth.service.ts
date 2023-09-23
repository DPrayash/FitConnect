import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private MEMBER_ROLE:string = '';
  private MEMBER_ID:string = '';
  private MEMBER_TOKEN:string = '';
  private MEMBER_NAME:string = '';

  constructor() { }

  public setRoles(roles: string) {
    localStorage.setItem('roles',roles);
  }

  public getRoles() {
    return localStorage.getItem('roles');
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
    this.MEMBER_TOKEN = jwtToken;
  }

  public getToken(): string | null{
    return localStorage.getItem('jwtToken');
    // return this.MEMBER_TOKEN
  }

  public setUID(uid: string) {
    localStorage.setItem('uid', uid);
    this.MEMBER_ID = uid;
  }

  public getUID(): string | null{
    return localStorage.getItem('uid');
    // return this.MEMBER_ID;
  }

  public setName(name: string) {
    this.MEMBER_ID = name;
  }

  public getName(): string | null{
    return this.MEMBER_ID;
  }

  public clear() {
    localStorage.clear();
    this.MEMBER_ID = '';
    this.MEMBER_ROLE = '';
    this.MEMBER_TOKEN = '';

  }

  public isLoggedIn() {
    return this.getToken() && this.getUID();
  }
}
