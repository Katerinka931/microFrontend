import {Component} from '@angular/core';
import {NavigationStart, Router, RouterOutlet} from '@angular/router';
import {CommonModule} from "@angular/common";
import {TokenStorageService} from "./services/token_storage_service/token-storage.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'microFrontend';

  isAuthenticated: boolean = false;

  constructor(private router: Router, private tokenStorage: TokenStorageService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.isAuthenticated = event['url'] != '/login' && event['url'] != '/';
      }
    });
  }

  logout() {
    this.tokenStorage.signOut()
    this.router.navigate(["/"]);
  }
}
