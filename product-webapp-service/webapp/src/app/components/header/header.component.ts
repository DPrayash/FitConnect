import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent{

  productTitle = ['Fit', 'Connect'];
  @Input() isLoggedIn:boolean;
  @Input() userId:string;
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();

  logout() {
    this.signOut.emit();
  }
}
