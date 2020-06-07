import EventEmitter from 'eventemitter3';

enum REQ {
  LOGIN = 8003150,
}

enum RES {
  LOGIN = 8003050,
}

enum EVENT {
  LOGIN = 'login',
}

class Service extends EventEmitter {
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
  }

  send(data: {}) {
    const message = btoa(JSON.stringify(data));

    this.socket.send(message);
  }

  onMessage(event: MessageEvent) {
    const message = JSON.parse(atob(event.data));

    switch (message.cmd) {
      case RES.LOGIN:
        return this.emit(EVENT.LOGIN, message);
    }
  }

  async login() {
    //
    console.group('Login');

    const request = {
      cmd: REQ.LOGIN,
      token: '$2y$10$g27N1Zk/EuqTZQYBkSmWhel0VEOln2ZNmbIvrItEbkyoV77nHhZ6u',
      game_token: '',
      game_id: '209B407F0F9751E3B87751FD8C99EDC9',
    };

    console.log('Request:\n', request);

    this.send(request);

    const response = await new Promise((resolve) => {
      this.once(EVENT.LOGIN, (message) => resolve(message));
    });

    console.log('Response:\n', response);

    console.groupEnd();

    return (response as any).data;
  }
}

export default new Service('wss://blackjack-stg.ulgplay.com:8881/ws');
