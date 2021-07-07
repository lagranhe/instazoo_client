import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {TokenStorageService} from '../../service/token-storage.service';
import {PostApi} from '../../api-client/post.api';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NotificationService} from '../../service/notification.service';
import {ImageUploadApi} from '../../api-client/image-upload.api';
import {UserApi} from '../../api-client/user.api';
import {EditUserComponent} from '../edit-user/edit-user.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isUserDataLoaded = false;
  user: User;
  selectedFile: File;
  userProfileImage: File;
  previewImgURL: any;

  constructor(private tokenService: TokenStorageService,
              private postService: PostApi,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private imageService: ImageUploadApi,
              private userService: UserApi) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        this.isUserDataLoaded = true;
      });

    this.imageService.getProfileImage()
      .subscribe(data => {
        this.userProfileImage = data.imageBytes;
      });
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.previewImgURL = reader.result;
    };
  }

  openEditDialog(): void {
    const dialogUserEditConfig = new MatDialogConfig();
    dialogUserEditConfig.width = '400px';
    dialogUserEditConfig.data = {
      user: this.user
    };
    this.dialog.open(EditUserComponent, dialogUserEditConfig);
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  onUpload(): void {
    if (this.selectedFile != null) {
      this.imageService.uploadImageToUser(this.selectedFile)
        .subscribe(() => {
          this.notificationService.showSnackBar('Profile Image updated successfully');
        });
    }
  }
}
