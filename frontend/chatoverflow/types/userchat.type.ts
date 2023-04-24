export type UserChat = {
    chatid: number;
    users: {
        userid: number;
        firstname: string;
        lastname: string;
        nickname: string;
    }[];
    lastMessage: {
        message: string;
        time: Date;
        read: boolean;
    };
}