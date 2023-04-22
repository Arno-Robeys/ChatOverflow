import { useSession } from "next-auth/react";
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from "react";
import { UserProfile } from "@/types/userprofile.type";
import { useRouter } from "next/router";

const Profile: React.FC<{ userId?: string | string[] }> = ({ userId }) => {

    const { data: session } = useSession();
    
    const loggedInUserId = session?.user.id;

    const profileUserId = userId || loggedInUserId;

    const [profile, setProfile] = useState<UserProfile>();
    
    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:3000/user/${profileUserId}/profile`, {method: 'GET'});
            const data = await response.json();
            setProfile(data);
        })();
    });

    const router = useRouter();

    const handleChatClick = async (): Promise<void> => {
        // Create chat and redirect to chat
        const response = await fetch('http://localhost:3000/chat/create', {
          method: 'POST',
          body: JSON.stringify({ user1: loggedInUserId, user2: profileUserId }),
          headers: { 'Content-Type': 'application/json' },
        });
        console.log(response);
      
        if (response.ok) {
          const { chatId } = await response.json();
          router.push(`/chat/${chatId}`);
        }

      };
      
    

        /* router.push({
            pathname: "/chat/create",
            query: { 
                profileUserId: profileUserId,
                loggedInUserId: loggedInUserId
            }
        });
    } */

    
        
        
    
    return (

            <div className=" flex items-center justify-center py-4">
                <div className="sm:w-8/12">
                {loggedInUserId !== profileUserId ?
                <button 
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
                onClick={handleChatClick}
            >
                Chat with {profile?.firstname}
            </button>
                    :null

                }
                <div className="mt-2 flex items-center">
                    
                    <div className="flex-1 flex flex-col items-center">
                        <UserCircleIcon className="h-48 w-48 text-gray-300" aria-hidden="true" />
                        {profile?.nickname ?
                        <>
                            <h1 className="text-3xl font-bold text-gray-900">{profile?.nickname}</h1>
                            <h3 className="text-gray-900">{profile?.firstname} {profile?.lastname}</h3>
                        </>
                        :
                        <h1 className="text-2xl font-bold text-gray-900">{profile?.firstname} {profile?.lastname}</h1>
                        }
                    </div>
                </div>


                    {profile?.profile ?
                    <>
                        <h1 className="content-center text-2xl font-bold text-gray-900">About me</h1>
                        
        {profile.profile.description ?
            <div className="mt-4">
                <p className="block text-sm font-bold leading-6 text-gray-900">Description</p>
                <p className="whitespace-normal block w-full rounded-md border-0 text-gray-900 sm:py-1.5 sm:text-sm sm:leading-6">{profile?.profile.description}</p>
            </div>
            :null
        }
        

            <div className="mt-4 flex flex-col sm:flex-row sm:justify-between">
                {profile.profile.education ?
                    <div className="mb-4 sm:mb-0 sm:w-1/2 sm:pr-2">
                        <p className="block text-sm font-bold leading-6 text-gray-900">Education</p>
                        <p className="block w-full rounded-md border-0 py-1.5 text-gray-900  sm:text-sm sm:leading-6">{profile?.profile.education}</p>
                    </div>
                :null
                }
                {profile.profile.work ?
                    <div className="sm:w-1/2 ">
                        <p className="block text-sm font-bold leading-6 text-gray-900">Work</p>
                        <p className="block w-full rounded-md border-0 py-1.5 text-gray-900  sm:text-sm sm:leading-6">{profile?.profile.work}</p>
                    </div>
                :null
                }
            </div>
            <div className="mt-4 flex flex-col sm:flex-row sm:justify-between">

                {profile.profile.tags ?
            
                    <div className="mb-4 sm:mb-0 sm:w-1/2 sm:pr-2">
                        <p className="block text-sm font-bold leading-6 text-gray-900">Tags</p>
                        <p className="block w-full rounded-md border-0 py-1.5 text-gray-900  sm:text-sm sm:leading-6">{profile?.profile.tags}</p>
                    </div>
                :null
                }
                {profile.profile.hobby ?
                    <div className="sm:w-1/2 ">
                        <p className="block text-sm font-bold leading-6 text-gray-900">Hobby's</p>
                        <p className="block w-full rounded-md border-0 py-1.5 text-gray-900  sm:text-sm sm:leading-6">{profile?.profile.hobby}</p>
                    </div>
                :null
                }
            </div>

            





                        
                    </>
                    :
                    <h1 className="text-2xl font-bold text-gray-900">This user doesn't have a profile yet</h1>
                    }
                    </div>
            </div> 
    );
};

export default Profile;