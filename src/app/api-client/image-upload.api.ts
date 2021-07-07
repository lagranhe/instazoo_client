import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalVariable} from '../global';

const IMAGE_API = `${GlobalVariable.ROOT_URL}api/image/`;

@Injectable({
  providedIn: 'root'
})
export class ImageUploadApi {

  constructor(private http: HttpClient) { }

  uploadImageToUser(file: File): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('file', file);

    return this.http.post(`${IMAGE_API}upload`, uploadData);
  }

  uploadImageToPost(file: File, postId: number): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('file', file);

    return this.http.post(`${IMAGE_API}${postId}/upload`, uploadData);
  }

  getProfileImage(): Observable<any> {
    return this.http.get(`${IMAGE_API}profileImage`);
  }

  getImageToPost(postId: number): any {
    return this.http.get(`${IMAGE_API}${postId}/image`);
  }



}
