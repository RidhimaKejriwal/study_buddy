import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { SocketService } from '../../../core/services/socket.service';

@Component({
  selector: 'app-chat-room',
  standalone: true,

  imports: [CommonModule, FormsModule],

  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss',
})
export class ChatRoomComponent implements OnInit {
  message = '';

  messages: any[] = [];

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.receiveMessage((data: any) => {
      this.messages.push(data);
    });
  }

  sendMessage() {
    if (!this.message.trim()) return;

    const data = {
      user: 'Ridhima',
      message: this.message,
    };

    this.socketService.sendMessage(data);

    this.message = '';
  }
}
