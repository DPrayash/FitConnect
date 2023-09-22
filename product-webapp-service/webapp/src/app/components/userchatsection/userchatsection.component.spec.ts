import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserchatsectionComponent } from './userchatsection.component';

describe('UserchatsectionComponent', () => {
  let component: UserchatsectionComponent;
  let fixture: ComponentFixture<UserchatsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserchatsectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserchatsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
