import {Component} from '@angular/core';
import {DiscussionService} from "../../services/discussion_service/discussion.service";
import {CommentService} from "../../services/comment_service/comment.service";
import {Discussion} from "../../models/Discussion";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.css'
})
export class DiscussionComponent {
  discussion: Discussion = {};
  comments: any;

  constructor(private discussionService: DiscussionService, private commentService: CommentService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.retrieve(this.route.snapshot.params["discussion_id"]);
  }

  private retrieve(id: any): void {
    this.discussionService.getDiscussion(id).subscribe({
      next: (data) => {
        this.discussion = data;
        this.comments = data.comments;
      }, error: (e) => {
        console.log(e);
        confirm('Ошибка сервера \nСтатус ошибки ' + e.status)
      }
    });
  }
  goBack() {
    // todo
    // this.router.navigate(['/api/discussion/']);
  }
}
