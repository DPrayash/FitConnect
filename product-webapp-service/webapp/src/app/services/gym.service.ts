import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gym } from '../models/gym.model';
import { Slot } from '../models/slot.model';
import { Trainer } from '../models/trainer.model';
import { Plan } from '../models/plan.model';
import { MediaFile } from '../models/mediafile.model';
import { Equipment } from '../models/equipment.model';
import { BaseUrl } from '../baseUrl';


@Injectable({
  providedIn: 'root',
})
export class GymService {
  private apiUrl = BaseUrl+'/api/v1/gym-service';

  constructor(private http: HttpClient) {}

  getGymInfo(): Observable<Gym> {
    return this.http.get<Gym>(`${this.apiUrl}/gym-info`);
  }

  updateGymInfo(gymInfo: Gym): Observable<Gym> {
    return this.http.put<Gym>(`${this.apiUrl}/gym-info`, gymInfo);
  }



  getSlotList(): Observable<Slot[]> {
    return this.http.get<Slot[]>(`${this.apiUrl}/slots`);
  }

  getSlotsByDate(date: string): Observable<Slot[]> {
    return this.http.get<Slot[]>(`${this.apiUrl}/slots/by-date/${date}`);
  }

  getSlotBySlotId(slotId: string): Observable<Slot> {
    return this.http.get<Slot>(`${this.apiUrl}/slot/${slotId}`);
  }

  getSlotsBySlotIds(slotIds: string[]): Observable<Slot[]> {
    return this.http.post<Slot[]>(`${this.apiUrl}/slots/byIdList`, slotIds);
  }

  getMaxLimitOfASlot(slotId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/slots/available/${slotId}`);
  }

  setBookedSlot(slotId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/slots/booked/${slotId}`);
  }

  setCancelSlot(slotId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/slots/cancel/${slotId}`);
  }

  addASlot(slot: Slot): Observable<Slot> {
    return this.http.post<Slot>(`${this.apiUrl}/slots`, slot);
  }

  updateSlot(slotId: string, slot: Slot): Observable<Slot> {
    return this.http.put<Slot>(`${this.apiUrl}/slots/${slotId}`, slot);
  }

  deleteSlot(slotId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/slots/${slotId}`);
  }



  getPlanList(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${this.apiUrl}/plans`);
  }

  addAPlan(plan: Plan): Observable<Plan> {
    return this.http.post<Plan>(`${this.apiUrl}/plans`, plan);
  }

  updatePlan(planId: string, plan: Plan): Observable<Plan> {
    return this.http.put<Plan>(`${this.apiUrl}/plans/${planId}`, plan);
  }

  deletePlan(planId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/plans/${planId}`);
  }



  getEquipmentList(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.apiUrl}/equipments`);
  }

  addAnEquipment(equipment: FormData): Observable<Equipment> {
    return this.http.post<Equipment>(`${this.apiUrl}/equipments`, equipment);
  }

  updateEquipment(equipmentId: string, newEquipment: FormData): Observable<Equipment> {
    return this.http.put<Equipment>(`${this.apiUrl}/equipments/${equipmentId}`, newEquipment);
  }

  deleteEquipment(equipmentId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/equipments/${equipmentId}`);
  }



  getTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(`${this.apiUrl}/trainers`);
  }

  addATrainer(trainer: FormData): Observable<Trainer> {
    return this.http.post<Trainer>(`${this.apiUrl}/trainers`, trainer);
  }

  updateTrainer(trainerId: string, trainer: FormData): Observable<Trainer> {
    return this.http.put<Trainer>(`${this.apiUrl}/trainers/${trainerId}`, trainer);
  }

  deleteTrainer(trainerId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/trainers/${trainerId}`);
  }

  getTrainersBySlotId(slotId: string): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(`${this.apiUrl}/trainers/${slotId}`);
  }


  getMediaList(): Observable<MediaFile[]> {
    return this.http.get<MediaFile[]>(`${this.apiUrl}/medias`);
  }

  addAMedia(media: FormData): Observable<MediaFile> {
    return this.http.post<MediaFile>(`${this.apiUrl}/medias`, media);
  }

  updateMedia(mediaId: string, media: FormData): Observable<MediaFile> {
    return this.http.put<MediaFile>(`${this.apiUrl}/medias/${mediaId}`, media);
  }

  deleteMedia(mediaId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/medias/${mediaId}`);
  }




}
