import {Component} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-create-discussion',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-discussion.component.html',
  styleUrl: './create-discussion.component.css'
})
export class CreateDiscussionComponent {

}
