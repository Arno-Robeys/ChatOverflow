import { User } from "./user";

export class Chat {
    readonly chatid: number;
    readonly users: User[];

    constructor(chatUsers: {
        users: User[];
        chatid: number;
    }) {
        this.chatid = chatUsers.chatid;
        this.users = chatUsers.users;
    }
    



}