import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AdvertisementService} from "../../services/advertisement_service/advertisement.service";

@Component({
  selector: 'app-create-advertisement',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-advertisement.component.html',
  styleUrl: './create-advertisement.component.css'
})
export class CreateAdvertisementComponent {
  advertisementForm: FormGroup;

  constructor(private fb: FormBuilder, private advertisementService: AdvertisementService) {
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
        }, error: (e) => {
          console.log(e);
        }
      })
    }
  }
}
