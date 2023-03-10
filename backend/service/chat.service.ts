import { Chat } from '../domain/model/chat';
import chatDB from '../domain/data-access/chat.db';
import userDB from '../domain/data-access/user.db';


const createChat = async (user1: number, user2: number): Promise<Chat> => {
    if(!user1 || !user2) throw new Error("Users must be provided")
    if(Number.isNaN(Number(user1)) || Number.isNaN(Number(user2))) throw new Error("Users must be numeric");

    const user1Exists = await userDB.getUserById({id: user1});
    const user2Exists = await userDB.getUserById({id: user2});

    if(!user1Exists || !user2Exists) throw new Error("Users must exist");

    const chatObj: Chat = {chatid: 0, users: [user1Exists, user2Exists] };
    return chatDB.createChat(chatObj);
};

const getAllChats = async (): Promise<Chat[]> => {
    return chatDB.getAllChats();
};

export default {
    createChat,
    getAllChats
}