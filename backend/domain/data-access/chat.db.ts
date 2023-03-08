import { Chat } from '../model/chat';
import database from '../data-access/prisma/database';
import { ChatMapper } from './chat.mapper';
import { User } from '../model/user';
import exp from 'constants';

const createChat = async (chat: Chat): Promise<Chat> => {
  return ;//ChatMapper.toDomain(await database.chat.create({ data: ChatMapper.toPersistence(chat) }));
};

const addUserToChat = async (chat: Chat, user: User): Promise<Chat> => {
  return ;//ChatMapper.toDomain(await database.chat.update({ where: { chatid: chat.chatid }, data: { users: { connect: { userid: user.userid } } } }));
};

const getAllChats = async (): Promise<Chat[]> => {
  const chats = await database.chat.findMany();
  return ;//chats.map((chat) => ChatMapper.toDomain(chat));
};

export default {
  createChat,
  getAllChats
};