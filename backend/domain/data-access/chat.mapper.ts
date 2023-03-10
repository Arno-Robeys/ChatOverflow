import { Chat as PrismaChat } from '@prisma/client';
import { Chat } from '../model/chat';
import { User as PrismaUser } from "@prisma/client";
import { UserMapper } from "./user.mapper";

export class ChatMapper {
    static toDomain(prismaChat: PrismaChat & {users: PrismaUser[]}): Chat {
        return new Chat({
            chatid: prismaChat.chatid,
            users: prismaChat.users.map(user => UserMapper.toDomain(user))
        })
    }

    static toPersistence(chat: Chat): Omit<PrismaChat, 'chatid'> {
        return {users: {connect: chat.users.map(user => ({userid: user.userid}))}
    }}
}
