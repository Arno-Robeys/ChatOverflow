
export class Message {
    readonly chatid: number;
    readonly userid: number;
    readonly messageid: number;
    readonly message: string;
    readonly time: Date;

    constructor(chatMessage: {
        userid: number;
        message: string;
        messageid: number;
        time: Date;
        chatid: number;
    }) {
        this.chatid = chatMessage.chatid;
        this.userid = chatMessage.userid;
        this.message = chatMessage.message;
        this.time = chatMessage.time;
        this.messageid = chatMessage.messageid;
    }
    


}