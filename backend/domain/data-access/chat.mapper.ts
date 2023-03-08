import { Chat as PrismaChat } from '@prisma/client';
import { Chat } from '../model/chat';

export class ChatMapper {
   /* static toDomain(prismaChat: PrismaChat): Chat {
        return new Chat({
            chatid: prismaChat.chatid,
            users: prismaChat.users
        })
    }*/

    static toPersistence(chat: Chat): Omit<PrismaChat,'chatid'> {
        return { users: chat.users }
    }

}