import { Chat } from '../model/chat';
import database from '../data-access/prisma/database';
import { ChatMapper } from './chat.mapper';
import { User } from '../model/user';

export async function createChat(users: User[]): Promise<Chat> {
  const chat = await database.chat.create({
    data: {
      users: { connect: users.map(u => ({ userid: u.userid })) }
    },
    include: { users: true }
  })

  return chat
}

export async function getAllChats(): Promise<Chat[]> {
  const chats = await database.chat.findMany({ include: { users: true } })
  return chats
}