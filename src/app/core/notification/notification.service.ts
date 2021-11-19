import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationStore } from './notification.store';

@Injectable()
export class NotificationService {

  constructor(private notificationStore: NotificationStore, private http: HttpClient) {
  }

  receiveNewNotification(message: any) {
    this.notificationStore.update({ newNotification: message });
  }
}
