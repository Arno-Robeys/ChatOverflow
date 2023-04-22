import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Chat: React.FC<{ chatId: string}> = ({ chatId }) => {

  const router = useRouter();
  return (
        <div className="flex-1 p:2 sm:pb-20 justify-between flex flex-col h-screen">
          <div className="flex sm:items-center justify-between p-3 border-b-2 border-gray-200">
              <div className="relative flex items-center space-x-4">
                <img src="" alt="" className="w-10 sm:w-12 h-10 sm:h-12 rounded-full"></img>
                <div className="flex flex-col leading-tight">
                    <div className="text-2xl mt-1 flex items-center">
                      <span className="text-gray-700 mr-3">ChatOverflow</span>
                    </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Link href={"#"} type="button" className="inline-flex items-center justify-center rounded-lg border h-10 w-20 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">Profile</Link>
                <Link href={"/user"} type="button" className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </Link>
              </div>
          </div>
          <div id="messages" className="flex flex-col mt-auto space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
              
              <div className="chat-message">
                <div className="flex items-end">
                    <div className="flex flex-col space-y-2 max-w-md mx-2 order-2 items-start">
                      <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">Hey! How are you doing?</span></div>
                    </div>
                </div>
              </div>

              <div className="chat-message">
                <div className="flex items-end justify-end">
                    <div className="flex flex-col space-y-2 max-w-md mx-2 order-1 items-end">
                      <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">I'm doing great only I'm struggling with some code</span></div>
                    </div>
                </div>
              </div>
              <div className="chat-message">
                <div className="flex items-end">
                    <div className="flex flex-col space-y-2 max-w-md mx-2 order-2 items-start">
                      <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">Oh? Can I help you with it?</span></div>
                    </div>
                </div>
              </div>
              <div className="chat-message">
                <div className="flex items-end justify-end">
                    <div className="flex flex-col space-y-2 max-w-md mx-2 order-1 items-end">
                      <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">Maybe, this code is now hardcoded but I want it that people actually can message eachother and automaticly updates when receiving a new message</span></div>
                    </div>
                </div>
              </div>
              <div className="chat-message">
                <div className="flex items-end">
                    <div className="flex flex-col space-y-2 max-w-md mx-2 order-2 items-start">
                      <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">Aah, I know a little bit about this! You can use sockets to create a chat</span></div>
                    </div>
                </div>
              </div>
              <div className="chat-message">
                <div className="flex items-end justify-end">
                    <div className="flex flex-col space-y-2 max-w-md mx-2 order-1 items-end">
                      <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">Socket? What is that?</span></div>
                    </div>
                </div>
              </div>
              <div className="chat-message">
                <div className="flex items-end">
                    <div className="flex flex-col space-y-2 max-w-md mx-2 order-2 items-start">
                      <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">Search it up and you will find plenty of tutorials and information about it.</span></div>
                    </div>
                </div>
              </div>
              <div className="chat-message">
                <div className="flex items-end justify-end">
                    <div className="flex flex-col space-y-2 max-w-md mx-2 order-1 items-end">
                      <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">Aah oke thank you man!</span></div>
                    </div>
                </div>
              </div>

          </div>
          <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
              <div className="relative flex">
                <input type="text" placeholder="Write your message!" className="w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 rounded-md py-3"></input>
                <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                    <button type="button" className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                      <span className="font-bold">Send</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                      </svg>
                    </button>
                </div>
              </div>
          </div>
        </div>
  )
}

export default Chat