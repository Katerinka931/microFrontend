import { Component } from '@angular/core';
import {DiscussionService} from "../../services/discussion_service/discussion.service";
import {CommentService} from "../../services/comment_service/comment.service";

@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [],
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.css'
})
export class DiscussionComponent {
  constructor(private discussionService: DiscussionService, private commentService: CommentService) {
  }

}
