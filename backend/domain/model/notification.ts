import { Chat } from "./chat";
import { User } from "./user";
import { Message } from "./message";

export class Notification {
    readonly notificationid: number;
    readonly userid: number;
    readonly chatid: number;
    readonly message: Message;
    readonly time: Date;
    readonly read: boolean;

    constructor(notification: {
        userid: number;
        chatid: number;
        message: Message;
        time: Date;
        notificationid: number;
        read: boolean;
    }) {
        this.notificationid = notification.notificationid;
        this.userid = notification.userid;
        this.chatid = notification.chatid;
        this.message = notification.message;
        this.time = notification.time;
        this.read = notification.read;
    }
    



}
