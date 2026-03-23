import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  serverMessage = '';
  loadingServers = true;
  serverError = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getServers().subscribe({
      next: (res) => {
        this.serverMessage = res.message;
        this.loadingServers = false;
      },
      error: () => {
        this.serverError = 'Failed to load servers.';
        this.loadingServers = false;
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => {
        // Clear tokens and redirect even if the API call fails
        this.authService.clearTokens();
        this.router.navigate(['/login']);
      }
    });
  }
}
