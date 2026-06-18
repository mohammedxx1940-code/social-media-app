import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { IPost } from '../../core/model/data';
import { PostCardComponent } from "../../shared/components/post-card/post-card.component";

@Component({
  selector: 'app-post-detail',
  imports: [PostCardComponent],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css',
})
export class PostDetailComponent {
  activateRouterService = inject(ActivatedRoute);
  postService = inject(PostsService);
  postId : string | null = null;
  post : IPost | null = null;
  ngOnInit() : void{
    this.postId = this.activateRouterService.snapshot.params['postId'];
    if(this.postId){
      this.getPostDetail(this.postId);
    }
  }
  getPostDetail(postId : string){
    this.postService.getPostDetails(postId).subscribe({
      next : (r) => {
        console.log(r.data.post);
        this.post = r.data.post;
      } ,
      error : (e) => {
        console.log(e);
      }
    })
  }
}
