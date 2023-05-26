import { useSession } from "next-auth/react";
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from "react";
import { UserProfile } from "@/types/userprofile.type";
import { useRouter } from "next/router";
import userService from "@/service/userService";
import chatService from "@/service/chatService";
import { UserChat } from "@/types/userchat.type";

const Profile: React.FC<{ userId?: string }> = ({ userId }) => {

    const { data: session } = useSession();

    const loggedInUserId = session?.user.id;

    const profileUserId = userId || loggedInUserId as string;

    const [profile, setProfile] = useState<UserProfile>();

    useEffect(() => {
        (async () => {
            const userProfile: UserProfile | null = await userService.getUserProfile(profileUserId, session?.user.accessToken);
            if(userProfile !== null) {
                const filteredProfileData = Object.fromEntries(
                    Object.entries(userProfile.profile || {})
                    .filter(([key, value]) => value !== null && value !== undefined && value !== "" && key !== "userid")
                  );
                userProfile.profile = filteredProfileData as any;
                setProfile(userProfile);
            }

        })();
    }, [profileUserId])

    const router = useRouter();

    const handleChatClick = async (): Promise<void> => {
        const chat : UserChat | null = await chatService.createChat(loggedInUserId as string, profileUserId, session?.user.accessToken as string);
        if(chat !== null) {
            router.push(`/chat/${chat.chatid}`);
        }
    };

    return (
            <>
                {loggedInUserId !== profileUserId ?
                    <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleChatClick}>
                        Chat with {profile?.firstname}
                    </button>
                    : null
                }

                <div className="flex mt2 flex-col items-center ">
                    {profile?.profile?.avatar ?
                        <img className="rounded-full h-40 w-40 items-start flex-shrink-0 mr-3" src={profile?.profile?.avatar} alt="Profile Picture"/>
                        :
                        <UserCircleIcon className="h-48 w-48 text-gray-300" aria-hidden="true" />
                    }
                    {profile?.nickname ?
                        <>
                            <h1 className="text-3xl font-bold text-gray-900  dark:text-gray-300">{profile?.nickname}</h1>
                            <h3 className="text-gray-900  dark:text-gray-300">{profile?.firstname} {profile?.lastname}</h3>
                        </>:
                            <h1 className="text-2xl font-bold text-gray-900  dark:text-gray-300">{profile?.firstname} {profile?.lastname}</h1>
                    }
                </div>

                {profile?.profile && Object.keys(profile.profile).some(key => key !== 'avatar')?
                    <>
                        {profile?.profile.description ?
                            <p className="text-gray-900  dark:text-gray-300 mx-2 sm:py-1.5 sm:text-sm sm:leading-6"><strong>Description:</strong> {profile?.profile.description}</p>
                            : null
                        }


                        <div className="flex-col p-2 flex border-t-2">
                            <p className="block text-xl font-bold leading-6 text-gray-900  dark:text-gray-300 mt-2">Details</p>
                            <div className="mt-2 flex flex-col sm:flex-row sm:justify-between">
                            {profile?.profile.education ?
                                <div className="mb-4 sm:mb-0 sm:w-1/2 sm:pr-2">
                                    <p className="block text-sm font-bold leading-6 text-gray-900  dark:text-gray-300">Education</p>
                                    <p className="text-gray-900  dark:text-gray-300 sm:text-sm sm:leading-6">{profile?.profile.education}</p>
                                </div>
                                : null
                            }
                            {profile?.profile.work ?
                                <div className="sm:w-1/2 ">
                                    <p className="block text-sm font-bold leading-6 text-gray-900  dark:text-gray-300">Work</p>
                                    <p className="text-gray-900  dark:text-gray-300 sm:text-sm sm:leading-6">{profile?.profile.work}</p>
                                </div>
                                : null
                            }
                            </div>
                            <div className="mt-2 flex flex-col sm:flex-row sm:justify-between">
                            {profile?.profile.hobby ?
                                <div className="sm:w-1/2 ">
                                    <p className="block text-sm font-bold leading-6 text-gray-900  dark:text-gray-300">Hobby's</p>
                                    <p className="text-gray-900 sm:text-sm sm:leading-6  dark:text-gray-300">{profile?.profile.hobby}</p>
                                </div>
                                : null
                            }
                            {profile?.profile.tags ?
                            <div className="mb-4 sm:mb-0 sm:w-1/2 sm:pr-2">
                                <p className="block text-sm font-bold leading-6 text-gray-900  dark:text-gray-300">Tags</p>
                                <p className="text-gray-900  dark:text-gray-300 sm:text-sm sm:leading-6">{profile?.profile.tags}</p>
                            </div>
                            : null
                            }
                            </div>
                        </div>
                    </>
                    :
                    <div className="flex-col mt-2 flex border-t-2"><p className="block text-xl font-bold leading-6 text-gray-900  dark:text-gray-300 mt-2">Details</p>
                    <p className="text-gray-700  dark:text-gray-300">This user doesn't have any information to share</p>
                    </div>
                }
            </>
    );
};

export default Profile;