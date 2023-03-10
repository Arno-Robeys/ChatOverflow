import { Message } from "../domain/model/message";
import messageDB from "../domain/data-access/message.db";


const createMessage = async (message: Message): Promise<Message> => {
    if(!message) throw new Error("A message must be provided")

    return messageDB.createMessage(message);
  }

const getAllMessages = async (): Promise<Message[]> => {
    return messageDB.getAllMessages();
}

const getAllMessagesByChatId = async (chat: string): Promise<Message[]> => {
    if(!chat) throw new Error("A chat must be provided")
    if(Number.isNaN(Number(chat))) throw new Error('Chat must be numeric');
    return messageDB.getAllMessagesByChatId({chatid: parseInt(chat)});
}

const getMessageById = async (messageid: string): Promise<Message> => {
    if(Number.isNaN(Number(messageid))) throw new Error('Id must be numeric');

    const message = await messageDB.getMessageById({id: parseInt(messageid)});

    if(!message) throw new Error('Message not found');
    return message;
}

const deleteMessageById = async ({id}: {id: string}): Promise<boolean> => {
    if(Number.isNaN(Number(id))) throw new Error('Id must be numeric');

    try {
        return await messageDB.deleteMessageById({id: parseInt(id)});
    } catch(err) {
        return false;
    }
}

const updateMessage = async ({ id }: { id: string },{ data }: { data: Partial<Message> }): Promise<Message> => {    
    if(Number.isNaN(Number(id))) throw new Error('Id must be numeric');

    return messageDB.updateMessage({id: parseInt(id)}, { data: data });
}

export default {
    createMessage,
    getAllMessages,
    getMessageById,
    deleteMessageById,
    getAllMessagesByChatId,
    updateMessage,
};