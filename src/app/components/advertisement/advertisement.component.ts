import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Advertisement} from "../../models/Advertisement";
import {AdvertisementService} from "../../services/advertisement_service/advertisement.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-advertisement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './advertisement.component.html',
  styleUrl: './advertisement.component.css',
})
export class AdvertisementComponent {

  advertisement: Advertisement = {};
  isDiscussionsDisabled = false;

  constructor(private advertisementService: AdvertisementService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.retrieve(this.route.snapshot.params["id"]);
  }

  gotoDiscussionList() {
    this.router.navigate([`/api/discussions/${this.advertisement.id}`]);
  }

  gotoCreateDiscussion() {
    this.router.navigate(['/api/create_discussion']);
  }

  private retrieve(id: any): void {
    this.advertisementService.getAdvertisement(id).subscribe({
      next: (data) => {
        this.advertisement = data;
        this.isDiscussionsDisabled = data.count == 0;
      }, error: (e) => {
        console.log(e);
        confirm('Ошибка сервера \nСтатус ошибки ' + e.status)
      }
    });
  }
}
