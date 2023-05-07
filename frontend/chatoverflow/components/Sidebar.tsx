import React from 'react'
import { useState } from 'react';
import Chats from './Chats';
import Link from 'next/link';
import { useSession } from 'next-auth/react';


const SideBar: React.FC<{method?: () => void}> = ({method}) => {

  const {data: session} = useSession();

  interface User {
    userid: number;
    firstname: string;
    lastname: string;
    nickname: string;
    email: string;
    profile: {
      avatar: string;
    };
  }

  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<User[]>([]);

  async function handleSearch(event: { target: { value: any } }) {

    if(event.target.value.length === 0) {
      setIsSearching(false);
      setSearchResults([]);
    } else {
      setIsSearching(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/user/find/${event.target.value}`, {method: 'GET', headers: {'Content-Type': 'application/json', 'authorization': `bearer ${session?.user.accessToken}`}});
      if(response.ok){
        const users = await response.json();
        setSearchResults(users.allUsers);
      } else setSearchResults([]);
    }

  }

  
  return (<>
    {/*Search bar*/}
    <div className="p-4 border-b-2 dark:bg-gray-800">
    <div className="relative">
        <svg className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400  left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input type="text" onChange={handleSearch} placeholder="Search for users" className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"/>
    </div>
    </div>

    {/*Chat list or search results*/}
    {isSearching ? 
    
    <section className="flex flex-col antialiased bg-gray-50 text-gray-600 min-h-screen">
    <div className="h-full">
            <div className="py-3 px-5">
                <h3 className="text-xs font-semibold uppercase text-gray-400 mb-1">Users</h3>
                {searchResults.length === 0 ? 
                  <div className="flex justify-center items-center h-40">
                  <p className="text-lg text-gray-400">No user found</p>
                  </div>
                 :
                <div className="divide-y divide-gray-200">
                    {searchResults.map((user) => {


                        return (
                          <div onClick={method} key={user.userid} className='w-full text-left py-2 hover:bg-gray-100'>
                            <Link href={`/user/profile?id=${user.userid}`}>
                                <div className="flex items-center">
                                <img className="rounded-full items-start flex-shrink-0 mr-3" width="32" height="32" src={user?.profile?.avatar ? user.profile.avatar : "/default-avatar.png"} />
                                    <div>
                                      <h4 className="text-sm font-semibold text-gray-900">{user.nickname ? user.nickname : user.firstname + ' ' + user.lastname}</h4>
                                    </div>
                                </div>
                            </Link>
                          </div>
                        )
                    })}
                </div>
                }
            </div>
    </div>
    </section> 
    : <Chats method={method}/>}
    </>)
}

export default SideBar