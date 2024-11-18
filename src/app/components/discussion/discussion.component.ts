import {Component} from '@angular/core';
import {DiscussionService} from "../../services/discussion_service/discussion.service";
import {CommentService} from "../../services/comment_service/comment.service";
import {Discussion} from "../../models/Discussion";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-discussion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.css'
})
export class DiscussionComponent {
  discussion: Discussion = {};
  discussionId?: string;
  comments: any;
  commentForm: FormGroup;

  constructor(private discussionService: DiscussionService, private fb: FormBuilder, private commentService: CommentService, private router: Router, private route: ActivatedRoute) {
    this.discussionId = this.route.snapshot.params["discussion_id"]
    this.commentForm = this.fb.group({
      text: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.retrieve(this.discussionId);
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

  sendComment(id: any) {
    this.commentForm.value['discussion_id'] = id
    this.commentService.postComment(this.commentForm.value).subscribe({
      next: (message) => {
        this.retrieve(this.discussionId);
        this.commentForm.reset()
        console.log(message)
      }, error: (e) => {
        console.log(e);
        confirm('Ошибка сервера \nСтатус ошибки ' + e.status)
      }
    });
  }
}
