import { UserProfile } from "@/types/userprofile.type";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { Notification } from '@/types/notification.type'


async function getUserProfile(id: string, token: any): Promise<UserProfile | null> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/user/${id}/profile`, { method: 'GET', headers: { 'Content-Type': 'application/json', 'authorization': `bearer ${token}` } });
    if(response.ok) {
        const data = await response.json();
        return data as UserProfile;
    }else if(response.status == 401) {
        signOutUser();
        return null;
    } 
    return null;
}

async function findUserByName(name: string, token: any): Promise<any | null> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/user/find/${name}`, {method: 'GET', headers: {'Content-Type': 'application/json', 'authorization': `bearer ${token}`}});
    if(response.ok) {
        const data = await response.json();
        return data;
    }else if(response.status == 401) {
        signOutUser();
        return null;
    } 
    return null;
}

async function getNotificationsOfUser(id: string, token: any): Promise<Notification[] | null> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/notification/user/${id}`, {method: 'GET', headers: {'Content-Type': 'application/json', 'authorization': `bearer ${token}`}});
    if(response.ok) {
        const data = await response.json();
        return data as Notification[];
    }else if(response.status == 401) {
        signOutUser();
        return null;
    } 
    return null;
}

async function markAsReadNotifications(id: string, token: any) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/notification/read/${id}`, {method: "PUT", headers: {'Content-Type': 'application/json', 'authorization': `bearer ${token}`}});
    return response;
}


const signOutUser = async () => {
    await signOut({
        redirect: false,
    });
    sessionStorage.removeItem('avatar');
    toast.error('You sended an invalid request. Please login again.');
}



export default {
    getUserProfile,
    findUserByName,
    getNotificationsOfUser,
    markAsReadNotifications
}