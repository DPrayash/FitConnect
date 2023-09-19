import { Component } from '@angular/core';
import { GymService } from 'src/app/services/gym.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
  constructor(private gs: GymService) {}

  
}
