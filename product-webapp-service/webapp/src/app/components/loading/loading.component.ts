import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  @Input() skeletonLoading: boolean = false;
  @Input() bars: number = 3;
  barsArr: number[] = Array.from({ length: this.bars }, (_, i) => i);
}
