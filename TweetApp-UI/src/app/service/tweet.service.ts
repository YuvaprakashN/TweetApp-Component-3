
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Tweet } from '../model/Tweet.model';
import { ReplyRequest } from '../model/ReplyRequest.model';
import { TweetPostRequest } from '../model/TweetPostRequest.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})

export class TweetService {




    rootUrl: string = environment.rootUrl;

    constructor(public http: HttpClient, private router: Router) { }

    getAllTweets() {
        return this.http.get<Tweet[]>(this.rootUrl + "all").pipe(
            map((res: Tweet[]) => {
                return res;
            }),
            map((failureData) => {
                return failureData;
            })

        );
    }

    reply(tweetId: number, replyRequest: ReplyRequest) {
        let user = JSON.parse(localStorage.getItem('userData'));
        return this.http.post(this.rootUrl + user.id + "/reply/" + tweetId, replyRequest);
    }

    like(tweetId: number) {
        let user = JSON.parse(localStorage.getItem('userData'));
        return this.http.put(this.rootUrl + user.id + "/like/" + tweetId, "");
    }

    addTweet(tweetPostRequest: TweetPostRequest) {
        let user = JSON.parse(localStorage.getItem('userData'));
        return this.http.post(this.rootUrl + user.id + "/add", tweetPostRequest);
    }

    delete(tweetid: number) {

        let user = JSON.parse(localStorage.getItem('userData'));
        return this.http.delete(this.rootUrl + user.id + "/delete/" + tweetid);
    }

    edit(tweetId: number, tweetPostRequest: TweetPostRequest) {        
        let user = JSON.parse(localStorage.getItem('userData'));
        return this.http.put(this.rootUrl + user.id + "/update/"+ tweetId, tweetPostRequest);
    }
 
} 


