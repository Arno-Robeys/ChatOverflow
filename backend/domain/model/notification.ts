import { Chat } from "./chat";
import { User } from "./user";
import { Message } from "./message";

export class Notification {
    readonly notificationid: number;
    readonly userid: User;
    readonly chatid: Chat;
    readonly message: Message;
    readonly time:  Message;

    constructor(notification: {
        userid: User;
        chatid: Chat;
        message: Message;
        time: Message;
        notificationid: number;
    }) {
        this.notificationid = notification.notificationid;
        this.userid = notification.userid;
        this.chatid = notification.chatid;
        this.message = notification.message;
        this.time = notification.time;
    }
    



}
