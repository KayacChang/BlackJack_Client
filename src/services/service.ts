import EventEmitter from 'eventemitter3';
import login from './login';
import { Token } from '../models';
import { SERVER, GAME, CLIENT } from '../constants';
import { LobbyMUX, RoomMUX } from './mux';

interface Frame {
  cmd: CLIENT | SERVER | GAME;
  data: any;
}

interface MUX {
  [name: number]: (service: Service, data: any) => any;
}

export default class Service extends EventEmitter {
  //
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
    //
    if (!this.token) {
      throw new Error(`service required token, please call connect first`);
    }

    console.log('Send: ', data);

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
    //
    if (!this.token) {
      throw new Error(`service required token, please call connect first`);
    }

    const message = JSON.parse(atob(event.data)) as Frame;

    if (message.data.game_token) {
      this.token.gameToken = message.data.game_token;
    }

    const handler = ({
      ...LobbyMUX,
      ...RoomMUX,
    } as MUX)[message.cmd];

    if (handler) handler(this, message.data);
  }
}
