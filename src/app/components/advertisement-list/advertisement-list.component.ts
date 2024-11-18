import {Component} from '@angular/core';
import {AdvertisementService} from "../../services/advertisement_service/advertisement.service";
import {Advertisement} from "../../models/Advertisement";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../services/token_storage_service/token-storage.service";

@Component({
  selector: 'app-advertisement-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './advertisement-list.component.html',
  styleUrl: './advertisement-list.component.css'
})
export class AdvertisementListComponent {
  advertisements?: Advertisement[];
  role: string | null;

  constructor(private advertisementService: AdvertisementService, private router: Router, private tokenStorage: TokenStorageService) {
    this.role = this.tokenStorage.getUserRole()
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
        alert(message['message'])
        this.retrieve();
      }, error: () => {
        alert("Не удалось удалить запись")
      }
    });
  }

  gotoCreateAdvertisement() {
    this.router.navigate([`/api/create_advertisement`]);
  }
}
