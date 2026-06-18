import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INotificationsResponse } from '../../core/model/data';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly http = inject(HttpClient);
  getNotifications() : Observable<INotificationsResponse>{
    return this.http.get<INotificationsResponse>
    (`${environment.baseUrl}/notifications?unread=false&page=1&limit=10`);
  }
}