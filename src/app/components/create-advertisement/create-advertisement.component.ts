import { Component } from '@angular/core';
import {Advertisement} from "../../models/Advertisement";

@Component({
  selector: 'app-create-advertisement',
  standalone: true,
  imports: [],
  templateUrl: './create-advertisement.component.html',
  styleUrl: './create-advertisement.component.css'
})
export class CreateAdvertisementComponent {
  advertisement: Advertisement = {};
}
