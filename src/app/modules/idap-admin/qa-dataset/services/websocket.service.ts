import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  websocket?: WebSocket;
  public messages: Subject<any> = new Subject();

  constructor() { }

  public openWebsocket() {
    this.websocket = new WebSocket('ws://ibasdap-api.celloscope.net/ws/');

    this.websocket.onopen = (event) => {
      console.log(`Websocket connect!`);
    }

    this.websocket.onmessage = (event) => {
      //console.log(`onmessage: `, event.data);
      this.messages.next(event.data);
    }

    this.websocket.onclose = (event) => {
      console.log(`Websocket closed!`);
    }
  }

  public closeWebsocket() {
    this.websocket?.close();
  }	
}
