import { Injectable } from '@angular/core';

import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: Socket;

  constructor() {

    this.socket = io('http://localhost:5000');
  }

  sendMessage(data: any) {

    this.socket.emit('send_message', data);
  }

  receiveMessage(callback: any) {

    this.socket.on('receive_message', callback);
  }
}