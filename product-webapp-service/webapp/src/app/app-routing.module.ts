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
import { ChatsComponent } from './components/chats/chats.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { MembershipComponent } from './components/membership/membership.component';
import { UserRegistrationFormComponent } from './components/user-registration-form/user-registration-form.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'userHome', component: UserHomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'slots', component: SlotsComponent },
  { path: 'plans', component: PlansComponent },
  { path: 'equipments', component: EquipmentsComponent },
  { path: 'trainers', component: TrainersComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'chats', component: ChatsComponent },
  { path: 'userLogin', component: UserHomeComponent},
  { path: 'membership', component: MembershipComponent},
  { path: 'registerUser', component:UserRegistrationFormComponent},
  { path: 'updateUser', component:UpdateProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
