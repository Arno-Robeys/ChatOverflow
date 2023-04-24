import { useSession } from 'next-auth/react';
import Link from 'next/link'
import{ useState,useEffect } from 'react'
import { UserChat } from "@/types/userchat.type";

const Chats: React.FC<{ props?: string | string[], method?: () => void }> = ({props, method}) => {

    const { data: session } = useSession();
    if(!session) return (<div>Not logged in</div>);
    const [chats, setChats] = useState<UserChat[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/chat/user/${session?.user.id}`, {method: 'GET'});
            const data = await response.json();
            setChats(data);
        })();
    }, [])

    const converter = (date: Date) => {
        const date1 = new Date(date);
        const today = new Date();
        const diff = Math.abs(today.getTime() - date1.getTime());
        const diffMinutes = Math.ceil(diff / (1000 * 60));
        const diffHours = Math.ceil(diff / (1000 * 3600));
        const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        const diffWeeks = Math.ceil(diff / (1000 * 3600 * 24 * 7));
      
        if (diffMinutes < 60) {
          return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
        } else if (diffHours < 24) {
          return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        } else if (diffDays < 7) {
          return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        } else {
          return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
        }
      };
      

  return (
    <section className="flex flex-col antialiased bg-gray-50 text-gray-600 h-full">
    <div>
            <div className="sm:py-3 sm:px-5">
                <h3 className="text-xs font-semibold uppercase text-gray-400 mb-1">Chats</h3>

                {chats.length === 0 ? 
                    <div className="flex flex-col justify-center items-center h-40">
                        <p className="text-lg text-gray-400">Go chat with some people!</p>
                        <a href="https://youtu.be/6EEW-9NDM5k?t=12" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Lonelyyyy</a>
                    </div>
                 : 
                    <div className="divide-y divide-gray-200">
                    {chats.map((chat) =>  {
                        var user = chat.users.find(user => user.userid !== parseInt(session?.user.id));
                        return (
                        <div onClick={method} key={chat.chatid} className="w-full text-left py-2 hover:bg-gray-100">
                            <Link href={`/chat/${chat.chatid}`}>
                                <div className="flex items-center">
                                    <img className="rounded-full items-start flex-shrink-0 mr-3" width="32" height="32" />
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900">{user?.nickname ? user.nickname : user?.firstname + " " + user?.lastname}</h4>
                                        {chat.lastMessage ? <div className="text-[13px]">{chat.lastMessage?.message} · {converter(chat.lastMessage?.time)}</div> : null}
                                    </div>
                                </div>
                            </Link>
                        </div>
                        )})}
                    </div>}
            </div>
    </div>
</section>
  )
}
export default Chats