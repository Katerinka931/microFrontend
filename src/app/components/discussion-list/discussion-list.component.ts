import { Component } from '@angular/core';
import {DiscussionService} from "../../services/discussion_service/discussion.service";
import {Discussion} from "../../models/Discussion";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-discussion-list',
  standalone: true,
  imports: [],
  templateUrl: './discussion-list.component.html',
  styleUrl: './discussion-list.component.css'
})
export class DiscussionListComponent {
  discussions: Discussion[] = [];
  constructor(private discussionService: DiscussionService, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.retrieve();
  }

  private retrieve() {
    let advertisementId = this.route.snapshot.params["advertisement_id"]
    this.discussionService.getAll(advertisementId).subscribe({
      next: (data) => {
        this.discussions = data;
      }, error: (e) => {
        console.log(e);
        confirm('Ошибка сервера \nСтатус ошибки ' + e.status)
      }
    });
  }
}
