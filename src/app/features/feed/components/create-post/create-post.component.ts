import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostsService } from '../../../services/posts.service';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule , PickerComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  showEmoji : boolean = false;
  fb = inject(FormBuilder);
  postS = inject(PostsService);
  createPostForm :FormGroup;
  selectedImage : File | null = null;
  imgSrc : string = '';
  constructor(){
    this.createPostForm = this.fb.group({
      privacy : ['Choose a privacy' , [Validators.required]] ,
      body : ['' , Validators.required]
    })
  }
  createPost(form : HTMLFormElement){
    console.log(this.createPostForm.value);
    console.log(this.selectedImage);
    const formData = new FormData();
    formData.append('body' , this.createPostForm.value.body);
    formData.append('privacy' , this.createPostForm.value.privacy);
    if(!this.selectedImage || this.createPostForm.invalid) return;
    formData.append('image' , this.selectedImage);
    this.postS.createPost(formData).subscribe({
      next : (r) => {
        console.log(r);
        this.createPostForm.patchValue({
          body : '' ,
          privacy : 'Choose a privacy' 
        });
        this.selectedImage = null;
        this.imgSrc = '';
        form.reset();
        
      } ,
      error : (e) => {
        console.log(e);
      }
    })
  }
  handleImageChange(event : any){
    this.selectedImage = (event.target?.files?.[0]);
    this.imgSrc = URL.createObjectURL(event.target?.files?.[0]);
  }
  removeImg(){
    this.imgSrc = '';
    this.selectedImage = null;
  }
  handleEmojiSelect(event : any){
    this.createPostForm.get('body')?.setValue(this.createPostForm.get('body')?.value + event.emoji.native)
  } 
}