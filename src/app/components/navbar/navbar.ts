import { Component, inject } from '@angular/core';
import { Theme } from '../../services/theme';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  protected readonly theme = inject(Theme);

  protected toggleTheme() {
    this.theme.toggleTheme();
  }
}
