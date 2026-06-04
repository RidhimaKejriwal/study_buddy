import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { SocketService } from '../../../core/services/socket.service';
import { AuthService } from '../../../core/services/auth.service';

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
  currentUser: any;

  constructor(
    private socketService: SocketService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe((user) => {
      this.currentUser = user;
    });
    this.socketService.receiveMessage((data: any) => {
      this.messages.push(data);
    });
  }

  sendMessage() {
    if (!this.message.trim()) return;

    const data = {
      user: this.currentUser.name,
      message: this.message,
    };

    this.socketService.sendMessage(data);

    this.message = '';
  }
}
