import { useSession } from 'next-auth/react';
import Link from 'next/link'
import{ useState,useEffect } from 'react'

interface Chat {
    chatid: number;
    users: User[];
}

interface User {
    userid: number;
    firstname: string;
    lastname: string;
    nickname: string;
}


const Chats: React.FC = () => {

    const { data: session } = useSession();
    const [chats, setChats] = useState<Chat[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:3000/chat/user/${session?.user.id}`, {method: 'GET'});
            const data = await response.json();
            setChats(data);
        })();
    }, [])

  return (
    <section className="flex flex-col antialiased bg-gray-50 text-gray-600 min-h-screen">
    <div className="h-full">
            <div className="py-3 px-5">
                <h3 className="text-xs font-semibold uppercase text-gray-400 mb-1">Chats</h3>

                {chats.length === 0 ? 
                    <div className="flex flex-col justify-center items-center h-40">
                        <p className="text-lg text-gray-400">Go chat with some people!</p>
                        <a href="https://youtu.be/6EEW-9NDM5k?t=12" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Lonelyyyy</a>
                    </div>
                 : 
                    <div className="divide-y divide-gray-200">
                    {chats.map((chat) => (
                        <div key={chat.chatid} className="w-full text-left py-2 hover:bg-gray-100">
                            <Link href={`/chat/${chat.chatid}`}>
                                <div className="flex items-center">
                                    <img className="rounded-full items-start flex-shrink-0 mr-3" width="32" height="32" />
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900">{chat.users[1].nickname ? chat.users[1].nickname : chat.users[1].firstname + " " + chat.users[1].lastname}</h4>
                                        <div className="text-[13px]">Doebadoebadoe · 2hrs</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        ))}
                    </div>}
            </div>
    </div>
</section>
  )
}
export default Chats