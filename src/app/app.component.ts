import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <button class="theme-toggle" (click)="theme.toggle()" [title]="theme.isDark() ? 'Switch to light mode' : 'Switch to dark mode'">
      <span class="theme-icon">{{ theme.isDark() ? '&#9728;' : '&#9790;' }}</span>
    </button>
    <router-outlet />
  `,
  styles: [`
    .theme-toggle {
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 9999;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      border: 1px solid var(--border-color);
      background: var(--bg-card);
      color: var(--text-primary);
      font-size: 1.1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      transition: background 0.25s, border-color 0.25s;
      padding: 0;

      &:hover {
        background: var(--bg-primary);
      }
    }
  `]
})
export class AppComponent {
  readonly theme = inject(ThemeService);
}

