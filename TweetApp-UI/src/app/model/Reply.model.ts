import { User } from "./User.model";

export class Reply{

    constructor(public id:number, public replyMessage:string, public user:User, public repliedDate:Date)
    {

    }
}