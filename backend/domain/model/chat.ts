import { User } from "./user";


export class Chat {
    readonly chatid: number;
    readonly users: User[];

    constructor(chatUsers: {
        chatid: number;
        users?: User[];
    }) {
        this.chatid = chatUsers.chatid;
        this.users = chatUsers.users;
    }
    



}