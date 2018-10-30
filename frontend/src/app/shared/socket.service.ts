import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable()
export class SocketService {
  private socket;
//   socketUrl;

  sendMessage(message){
      console.log("Message sending...");
      this.socket.emit('', message);
      console.log("Message sent!");
  }

  getMessages() {
    let {SOCKET_URL} = environment.config;
      let observable = new Observable(observer => {
          this.socket = io(SOCKET_URL);
          this.socket.on(localStorage.getItem('userID'), (data) => {
              console.log("Notification recieved", data);
              observer.next(data);
          });
          return () => {
              this.socket.disconnect();
        };
      })
      return observable;
  }
}
