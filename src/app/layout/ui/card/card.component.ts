import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { RetrieveRoutesData } from 'src/app/core/data/retrieve-routes-id.service';
import { PostModel } from 'src/app/models/post/post.model';
import { AuthService } from 'src/app/services/authentification/authAPI/auth.service';
import { AuthData } from 'src/app/services/authentification/authData/auth.data';
import { PostService } from 'src/app/services/post/post.service';
import { DeletePostComponent } from '../../modal/delete-post/delete-post.component';
import { ViewPostComponent } from '../../modal/view-post/view-post.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {
  // Posts Subscription
  posts: PostModel[] = [];
  postsSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authData: AuthData,
    private postService: PostService,
    private dataParamsUserRoute: RetrieveRoutesData,
  ) { }

  ngOnInit(): void {
    this.postService.getPosts();
    this.getPostsDependingUser();
  }

  getPostsDependingUser(): void {
    this.postsSub = this.postService.posts$.subscribe(
      (posts: PostModel[]) => {
        // If Router Url = CurrentUserId, we show only his posts
        if (this.router.url.match(this.authData.getCurrentUserId())) {
          this.posts = posts.filter(x => x.userId === this.authData.getCurrentUserId());
          // Else if Router Url = TargetUserId we do the same previous thing
        } else {
          this.posts = posts.filter(x => x.userId === this.dataParamsUserRoute.getRoutesId());
        }
      }
    )
  }

  // View Post in Modal
  onViewPost(post: PostModel): void {
    this.dialog.open(ViewPostComponent, {
      panelClass: ['col-8'],
      data: {
        postData: post
      }
    });
  }

  // Open Setting (Delete Post)
  onOpenSetting(_id: string): void {
    this.dialog.open(DeletePostComponent, {
      data: {
        _id: _id
      },
      panelClass: ['col-4']
    })
  }

  // Unsubscribe to Post
  ngOnDestroy(): void {
    if (this.postsSub != null) {
      this.postsSub.unsubscribe();
  }
  }
}

export interface PostsModel {
  postData: PostModel
}

export interface PostId {
  _id: string;
}
