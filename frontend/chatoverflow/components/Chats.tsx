import { useSession } from 'next-auth/react';
import Link from 'next/link'
import{ useState,useEffect } from 'react'
import { UserChat } from "@/types/userchat.type";
import moment from 'moment';
import { pusher } from "../pusher"

const Chats: React.FC<{method?: () => void }> = ({method}) => {

    const { data: session } = useSession();
    if(!session) return (<div>Not logged in</div>);
    const [chats, setChats] = useState<UserChat[]>([]);

    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/chat/user/${session?.user.id}`, {method: 'GET'});
      const data = await response.json();
      setChats(data);
    }

    useEffect(() => {
      fetchData();
    }, [session?.user.id]);

    useEffect(() => {
      chats.forEach(chat => {
        const channel = pusher.subscribe(`updateChats${chat.chatid}`);
        channel.bind('message', function(data: any) {
          fetchData()
        });
      });
      return () => {
        chats.forEach(chat => {
          pusher.unsubscribe(`updateChats${chat.chatid}`);
        });
      };
    }, [chats, session?.user.id]);


    const converter = (date: Date) => {
        const date1 = moment(date);
        const today = moment()
        const duration = moment.duration(today.diff(date1));

        if(duration.asDays() < 1) {
            return duration.humanize() + " ago";
        }
        else if(duration.asDays() < 2) {
            return "Yesterday";
        }
        else if(duration.asDays() < 7) {
            return date1.format("dddd");
        }
        else {
            return date1.format("DD/MM/YYYY");
        }
    }
      

  return (
    <section className="flex flex-col antialiased bg-gray-50 text-gray-600 h-full">
    <div>
            <div className="py-3 px-5">
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
                        <div onClick={method} key={chat.chatid} className="w-full text-left hover:bg-gray-100">
                            <Link href={`/chat/${chat.chatid}`}>
                                <div className="flex items-center py-2">
                                    <img className="rounded-full items-start flex-shrink-0 mr-3" width="32" height="32" src={user?.profile?.avatar ? user.profile.avatar : "/default-avatar.png"} />
                                    <div>
                                    <h4 className="text-sm font-semibold text-gray-900">{user?.nickname ? user.nickname : user?.firstname + " " + user?.lastname}</h4>
                                    {chat.lastMessage ? (
                                    <div className="text-[13px]">
                                      {chat.lastMessage?.message.length > 50
                                        ? chat.lastMessage?.message.substring(0, 35) + "..."
                                        : chat.lastMessage?.message} · {converter(chat.lastMessage?.time)}
                                    </div>
                                    ) : null}
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