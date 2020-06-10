import EventEmitter from 'eventemitter3';
import { EVENT, Frame } from './type';
import login from './login';
import RoomService from './rooms';
import { Token, SERVER } from '../models';

export default class Service extends EventEmitter {
  socket: WebSocket;

  token?: Token;

  constructor(host: string) {
    super();

    this.socket = new WebSocket(host);
  }

  async connect(token: Token) {
    this.token = token;

    await new Promise((resolve) => (this.socket.onopen = resolve));

    this.socket.onmessage = (event) => this.onMessage(event);

    return login(this);
  }

  send(data: Frame) {
    if (!this.token) {
      return;
    }

    const token = this.token;

    const message = btoa(
      JSON.stringify({
        token: token.token,
        game_id: token.gameID,
        game_token: token.gameToken,
        ...data,
      })
    );

    this.socket.send(message);
  }

  onMessage(event: MessageEvent) {
    const message = JSON.parse(atob(event.data)) as Frame;

    switch (message.cmd) {
      //
      case SERVER.LOGIN:
        if (this.token) {
          this.token.gameToken = message.data.game_token;
        }
        return this.emit(EVENT.LOGIN, message.data);
      //
      case SERVER.INFO:
        console.log(message.data);
        return;
      //
      case SERVER.LOBBY:
        RoomService.replace(...message.data);
        return;
      //
      case SERVER.UPDATE_LOBBY:
        RoomService.update(message.data);
        return;
      //
      case SERVER.JOIN_ROOM:
        return this.emit(EVENT.JOIN_ROOM, message.data);
    }
  }
}
