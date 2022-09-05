import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ReplyRequest } from 'src/app/model/ReplyRequest.model';
import { Tweet } from 'src/app/model/Tweet.model';
import { TweetPostRequest } from 'src/app/model/TweetPostRequest.model';
import { TweetService } from 'src/app/service/tweet.service';
import { UserService } from 'src/app/service/user.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {

  tweetsList: Tweet[];
  constructor(
    private tweetService: TweetService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public userService: UserService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
  }

  user: any;
  editClicked: any[] = [];
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));

    this.activatedRoute.params.subscribe(params => {
      let id = params['tweetid'];
      this.editClicked[id] = true;
    });

    this.activatedRoute.params.subscribe(params => {
      let id = params['userid'];

      if (id > 0) {
        this.userService.getUserTweets(id).subscribe((response) => {
          console.log(response);
          this.tweetsList = response as Tweet[];
          console.log(this.tweetsList);
        })
      }
      else {
        try {
          let user = JSON.parse(localStorage.getItem('userData'));
          if (user.id == null) {
            this.router.navigate(['/login']);
          }
        } catch {
          this.router.navigate(['/login']);
        }

        let tweetObs: Observable<Tweet[]>;
        tweetObs = this.tweetService.getAllTweets();

        tweetObs.subscribe(
          (res) => {
            this.tweetsList = res as Tweet[];
          },
          (errorMessage) => {
            console.log(errorMessage);
          }
        )
      }
    })

  }
  replyText: any[] = [];
  reply(tweet: Tweet) {
    this.tweetService.reply(tweet.tweetId, new ReplyRequest(this.replyText[tweet.tweetId])).subscribe(res => {
      this.tweetService.getAllTweets().subscribe(
        (res) => {
          this.replyText[tweet.tweetId] = '';
          this.tweetsList = res as Tweet[];
        },
        (errorMessage) => {
          console.log(errorMessage);
        }
      );

    });
  }

  like(tweet: Tweet) {
    this.tweetService.like(tweet.tweetId).subscribe(res => {
      this.tweetService.getAllTweets().subscribe(
        (res) => {
          this.tweetsList = res as Tweet[];
        },
        (errorMessage) => {
          console.log(errorMessage);
        }
      );
    });
  }
  addTweetText: string;
  addTweet() {
    this.tweetService.addTweet(new TweetPostRequest(this.addTweetText)).subscribe(res => {
      this.tweetService.getAllTweets().subscribe(
        (res) => {
          this.tweetsList = res as Tweet[];
        },
        (errorMessage) => {
          console.log(errorMessage);
        }
      );
    });
  }

  delete(tweetid: number) {
    this.tweetService.delete(tweetid).subscribe(res => {
      this.tweetService.getAllTweets().subscribe(
        (res) => {
          this.tweetsList = res as Tweet[];
        },
        (errorMessage) => {
          console.log(errorMessage);
        }
      );
    });
  }


  editClick(tweetid: number) {
    this.editClicked[tweetid] = true;
  }


  editText: string[] = [];
  edit(tweet: Tweet) {
    this.tweetService.edit(tweet.tweetId, new TweetPostRequest(this.editText[tweet.tweetId])).subscribe(res => {
      this.tweetService.getAllTweets().subscribe(
        (res) => {
          this.replyText[tweet.tweetId] = '';
          this.tweetsList = res as Tweet[];
          this.editClicked[tweet.tweetId] = false;
        },
        (errorMessage) => {
          console.log(errorMessage);
        }
      );

    });
  }

}
