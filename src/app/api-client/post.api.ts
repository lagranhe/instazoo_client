import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../models/Post';
import {Observable} from 'rxjs';
import {GlobalVariable} from '../global';

const POST_API = `${GlobalVariable.ROOT_URL}api/post/`;

@Injectable({
  providedIn: 'root'
})
export class PostApi {

  constructor(private http: HttpClient) {
  }

  createPost(post: Post): Observable<any> {
    return this.http.post(`${POST_API}create`, post);
  }

  getAllPosts(): Observable<any> {
    return this.http.get(`${POST_API}all`);
  }

  getPostForCurrentUser(): Observable<any> {
    return this.http.get(`${POST_API}user/posts`);
  }

  deletePost(id: number): Observable<any> {
    return this.http.post(`${POST_API}${id}/delete`, null);
  }

  likePost(id: number, username: string): Observable<any> {
    return this.http.post(`${POST_API}${id}/${username}/like`, null);
  }
}
