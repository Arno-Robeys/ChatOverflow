import { Message as PrismaMessage } from '@prisma/client';
import { Message } from '../model/message';

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

    static toPersistence(message: Message): Omit<PrismaMessage,'messageid'> {
        return { userid: message.userid, message: message.message, time: message.time, read: message.read, chatid: message.chatid }        
    }

}