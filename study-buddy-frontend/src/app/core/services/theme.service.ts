import { Injectable } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly storageKey = 'studybuddy-theme';

  constructor() {
    this.initializeTheme();
  }

  initializeTheme() {

    const savedTheme =
      localStorage.getItem(this.storageKey) as Theme;

    const theme = savedTheme || 'dark';

    this.setTheme(theme);
  }

  setTheme(theme: Theme) {

    document.documentElement.setAttribute(
      'data-theme',
      theme
    );

    localStorage.setItem(
      this.storageKey,
      theme
    );
  }

  toggleTheme() {

    const currentTheme =
      document.documentElement.getAttribute(
        'data-theme'
      );

    const newTheme =
      currentTheme === 'dark'
        ? 'light'
        : 'dark';

    this.setTheme(newTheme as Theme);
  }

  getCurrentTheme(): Theme {

    return (
      document.documentElement.getAttribute(
        'data-theme'
      ) as Theme
    ) || 'dark';
  }
}