import { UserChat } from "@/types/userchat.type";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

async function createChat(user1: string, user2: string, token: any): Promise<UserChat | null> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/chat/create`, {
        method: 'POST',
        body: JSON.stringify({ user1: user1, user2: user2 }),
        headers: { 'Content-Type': 'application/json', 'authorization': `bearer ${token}` },
    });

    if(response.ok) {
        const data = await response.json();
        return data as UserChat;
    } else if (response.status == 401) {
        signOutUser();
    } 
    return null;
}

async function getUserChats(id: string, token: any): Promise<UserChat[] | null> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/chat/user/${id}`, {method: 'GET', headers: {'Content-Type': 'application/json', 'authorization': `bearer ${token}`}});
    if(response.ok) {
        const data = await response.json();
        return data as UserChat[];
    } else if (response.status == 401) {
        signOutUser();
    } 
    return null;
}

async function getChat(chatId: string, token: any): Promise<UserChat | null> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/chat/${chatId}`, { method: 'GET', headers: { 'authorization': `bearer ${token}` } });
    if(response.ok) {
        const data = await response.json();
        return data as UserChat;
    }else if(response.status == 401) {
        signOutUser();
    }
    return null;
}

async function getMessagesFromChat(chatId: string, token: any): Promise<any | null> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/message/chat/${chatId}`, { method: 'GET', headers: { 'authorization': `bearer ${token}` } });
    if(response.ok) {
        const data = await response.json();
        return data;
    }else if(response.status == 401) {
        signOutUser();
    }
    return null;
}

async function sendMessageAndNotifications(input: string, chatId: string, otherId: string, session: any) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/message/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `bearer ${session?.user.accessToken}`
        },
        body: JSON.stringify({
          message: input,
          chatid: parseInt(chatId),
          userid: parseInt(session?.user.id)
        })
      });

      if(response.ok) {
        const data = await response.json();
  
        const notification = await fetch(`${process.env.NEXT_PUBLIC_URL}/notification/createnotification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `bearer ${session?.user.accessToken}`
          },
          body: JSON.stringify({
            messageid: data.messageid,
            chatid: data.chatid,
            userid: otherId
          })
        });
    } else if (response.status == 401) {
        signOutUser();
    }
}

async function editMessage(input: string, chatId: string, messageid: number, session: any) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/message/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `bearer ${session?.user.accessToken}`
        },
        body: JSON.stringify({
          messageid: messageid,
          message: input,
          chatid: chatId
        })
      });
      return response;
}

async function deleteMessage(chatId: string, messageid: number, session: any) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/message/delete/${messageid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `bearer ${session?.user.accessToken}`
        },
        body: JSON.stringify({
          chatid: chatId
        })
      });
}


const signOutUser = async () => {
    await signOut({
        redirect: false,
    });
    sessionStorage.removeItem('avatar');
    toast.error('You sended a request with an invalid token. Please login again.');
}

export default {
    createChat,
    getUserChats,
    sendMessageAndNotifications,
    editMessage,
    deleteMessage,
    getChat,
    getMessagesFromChat
}