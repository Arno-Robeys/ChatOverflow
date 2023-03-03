import { User } from "./user";

export class Message {
    readonly chatid: number;
    readonly userid: User;
    readonly message: string;
    readonly time: string;
    readonly read: boolean;

    constructor(userid: User, message: string, time: string, read: boolean, chatid: number) {
        this.chatid = chatid;
        this.userid = userid;
        this.message = message;
        this.time = time;
        this.read = read;
    }


}