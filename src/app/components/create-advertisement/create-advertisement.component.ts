import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AdvertisementService} from "../../services/advertisement_service/advertisement.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-advertisement',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-advertisement.component.html',
  styleUrl: './create-advertisement.component.css'
})
export class CreateAdvertisementComponent {
  advertisementForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private advertisementService: AdvertisementService) {
    this.advertisementForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      phone: ['', Validators.required],
    })
  }

  saveAdvertisement() {
    if (this.advertisementForm.valid) {
      this.advertisementService.postAdvertisement(this.advertisementForm.value).subscribe({
        next: (message) => {
          console.log(message)
          alert("Объявление создано")
        }, error: (e) => {
          console.log(e)
          alert("Не удалось создать объявление")
        }
      })
    } else {
      alert("Проверьте правильность ввода!")
    }
  }

  goBack() {
    this.router.navigate(['/api/advertisement']);
  }
}
