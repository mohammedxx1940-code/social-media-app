import { Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { IComment, IPost } from '../../../core/model/data';
import { CommentsService } from '../../../features/services/comments.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-comment-card',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css',
})
export class CommentCardComponent {
  @Input() comment : IComment | null = null;
  isHidden1 : boolean = true; 
  commentService = inject(CommentsService);
  toastrService = inject(ToastrService);
  formBuilder = inject(FormBuilder);
  updateCommentForm : FormGroup = this.formBuilder.group({
    content : ['' , Validators.required]
  })
  @ViewChild('upd') upd !: ElementRef;
  getHide(hide : HTMLElement){
    hide.classList.add('hidden');
  }
  getShow(show : HTMLElement , hide : HTMLElement){
    show.classList.remove('hidden');
    hide.classList.add('hidden');
    if(this.comment){
      this.updateCommentForm.patchValue({
        content : this.comment.content
      });
    }
  }
  updateComment(commentId : string){
    if(!commentId || !this.comment?.post || this.updateCommentForm.invalid) return;
    const data = {
      content : this.updateCommentForm.value.content ,
    };
    this.commentService.updateComment(data, this.comment.post , commentId).subscribe({
      next : (r) => {
        console.log(r);
        if(this.comment){
          this.comment.content = data.content;
        }
        this.toastrService.success(`Comment updated successfully` , 'Success');
        this.getHide(this.upd.nativeElement);
      } ,
      error : (e) => {
        console.log(e);
        this.toastrService.error(`You are not allowed to edit someone else's comment` , 'Error');
      }
    })
  }
  deleteComment(commentId : string){
    if(!commentId || !this.comment?.post) return;
    this.commentService.deleteComment(this.comment.post, commentId).subscribe({
      next : (r) => {
        console.log(r);
        this.toastrService.success('Comment deleted successfully' , "Succes");
        if(this.comment){
          this.comment.content = '';
        }
      } ,
      error : (e) => {
        console.log(e);
        this.toastrService.error('Failed to delete comment');
      }
    })
  }
}