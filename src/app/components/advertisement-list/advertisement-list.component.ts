import {Component} from '@angular/core';
import {AdvertisementService} from "../../services/advertisement_service/advertisement.service";
import {Advertisement} from "../../models/Advertisement";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-advertisement-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './advertisement-list.component.html',
  styleUrl: './advertisement-list.component.css'
})
export class AdvertisementListComponent {
  advertisements?: Advertisement[];
  message: string = '';

  constructor(private advertisementService: AdvertisementService, private router: Router, private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.retrieve();
  }

  private retrieve(): void {
    this.advertisementService.getAll().subscribe({
      next: (data) => {
        this.advertisements = data;
      }, error: (e) => {
        console.log(e);
        confirm('Ошибка сервера \nСтатус ошибки ' + e.status)
      }
    });
  }

  gotoAdvertisement(id: any) {
    this.router.navigate([`/api/advertisement/${id}`]);
  }

  deleteAdvertisement(id: any) {
    this.advertisementService.deleteAdvertisement(id).subscribe({
      next: (message) => {
        this.message = message;
        this.retrieve();
      }, error: (e) => {
        e.status == 404 ? this.message = e['error']['message'] : this.message = "Ошибка сервера"
      }
    });
  }
}
