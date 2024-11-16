import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DiscussionService} from "../../services/discussion_service/discussion.service";

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
  discussionForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private discussionService: DiscussionService) {
    this.discussionForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  saveDiscussion() {
    if (this.discussionForm.valid) {
      this.discussionService.postDiscussion(this.discussionForm.value).subscribe({
        next: (message) => {
          console.log(message)
          alert("Обсуждение создано")
        }, error: (e) => {
          console.log(e)
          alert("Не удалось создать обсуждение")
        }
      })
    }
  }

  goBack() {
    this.router.navigate(['/api/discussion']);
  }
}
