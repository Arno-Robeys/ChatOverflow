
export class Message {
    readonly chatid: number;
    readonly userid: number;
    readonly messageid: number;
    readonly message: string;
    readonly time: Date;
    readonly read: boolean;

    constructor(chatMessage: {
        userid: number;
        message: string;
        messageid: number;
        time: Date;
        read: boolean;
        chatid: number;
    }) {
        this.chatid = chatMessage.chatid;
        this.userid = chatMessage.userid;
        this.message = chatMessage.message;
        this.time = chatMessage.time;
        this.read = chatMessage.read;
        this.messageid = chatMessage.messageid;
    }
    


}