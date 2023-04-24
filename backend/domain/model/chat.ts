import { Message } from "./message";
import { User } from "./user";


export class Chat {
    readonly chatid: number;
    readonly users: User[];
    readonly lastMessage?: Message;

    constructor(chatUsers: {
        chatid: number;
        users?: User[];
        lastMessage?: Message;
    }) {
        this.chatid = chatUsers.chatid;
        this.users = chatUsers.users;
        this.lastMessage = chatUsers.lastMessage;
    }
    



}