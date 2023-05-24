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
        return null;
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
        return null;
    } 
    return null;
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
    getUserChats
}