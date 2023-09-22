import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminchatsectionComponent } from './adminchatsection.component';

describe('AdminchatsectionComponent', () => {
  let component: AdminchatsectionComponent;
  let fixture: ComponentFixture<AdminchatsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminchatsectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminchatsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
