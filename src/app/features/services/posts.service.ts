import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {IProfileResponse, IResponse } from '../../core/model/data';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly http = inject(HttpClient);
  createPost(data : FormData) : Observable<any>{
    return this.http.post(`${environment.baseUrl}/posts` , data);
  }
  getPosts() : Observable<IResponse>{
    return this.http.get<IResponse>(`${environment.baseUrl}/posts`);
  }
  getPostsMyProfile(userId : string) : Observable<any>{
    return this.http.get(`${environment.baseUrl}/posts?user=${userId}`);
  }
  getUserPosts(userId: string): Observable<IResponse> {
   return this.http.get<IResponse>(
    `${environment.baseUrl}/posts?${userId}`
   );
  }
  getPostDetails(postId : string) : Observable<any>{
    return this.http.get(`${environment.baseUrl}/posts/${postId}`);
  }
  /*updatePost(postId : string , body : string , image : string){
    return this.http.put(`${environment.baseUrl}/posts/${postId}` , {body , image});
  }*/
  updatePost(postId : string , body : string){
    return this.http.put(`${environment.baseUrl}/posts/${postId}` , {body});
  }
  deletePost(postId : string){
    return this.http.delete(`${environment.baseUrl}/posts/${postId}`);
  }
  getLoggedUserProfile(): Observable<IProfileResponse>{
    return this.http.get<IProfileResponse>( 
     `${environment.baseUrl}/users/profile-data`
    );
  }
  getUserPage(): Observable<IProfileResponse>{
    return this.http.get<IProfileResponse>( 
     `${environment.baseUrl}/users/profile-data`
    );
  }
} 