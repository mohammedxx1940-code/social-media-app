import { IPost, IUser} from './../../core/model/data';
import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from "../../shared/components/post-card/post-card.component";
import { CreatePostComponent } from "../feed/components/create-post/create-post.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-profile',
  imports: [CommonModule, PostCardComponent, CreatePostComponent, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit{
  private readonly postsService = inject(PostsService);
  userData!: IUser
  posts : IPost[] = [];
  getAllPosts(){
    this.postsService.getPostsMyProfile(this.userData._id).subscribe({
      next : (res) => {
        console.log(res);
        this.posts = res.data.posts 
      }
    })
  }
  getProfileData() : void{
    this.postsService.getLoggedUserProfile().subscribe({
      next : (res) => {
        console.log(res);
        console.log('PROFILE DATA =>', res);
        this.userData = res.data.user; 
        this.getAllPosts();
      } ,
      error : (err) => {
        console.log(err);
        console.log('PROFILE DATA1 =>', err);
      }
    })
  }
  ngOnInit(): void {
    this.getProfileData();
  }
}