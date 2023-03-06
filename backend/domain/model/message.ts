import { User } from "./user";

export class Message {
    readonly chatid: number;
    readonly userid: User;
    readonly message: string;
    readonly time: string;
    readonly read: boolean;

    constructor(chatMessage: {
        userid: User;
        message: string;
        time: string;
        read: boolean;
        chatid: number;
    }) {
        this.chatid = chatMessage.chatid;
        this.userid = chatMessage.userid;
        this.message = chatMessage.message;
        this.time = chatMessage.time;
        this.read = chatMessage.read;
    }
    


}