import { Chat } from '../model/chat';

const chats: Chat[] = [];

export class ChatDao {
    async createChat(chat: Chat): Promise<Chat> {
        return Chat.create({ chatid: chat.chatid, userid: chat.userid, message: chat.message, time: chat.time, read: chat.read });
    }    

    async getAllChats(): Promise<Chat[]> {
        return chats;
    }
}
