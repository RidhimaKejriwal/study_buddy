import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ThemeService } from './core/services/theme.service';
import { AuthLayoutComponent } from './shared/components/auth-layout/auth-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthLayoutComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private themeService: ThemeService) {}
}
