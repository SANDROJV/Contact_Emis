import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  private darkMode: boolean = false;

  constructor() {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('darkMode');
    this.darkMode = savedTheme === 'true';
    this.applyTheme();
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', String(this.darkMode));
    this.applyTheme();
  }

  isDarkMode(): boolean {
    return this.darkMode;
  }
  private applyTheme(): void {
    const root = document.documentElement;

    if (this.darkMode) {
      root.style.setProperty('--main-color', '#7137af');
      root.style.setProperty('--black', '#e9e9e9');
      root.style.setProperty('--white', '#121212');
      root.style.setProperty('--gray', '#888');
      root.style.setProperty('--bg', '#0f0f0fff');
      root.style.setProperty('--light-bg', '#181818');
      root.style.setProperty('--box-shadow', '#000');
      root.style.setProperty('--box-shadow-Del', '#131313');
    } else {
      root.style.setProperty('--main-color', '#3A73B8');
      root.style.setProperty('--black', '#161616');
      root.style.setProperty('--white', '#f2f2f2');
      root.style.setProperty('--gray', '#777');
      root.style.setProperty('--bg', '#a0a0a0');
      root.style.setProperty('--light-bg', '#e7e7e7');
      root.style.setProperty('--box-shadow', '#c5c5c5');
      root.style.setProperty('--box-shadow-Del', '#fff');
    }
  }
}
