import { Chat } from '../model/chat';
import database from '../data-access/prisma/database';
import { ChatMapper } from './chat.mapper';
import { User } from '../model/user';

const createChat = async (chat: Chat): Promise<Chat> => {
  return await database.chat.create({data: ChatMapper.toPersistence(chat), include: { users: true }});
};

const addUserToChat = async (chatid: number, user: User): Promise<Chat> => {
  return await database.chat.update({where: { chatid: chatid }, data: { users: { connect: { userid: user.userid } } }, include: { users: true }});
};

const removeUserFromChat = async (chatid: number, user: User): Promise<Chat> => {
  return await database.chat.update({where: { chatid: chatid }, data: { users: { disconnect: { userid: user.userid } } }, include: { users: true }});
};

const getAllChats = async (): Promise<Chat[]> => {
  const chats = await database.chat.findMany({ include: { users: true } });
  return chats.map((chat) => ChatMapper.toDomain(chat));
};

const getChatById = async (chatid: number): Promise<Chat> => {
  const chat = await database.chat.findUnique({ where: { chatid: chatid }, include: { users: true } });
  if (!chat) throw new Error('No chat found');
  return ChatMapper.toDomain(chat);
};

  const getAllChatsByUserId = async (userid: number): Promise<Chat[]> => {
    const chats = await database.chat.findMany({ where: { users: { some: { userid: userid } } }, include: { users: true, Message: { orderBy: { time: 'desc' }, take: 1 } } });
    if (!chats) throw new Error('No chat found');
    chats.sort((a, b) => {
      if(a.Message[0] == undefined) return 1;
      if(b.Message[0] == undefined) return -1;
      if (a.Message[0].time > b.Message[0].time) return -1;
      if (a.Message[0].time < b.Message[0].time) return 1;
      return 0;
    });
    return chats.map((chat) => ChatMapper.toDomain(chat));
  };

const deleteChat = async (chatid: number): Promise<boolean> => {
  try {
    //Delete alle messages and notifications van chat vanwege foreign key constraint
    await database.message.deleteMany({where: { chatid: chatid }});
    await database.notification.deleteMany({where: { chatid: chatid }});
    await database.chat.delete({where: { chatid }});

    return true;
  } catch (error) {
    throw new Error("No chat found");
  }
};

export default {
  createChat,
  getAllChats,
  addUserToChat,
  getChatById,
  removeUserFromChat,
  deleteChat,
  getAllChatsByUserId,
};