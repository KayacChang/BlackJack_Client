import EventEmitter from 'eventemitter3';
import { EVENT } from './type';
import login from './login';
import { Rooms, Rounds } from '../states';
import { Token, User } from '../models';
import { SERVER, GAME } from '../constants';

interface Frame {
  cmd: number;
  data: any;
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

    switch (message.cmd) {
      case SERVER.LOGIN:
        this.token.gameToken = message.data.game_token;

        const user = new User({
          id: message.data.user_id,
          name: message.data.user_name,
        });

        console.log(user);

        return this.emit(EVENT.LOGIN, user);
      case SERVER.INFO:
        console.log(message.data);
        return;
      case SERVER.LOBBY:
        return Rooms.replace(...message.data);
      case SERVER.UPDATE_LOBBY:
        return Rooms.update(message.data);
      case SERVER.JOIN_ROOM:
        return this.emit(EVENT.JOIN_ROOM, Rounds.start(message.data));
      //
      case GAME.BETTING:
        return Rounds.start({
          ...message.data,
          state: [GAME.BETTING],
        });
      case GAME.BET_END:
        console.log(message.data);
        return;
      case GAME.BEGIN:
        console.log(message.data);
        return;
      case GAME.DEAL:
        console.log(message.data);
        return;
      case GAME.TURN:
        const { no, pile } = message.data;

        // console.log(new Turn(no, pile));
        return;
      case GAME.SETTLE:
        console.log(message.data);
        return;
    }
  }
}
