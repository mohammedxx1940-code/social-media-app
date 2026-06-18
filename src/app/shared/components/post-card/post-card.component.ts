import { Component, EventEmitter, inject, Input, OnChanges, Output, output, SimpleChanges } from '@angular/core';
import { CommentsService } from '../../../features/services/comments.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { IComment, IPost } from '../../../core/model/data';
import { CommentCardComponent } from '../comment-card/comment-card.component';
import { PostsService } from '../../../features/services/posts.service';

@Component({
  selector: 'app-post-card',
  imports: [ReactiveFormsModule, CommentCardComponent, RouterLink],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent{
  commentService = inject(CommentsService);
  postService = inject(PostsService);
  toastrService = inject(ToastrService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  createCommentForm: FormGroup = this.formBuilder.group({
    content: ['', Validators.required],
  });
  @Input({ required: true }) post: IPost | null = null;
  @Input() comments: IComment[] = [];
  getComments() {
    if (!this.post) return;
    this.post?._id;
    this.commentService.getComments(this.post?._id).subscribe({
      next: (r) => {
        console.log(r);
        this.comments = r.data.comments;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  createComment() {
    if (!this.post?._id || this.createCommentForm.invalid) return;
    const data = new FormData();
    data.append('content', this.createCommentForm.value.content);
    this.commentService.createComment(data, this.post?._id).subscribe({
      next: (r) => {
        console.log(r);
        if (this.post) {
          this.post.commentsCount++;
          this.toastrService.success(
            `Created and commentcount is ${this.post.commentsCount}`,
            'Success',
          );
        }
        this.createCommentForm.reset();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  isHidden: boolean = true;
  isHidden1: boolean = true;
  isHidden2: boolean = true;
  style1 = 'text-green-500 hover:text-green-700';
  style2 = 'text-red-500 hover:text-red-700';
  @Output() deleted = new EventEmitter<string>();
  deletePost(){
    if(!this.post?._id){
      return;
    }
    this.postService.deletePost(this.post._id).subscribe({
      next : (r) => {
        this.toastrService.success('Post deleted');
        this.deleted.emit(this.post!._id);
        console.log(r);
      } , 
      error : (e) => {
        console.log();
      }
    });
  }
  isEditing = false;
  editPostForm: FormGroup = this.formBuilder.group({
    body: ['', Validators.required]
  });
  startEdit(){
    this.isEditing = true;
    this.editPostForm.patchValue({
      body : this.post?.body
    });
  }
  updatePost(){
    if(!this.post?._id || this.editPostForm.invalid) return;
    const body = this.editPostForm.value.body;
    this.postService.updatePost(this.post._id , body).subscribe({
      next : (r) => {
        if(this.post){
          this.post.body = body;
        }
        this.isEditing = false;
        this.toastrService.success('Post updated successfully');
      } , 
      error: (e) => {
         console.log(e);
      }
    });
  }
}