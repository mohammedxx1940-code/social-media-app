import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  http = inject(HttpClient);
  createComment(data : any , postId : string) : Observable<any>{
    return this.http.post(`${environment.baseUrl}/posts/${postId}/comments` , data);
  }
  getComments(postId : string) : Observable<any>{
    return this.http.get(`${environment.baseUrl}/posts/${postId}/comments`);
  }
  updateComment(data : any , postId : string , commentId : string) : Observable<any>{
    return this.http.put(`${environment.baseUrl}/posts/${postId}/comments/${commentId}` , data);
  }
  deleteComment(postId : string , commentId : string) : Observable<any>{
    return this.http.delete(`${environment.baseUrl}/posts/${postId}/comments/${commentId}`);
  }
}