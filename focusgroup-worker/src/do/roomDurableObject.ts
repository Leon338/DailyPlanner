import { createJSONResponse } from '@/utils';

interface Packet {
  type: string;
  data: any;
}

interface User {
  name: string;
}

interface Todo {
  text: string;
  checked: boolean;
  worker: string;
}

interface Board {
  name: string;
  todos: Todo[];
}

interface Timer {
  minutes: number;
}

interface LogEntry {
  time: number;
  message: string;
}

export class RoomDurableObject implements DurableObject {
  readonly #sockets: Set<WebSocket>;

  readonly #connected = new Map<WebSocket, string>();

  readonly #boards: Board[];
  readonly #users: User[];
  readonly #logs: LogEntry[];
  readonly #timer: Timer;

  constructor(private readonly state: DurableObjectState) {
    this.#sockets = new Set();

    this.#boards = [];
    this.#users = [];
    this.#logs = [];
    this.#timer = { minutes: -1 };

    this.#users.push({ name: 'Leon' });
    this.#timer = { minutes: 60 };
    this.#boards.push({
      name: 'Leon',
      todos: [
        { text: 'Hallo', checked: false, worker: 'Leon' },
        { text: 'Hallo1', checked: false, worker: '' },
        { text: 'Hallo2', checked: false, worker: '' },
      ],
    });
  }

  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'GET')
      return createJSONResponse({ message: 'Expected GET Request' }, 405);
    if (request.headers.get('upgrade') !== 'websocket')
      return createJSONResponse({ message: 'Expected websocket' }, 426);

    const { 0: client, 1: server } = new WebSocketPair();

    await this.handleSession(server);

    return new Response(null, {
      status: 101,
      webSocket: client,
    });
  }

  async handleSession(socket: WebSocket) {
    await socket.accept();

    socket.addEventListener('message', ({ data }) => {
      this.onMessage(socket, <Packet>JSON.parse(<string>data));
    });

    socket.addEventListener('close', () => this.disconnect(socket));
  }

  connect(socket: WebSocket, username: string) {
    this.#connected.set(socket, username);

    this.broadcast('INFO', { message: username + ' connected' });
  }

  disconnect(socket: WebSocket) {
    let username = this.#connected.get(socket);
    if (username === null) return;

    this.broadcast('INFO', { message: username + ' disconnected' });
  }

  onMessage(socket: WebSocket, packet: Packet) {
    switch (packet.type) {
      case 'PING': {
        this.sendMessage(socket, 'PONG');
        break;
      }
      case 'CONNECT': {
        if (packet.data.username === null) {
          this.sendMessage(socket, 'ERROR', { message: 'Invalid Username' });
        }

        this.connect(socket, packet.data.username);

        this.sendMessage(socket, 'DATA', this.getAllData());
        break;
      }
      case 'SET_TIMER': {
        break;
      }
      case 'ADD_BOARD': {
        this.#boards.push({ name: packet.data.name, todos: [] });
        this.broadcast('DATA', { boards: this.#boards });
        break;
      }
      case 'DELETE_BOARD': {
        let index = this.getIndexByName(packet.data.name);

        if (index === -1) return;

        this.#boards.splice(index, 1);
        this.broadcast('DATA', { boards: this.#boards });
        break;
      }
      case 'CHANGE_BOARD_NAME': {
        let index = this.getIndexByName(packet.data.name);

        if (index === -1) return;

        if (this.#boards[index].name === packet.data.newName) return;

        this.#boards[index].name = packet.data.newName;
        this.broadcast('DATA', { boards: this.#boards });
        break;
      }
      case 'ADD_TODO': {
        const { board, text } = packet.data;
        const boardIndex = this.getIndexByName(board);

        if (!text || text.length < 1 || boardIndex === -1) return;

        this.#boards[boardIndex].todos.push({
          text: text,
          checked: false,
          worker: '',
        });

        this.broadcast('DATA', { boards: this.#boards });
        break;
      }
      case 'DELETE_TODO': {
        const { board, index } = packet.data;
        const boardIndex = this.getIndexByName(board);
        if (!index || boardIndex === -1) return;
        this.#boards[boardIndex].todos.splice(index, 1);
        this.broadcast('DATA', { boards: this.#boards });
        break;
      }
      case 'TOGGLE_TODO': {
        const { board, index } = packet.data;
        const boardIndex = this.getIndexByName(board);

        if (!index || boardIndex === -1) return;

        this.#boards[boardIndex].todos[index].checked =
          !this.#boards[boardIndex].todos[index].checked;
        this.broadcast('DATA', { boards: this.#boards });
        break;
      }
      case 'TOGGLE_WORKER': {
        const { board, index } = packet.data;
        const boardIndex = this.getIndexByName(board);
        const username = this.#connected.get(socket);

        if (boardIndex === -1 || !username) return;

        let worker = this.#boards[boardIndex].todos[index].worker;

        this.#boards[boardIndex].todos[index].worker =
          worker == username ? '' : username;
        this.broadcast('DATA', { boards: this.#boards });
        break;
      }
      case 'RESET': {
      }
    }
  }

  getAllData() {
    return {
      users: this.#users,
      timer: this.#timer,
      boards: this.#boards,
      logs: this.#logs,
    };
  }

  broadcast(type: string, data?: object) {
    this.#connected.forEach((username: string, socket: WebSocket) =>
      this.sendMessage(socket, type, data)
    );
  }

  sendMessage(socket: WebSocket, type: string, data?: object) {
    console.log(type);
    console.log(socket.readyState);
    if (socket.readyState == WebSocket.READY_STATE_OPEN) {
      socket.send(JSON.stringify({ type, data }));
    }
  }

  getIndexByName(name: string) {
    if (name !== undefined && name.length > 0) {
      for (let i = 0; i < this.#boards.length; i++) {
        if (this.#boards[i].name.toLowerCase() === name.toLowerCase()) {
          return i;
        }
      }
    }
    return -1;
  }
}
