import { INotification } from './../../core/model/data';
import { Component, inject, OnInit, signal } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit{
  service = inject(NotificationService);
  notifications = signal<INotification[]>([]);
  getNotifications(){
    this.service.getNotifications().subscribe({
      next : (r) => {
        this.notifications.set(r.data.notifications)
      } ,
    error: (e) => {
      console.log(e);
    }
    });
  }
  ngOnInit(): void {
    this.getNotifications();
  }
}