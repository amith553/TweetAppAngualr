import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Reply } from "./reply.model";
import { Tweet } from "./tweet.model";

@Injectable({
    providedIn: 'root'
})
export class TweetService{

    constructor(private http: HttpClient){}
    apiurl = 'https://comtweetapp20220923173925.azurewebsites.net/v1.0/tweets/';
    tweetChanged = new Subject<Tweet>();
    allTweets = new Subject<Tweet[]>();

    private tweets: Tweet[];
    
    getAllTweets(){
        let tweets: Tweet[];
        this.http.get<Tweet[]>(this.apiurl + 'all').subscribe((responseData) => {
            tweets = responseData;
            this.allTweets.next(tweets);

        });
    }

    getTweetById(id: string){
        let tweet: Tweet;
        this.http.get<Tweet>(this.apiurl + 'tweet/'+id).subscribe((responseData) => {
            this.tweetChanged.next(responseData);
        });
    }

    addReply(reply: Reply, tweetId: string){
        // this.tweets.find(x => x.id == tweetId)?.replies.push(reply);
        // this.tweetChanged.next(this.tweets.slice().find(x => x.id == tweetId));
        let userId = localStorage.getItem('user');
        this.http.put(this.apiurl + userId + '/reply/'+tweetId, { tweetText : reply.replyText})
        .subscribe((response) => {
            this.getTweetById(tweetId);
        });
    }

    postTweet(userId: string | null, tweetText: string){
       this.http.post(this.apiurl + userId +'/add', {tweetText: tweetText}).subscribe((response) => {
           this.getAllTweets();
       });
    }

    editTweet(tweetText: string, tweetId: string){
        this.http.put(this.apiurl + 'update/'+ tweetId, { tweetText : tweetText})
        .subscribe((response) => {
            this.getAllTweets();
        });
    }

    getTweetByUserId(userId: string){
        let tweets: Tweet[];
        this.http.get<Tweet[]>(this.apiurl +userId).subscribe((responseData) => {
            tweets = responseData;
            this.allTweets.next(tweets);
        });
    }

    deleteTweetFromHome(tweetId: string){
        this.http.delete(this.apiurl + 'delete/' + tweetId).subscribe((response) => {
            this.getAllTweets();
        });
    }

    deleteTweetFromMyTweet(tweetId: string, userId: string){
        this.http.delete(this.apiurl + 'delete/' + tweetId).subscribe((response) => {
            this.getTweetByUserId(userId);
        });
    }

    likeOrDisLikeTweet(tweetId: string, userId: string){
        this.http.put(this.apiurl +userId+'/like/'+tweetId, null).subscribe((response) => {
            this.getTweetByUserId(userId);
        });
    }
}