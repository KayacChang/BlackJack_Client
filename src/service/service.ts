import EventEmitter from 'eventemitter3';
import { EVENT, SERVER, Frame } from './type';
import login from './login';

export default class Service extends EventEmitter {
  //
  private socket: WebSocket;

  constructor(host: string) {
    super();

    this.socket = new WebSocket(host);
  }

  async connect() {
    //
    await new Promise((resolve) => {
      this.socket.onopen = (event) => resolve(event);
    });

    this.socket.onmessage = (event) => this.onMessage(event);

    const user = await login(this);

    console.log(user);
  }

  send(data: {}) {
    const message = btoa(JSON.stringify(data));

    this.socket.send(message);
  }

  onMessage(event: MessageEvent) {
    const message = JSON.parse(atob(event.data)) as Frame;

    switch (message.cmd) {
      //
      case SERVER.LOGIN:
        return this.emit(EVENT.LOGIN, message.data);
      //
      case SERVER.INFO:
        console.log(message.data);
        return;
      //
      case SERVER.LOBBY:
        console.log(message.data);
        return;
      //
      case SERVER.UPDATE_LOBBY:
        console.log(message.data);
        return;
    }
  }
}
