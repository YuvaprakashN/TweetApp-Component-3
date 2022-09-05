import { Reply } from "./Reply.model";
import { User } from "./User.model";

export interface Tweet{
    tweetId: number;
    tweetText: string;
    tweetDate: Date;
    user: User;
    tweetLike: number;
    tweetReplies: Reply[];
    
}