import { Component } from '@angular/core';
import {DiscussionService} from "../../services/discussion_service/discussion.service";
import {Discussion} from "../../models/Discussion";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../services/token_storage_service/token-storage.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-discussion-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './discussion-list.component.html',
  styleUrl: './discussion-list.component.css'
})
export class DiscussionListComponent {
  discussions: Discussion[] = [];
  role: string | null;
  constructor(private discussionService: DiscussionService, private route: ActivatedRoute, private router: Router,
              private tokenStorage: TokenStorageService) {
    this.role = tokenStorage.getUserRole()
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

  deleteDiscussion(id: any) {
    this.discussionService.deleteDiscussion(id).subscribe({
      next: () => {
        alert("Удаление успешно")
        this.retrieve();
      }, error: () => {
        alert("Не удалось удалить запись")
      }
    });
  }

  gotoDiscussion(id: any) {
    this.router.navigate([`/api/discussion/${id}`]);
  }
}
