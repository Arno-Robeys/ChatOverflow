import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
import { pusher } from '../pusher';
import { Menu, Transition } from '@headlessui/react';
import chatService from '@/service/chatService';

const Chat: React.FC<{ chatId: string}> = ({ chatId }) => {
  const { data: session } = useSession();
  if(!session) return (<div>Not logged in</div>);;

  const [otherUser, setOtherUser] = useState<any>();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState<string>('');
  const [updateChat, setUpdateChat] = useState<boolean>(false);
  const [messageEdit, setMessageEdit] = useState({mode:false, messageid : 0});

    const sendMessage = async () => {
      if(input.trim()) {
        await chatService.sendMessageAndNotifications(input, chatId, otherUser.userid, session);
        setInput('');
      }
    }

    const deleteMessage = async (messageid: number) => {
      await chatService.deleteMessage(chatId, messageid, session);
    }

    const editMessage = async () => {
      const response = await chatService.editMessage(input, chatId, messageEdit.messageid, session);
      if(response.ok) {
        setMessageEdit({mode: false, messageid: 0});
        setInput('');
      }
    }

    const handleEditMode = (messageid: number, message: string) => {
      setMessageEdit({mode: true, messageid: messageid});
      setInput(message);
    }

  useEffect(() => {
    (async () => {
      const channel = pusher.subscribe(`chat${chatId}`);
  
      channel.bind('message', function(data: any) {
        setUpdateChat((updateChat) => !updateChat);
      });

      const chat = await chatService.getChat(chatId, session?.user.accessToken);
      if(chat !== null) {
        setOtherUser(chat.users.find((user: { userid: number; }) => user.userid !== parseInt(session?.user.id)));
      } 

      const messages = await chatService.getMessagesFromChat(chatId, session?.user.accessToken);
      if(messages !== null) {
        setMessages(messages);
      } 
    })();
    return () => {
      pusher.unsubscribe(`chat${chatId}`);
    };
  }, [chatId, session?.user.id, updateChat]);

  const scrollableNodeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollableNodeRef.current) {
      scrollableNodeRef.current.scrollTop = scrollableNodeRef.current.scrollHeight;
    }
  }, [messages]);

  return (
        <div className="flex-1 p:2 pb-20 justify-between flex flex-col h-screen dark:bg-gray-800  dark:text-gray-300  ">
          <div className="flex sm:items-center justify-between p-3 py-4 pb-5 border-b-2 border-gray-200  dark:border-blue-900">
              <div className="relative flex items-center space-x-4">
                <img src={otherUser?.profile?.avatar ? otherUser.profile.avatar : "/default-avatar.png"} alt="" className="w-10 sm:w-12 h-10 sm:h-12 rounded-full"/>
                <div className="flex flex-col leading-tight">
                    <div className="text-2xl mt-1 flex items-center">
                      <span className="text-gray-700  dark:text-gray-300 mr-3">
                        {otherUser && (otherUser.nickname ? otherUser.nickname : `${otherUser.firstname} ${otherUser.lastname}`)}
                      </span>
                    </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Link href={`/user/profile?id=${otherUser?.userid}`} type="button" className="inline-flex items-center justify-center rounded-lg border h-10 w-20 transition duration-500 ease-in-out text-gray-500  dark:text-gray-300 hover:bg-gray-300 focus:outline-none">Profile</Link>
                <Link href={"/user"} type="button" className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500  dark:text-gray-300 hover:bg-gray-300 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </Link>
              </div>
          </div>
          <div ref={scrollableNodeRef} id="messages" className="flex flex-col mt-auto space-y-4 p-3 pt-16 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
              
          {messages.map((message) =>  {
            return (
              message.userid === parseInt(session?.user.id) ?

              <div key={message.messageid} className="chat-message">
                <Menu as="div" className="ml-3">
                <div className="flex items-center justify-end">
                  <Menu.Button className="text-gray-400 hover:text-black p-2">
                    <div className='relative'>
                    <a className='text-xl'>&#8942;</a>
                    <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-2 bottom-6 z-10 w-24 rounded-md bg-white shadow-lg">
                      <Menu.Item>
                        <a onClick={() => handleEditMode(message.messageid, message.message)} className="flex items-center p-2 border-b hover:bg-gray-100 hover:rounded-md">
                          <p className="text-gray-600 text-sm mx-2">
                            Edit
                          </p>
                        </a>
                      </Menu.Item>
                      <Menu.Item>
                        <a onClick={() => deleteMessage(message.messageid)} className="flex items-center p-2 hover:bg-gray-100 hover:rounded-md">
                          <p className="text-gray-600 text-sm mx-2">
                            Delete
                          </p>
                        </a>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                  </div>
                  </Menu.Button>
                  <div className="flex flex-col space-y-2 max-w-md mr-2 order-1 items-end">
                    <div className='px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white '>
                      <span>{message.message}</span>
                    </div>
                  </div>
                </div>
                </Menu>
            </div> :
              <div key={message.messageid} className="chat-message">
                <div className="flex items-end">
                    <div className="flex flex-col space-y-2 max-w-md mx-2 order-2 items-start">
                      <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">{message.message}</span></div>
                    </div>
                </div>
              </div>
          )})}

          </div>
          <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0  dark:border-blue-900">
              
                {messageEdit.mode == true ? 
                <>
                <p className='font-bold text-sm'>Attention: You are in edit message mode</p>
                <div className="relative flex">
                  <input type="text" value={input} onKeyDown={(e) => {e.key === 'Enter' && editMessage()}} placeholder="Write your message!" onChange={(e) => setInput(e.target.value)} className="w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 rounded-md py-3"></input>
                  <div className="absolute right-0 items-center inset-y-0 flex">
                      <button type="button" onClick={() => editMessage()} className="inline-flex items-center justify-center rounded-lg px-4 h-full transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                        <span className="font-bold hidden sm:block">Send</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                        </svg>
                      </button>
                  </div>
                </div>
                </>
              :
              <div className="relative flex">
                <input type="text" value={input} onKeyDown={(e) => {e.key === 'Enter' && sendMessage()}} placeholder="Write your message!" onChange={(e) => setInput(e.target.value)} className="w-full focus:placeholder-gray-400 text-gray-600 dark:text-gray-300 dark:bg-gray-800 placeholder-gray-600 rounded-md py-3"></input>
                <div className="absolute right-0 items-center inset-y-0 flex">
                    <button type="button" onClick={sendMessage} className="inline-flex items-center justify-center rounded-lg px-4 h-full transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                      <span className="font-bold hidden sm:block">Send</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                      </svg>
                    </button>
                </div>
              </div>
              }
          </div>
        </div>
  )
}

export default Chat