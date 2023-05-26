export type Notification = {
    notificationid: number;
    userid: number;
    chatid: number;
    messageid: number;
    message?: {
        messageid: number;
        userid: number;
        chatid: number;
        message: string;
        time: Date;
        user?: {
            firstname: string;
            lastname: string;
            nickname: string;
        };
    };

}