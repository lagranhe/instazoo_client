import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalVariable} from '../global';

const COMMENT_API = `${GlobalVariable.ROOT_URL}api/comment/`;

@Injectable({
  providedIn: 'root'
})
export class CommentApi {

  constructor(private http: HttpClient) {
  }

  addToCommentToPost(postId: number, message: string): Observable<any> {
    return this.http.post(COMMENT_API + postId + '/create', {
      message: message
    });
  }

  getCommentsToPost(postId: number): Observable<any> {
    return this.http.get(COMMENT_API + postId + '/all');
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.post(COMMENT_API + commentId + '/delete', null);
  }

}
