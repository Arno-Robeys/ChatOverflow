export type UserChat = {
    chatid: number;
    users: {
        userid: number;
        firstname: string;
        lastname: string;
        nickname: string;
        profile: {
            avatar: string | null;
        }
    }[];
    lastMessage: {
        message: string;
        time: Date;
    };
}