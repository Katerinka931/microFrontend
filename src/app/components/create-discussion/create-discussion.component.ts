import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
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

  constructor(private router: Router, private fb: FormBuilder, private discussionService: DiscussionService, private route: ActivatedRoute) {
    this.discussionForm = this.fb.group({
      name: ['', Validators.required],
      text: ['', Validators.required]
    })
  }

  saveDiscussion() {
    if (this.discussionForm.valid) {
      let advertisement = this.route.snapshot.params["advertisement_id"]
      this.discussionForm.value['advertisement'] = advertisement
      this.discussionService.postDiscussion(this.discussionForm.value).subscribe({
        next: (message) => {
          console.log(message)
          alert("Обсуждение создано")
          this.router.navigate([`/api/advertisement/${advertisement}`])
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
