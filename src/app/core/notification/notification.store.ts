import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Notification } from './notification.model';

export interface NotificationState extends EntityState<Notification> {
  newNotification: any;
}

@Injectable()
@StoreConfig({ name: 'notification' })
export class NotificationStore extends EntityStore<NotificationState> {

  constructor() {
    super();
  }

}
