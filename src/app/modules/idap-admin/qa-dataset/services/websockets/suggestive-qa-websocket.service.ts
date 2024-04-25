import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService_SuggestiveQa {
  websocket?: WebSocket;
  public messages: Subject<any> = new Subject();

  constructor() { }

  public openWebsocket() {
    this.websocket = new WebSocket('ws://127.0.0.1:8082/ws/data-seggregator/loading/status/');

    this.websocket.onopen = (event) => {
      console.log(`Generate suggestive Q/A's websocket connected!`);
    }

    this.websocket.onmessage = (event) => {
      // console.log(`onmessage: `, event);
      this.messages.next(event.data);
    }

    this.websocket.onclose = (event) => {
      console.log(`Generate suggestive Q/A's websocket closed!`);
    }
  }

  public closeWebsocket() {
    this.websocket?.close();
  }
}
