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

const getChatById = async (id: string): Promise<Chat> => {
    if(!id) throw new Error("A chat id must be provided")
    if(Number.isNaN(Number(id))) throw new Error("A chat id must be a number");
    return chatDB.getChatById(parseInt(id));
};

const getAllChatsByUserId = async (userid: string): Promise<Chat[]> => {
    if(!userid) throw new Error("A user id must be provided")
    if(Number.isNaN(Number(userid))) throw new Error("A user id must be a number");
    return chatDB.getAllChatsByUserId(parseInt(userid));
};

const addUserToChat = async (chatid: string, userid: string): Promise<Chat> => {
    if(!chatid || !userid) throw new Error("Userid or/and chatid must be provided")
    if(Number.isNaN(Number(chatid)) || Number.isNaN(Number(userid))) throw new Error("Userid or/and chatid must be numeric");
    const user = await userDB.getUserById({id: parseInt(userid)});
    if(!user) throw new Error("User must exist");
    return chatDB.addUserToChat(parseInt(chatid), user);
};

const removeUserFromChat = async (chatid: string, userid: string): Promise<Chat> => {
    if(!chatid || !userid) throw new Error("Userid or/and chatid must be provided")
    if(Number.isNaN(Number(chatid)) || Number.isNaN(Number(userid))) throw new Error("Userid or/and chatid must be numeric");
    const user = await userDB.getUserById({id: parseInt(userid)});
    if(!user) throw new Error("User must exist");
    return chatDB.removeUserFromChat(parseInt(chatid), user);
};

const deleteChat = async (id: string): Promise<Boolean> => {
    if(!id) throw new Error("A chat id must be provided")
    if(Number.isNaN(Number(id))) throw new Error("A chat id must be a number");
    return chatDB.deleteChat(parseInt(id));
};

export default {
    createChat,
    getAllChats,
    getChatById,
    addUserToChat,
    removeUserFromChat,
    deleteChat,
    getAllChatsByUserId,
}