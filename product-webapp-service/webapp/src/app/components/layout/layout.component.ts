import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  @Input() isLoggedIn:boolean;
  @Input() userId:string;
  @Input() userRole:string;
}
