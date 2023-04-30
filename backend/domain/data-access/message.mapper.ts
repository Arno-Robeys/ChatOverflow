import { Message as PrismaMessage } from '@prisma/client';
import { Message } from '../model/message';
import { User as PrismaUser } from "@prisma/client";
import { UserMapper } from './user.mapper';

export class MessageMapper {
    static toDomain(prismaMessage: PrismaMessage & {user?: PrismaUser}): Message {
        return new Message({
            userid: prismaMessage.userid,
            message: prismaMessage.message,
            time: prismaMessage.time,
            chatid: prismaMessage.chatid,
            messageid: prismaMessage.messageid,
            user: prismaMessage.user ? UserMapper.toDomain(prismaMessage.user) : undefined,             
        })
            
    }

    static toPersistence(message: Message): Omit<PrismaMessage,'messageid'> {
        return { userid: message.userid, message: message.message, time: message.time, chatid: message.chatid } 
    }      
}