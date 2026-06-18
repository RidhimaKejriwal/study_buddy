import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

import {
  LucideAngularModule,
  Users,
  MessageCircle,
  Target,
  CheckSquare,
  BookOpen,
  Wifi,
} from 'lucide-angular';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, ThemeToggleComponent, LucideAngularModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {
  readonly Users = Users;
  readonly MessageCircle = MessageCircle;
  readonly Target = Target;
  readonly CheckSquare = CheckSquare;
  readonly BookOpen = BookOpen;
  readonly Wifi = Wifi;
}
