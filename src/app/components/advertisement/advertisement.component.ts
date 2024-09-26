import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-advertisement',
  standalone: true,
  imports: [],
  templateUrl: './advertisement.component.html',
  styleUrl: './advertisement.component.css',
})
export class AdvertisementComponent {
  constructor(private router: Router) {
  }

  go_to_discussion_list() {
    this.router.navigate(['/api/discussions']);
  }

  go_to_create_discussion() {
    this.router.navigate(['/api/create_discussion']);
  }
}
