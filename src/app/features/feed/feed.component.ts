import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { IPost } from '../../core/model/data';
import { CreatePostComponent } from "./components/create-post/create-post.component";
import { PostCardComponent } from "../../shared/components/post-card/post-card.component";

@Component({
  selector: 'app-feed',
  imports: [CreatePostComponent, PostCardComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent implements OnInit{
  postService = inject(PostsService);
  posts : IPost[] = [];
  ngOnInit(): void {
    this.getPosts();
  }
  getPosts(){
    this.postService.getPosts().subscribe({
      next : (r) => {
        if(r.success){
          console.log(r.data.posts); 
          this.posts = r.data.posts;
        }
      } ,
      error : (err) => {
        console.log(err);
      },
    })
  }
  removePost(id : string){
    this.posts = this.posts.filter(post => post._id !== id);
  }
}