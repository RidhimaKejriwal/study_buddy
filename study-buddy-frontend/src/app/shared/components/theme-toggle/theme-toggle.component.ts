import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeService } from '../../../core/services/theme.service';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './theme-toggle.component.html',
})
export class ThemeToggleComponent {
  readonly Moon = Moon;
  readonly Sun = Sun;

  constructor(public themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
