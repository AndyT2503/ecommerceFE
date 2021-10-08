import { SocketEvent } from './../const/socket-event';
import { AuthenticationQuery } from 'src/app/core/authentication/state/authentication.query';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  constructor(
    private readonly authenticationQuery: AuthenticationQuery
  ) { }

  startConnection(): void {
    const jwtToken = this.authenticationQuery.getValue().accessToken;
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/notification-hub`, {
        accessTokenFactory: () => jwtToken
      })
      .build();
    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.listenNotification();
      })
      .catch(err => console.error('Error while starting connection: ' + err));
  }

  private listenNotification(): void {
    this.hubConnection.on(SocketEvent.newNotification,
      data => {
        console.log(data);
      });
  }

  disconnectConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }
}
