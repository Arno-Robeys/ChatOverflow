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

const getAllChats = async (): Promise<Chat[]> => {
  const chats = await database.chat.findMany({ include: { users: true } });
  return chats.map((chat) => ChatMapper.toDomain(chat));
};

export default {
  createChat,
  getAllChats,
  addUserToChat,
};