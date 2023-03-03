import { Chat } from "./chat";
import { User } from "./user";
import { Message } from "./message";

export class Notification {
    readonly notificationid: number;
    readonly userid: User;
    readonly chatid: Chat;
    readonly message: Message;
    readonly time:  Message;

    constructor(userid: User, chatid: Chat, messsage: Message, time: Message, notificationid: number) {
        this.notificationid = notificationid;
        this.userid = userid;
        this.chatid = chatid;
        this.message = messsage;
        this.time = time;
    }



}
