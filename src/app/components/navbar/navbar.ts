import { Component } from '@angular/core';
import { Theme } from '../../services/theme';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(private theme: Theme) {}

  toggleTheme() {
    this.theme.toggleTheme();
  }
}
