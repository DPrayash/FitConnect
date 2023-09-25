import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { SlotsComponent } from './components/slots/slots.component';
import { PlansComponent } from './components/plans/plans.component';
import { EquipmentsComponent } from './components/equipments/equipments.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { MembershipComponent } from './components/membership/membership.component';
import { UserRegistrationFormComponent } from './components/user-registration-form/user-registration-form.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { AdminchatsectionComponent } from './components/adminchatsection/adminchatsection.component';
import { UserchatsectionComponent } from './components/userchatsection/userchatsection.component';
import { BookComponent } from './components/book/book.component';
import { BookedComponent } from './components/booked/booked.component';
import { LoginComponent } from './components/login/login.component';
import { UserPaymentComponent } from './components/user-payment/user-payment.component';
import { LandingComponent } from './components/landing/landing.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';


const routes: Routes = [
  
  // DEFAULT
  { path: '', component: LandingComponent},
  { path: 'registerUser', component: UserRegistrationFormComponent },
  { path: 'login', component: LoginComponent},


  // ADMIN
  { path: 'admin', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'slots', component: SlotsComponent },
  { path: 'plans', component: PlansComponent },
  { path: 'equipments', component: EquipmentsComponent },
  { path: 'trainers', component: TrainersComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'chats', component: AdminchatsectionComponent },

  // USER
  { path: 'userHome', component: UserHomeComponent },
  { path: 'chat', component: UserchatsectionComponent },
  { path: 'membership', component: MembershipComponent },
  { path: 'updateUser', component: UpdateProfileComponent },
  { path: 'book', component: BookComponent },
  { path: 'bookings', component: BookedComponent },
  { path: 'userPayment', component: UserPaymentComponent},
  { path: 'feedback', component: FeedbackFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
