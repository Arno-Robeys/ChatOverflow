import { Message as PrismaMessage } from '@prisma/client';
import { Message } from '../model/message';
import { User } from '../model/user';
import { Chat } from '../model/chat';

export class MessageMapper {
    static toDomain(prismaMessage: PrismaMessage): Message {
        return new Message({
            userid: prismaMessage.userid,
            message: prismaMessage.message,
            time: prismaMessage.time,
            read: prismaMessage.read,
            chatid: prismaMessage.chatid
        })
            
    }

    static toPersistence(message: Message): Omit<PrismaMessage,'chatid'> {
        return { userid: message.userid, message: message.message, time: message.time, read: message.read, messageid: message.chatid }        
    }

}