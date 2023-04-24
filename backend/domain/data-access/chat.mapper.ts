import { Chat as PrismaChat } from '@prisma/client';
import { Chat } from '../model/chat';
import { Message as PrismaMessage } from '@prisma/client';
import { User as PrismaUser } from "@prisma/client";
import { UserMapper } from "./user.mapper";
import { MessageMapper } from './message.mapper';

export class ChatMapper {
    static toDomain(prismaChat: PrismaChat & {users: PrismaUser[]} & {Message?: PrismaMessage[]}): Chat {
        return new Chat({
            chatid: prismaChat.chatid,
            users: prismaChat.users.map(user => UserMapper.toDomain(user)),
            lastMessage: prismaChat.Message ? prismaChat.Message.map(m => MessageMapper.toDomain(m))[0] : undefined
        })
    }

    static toPersistence(chat: Chat): Omit<PrismaChat, 'chatid'> {
        return {users: {connect: chat.users.map(user => ({userid: user.userid}))}
    }}
}
