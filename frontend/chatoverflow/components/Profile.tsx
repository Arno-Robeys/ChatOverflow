import { useSession } from "next-auth/react";
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from "react";
import { UserProfile } from "@/types/userprofile.type";

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

    
    return (
            <div className="col-span-full flex flex-col">
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
                        <h1 className="text-2xl font-bold text-gray-900">About me</h1>
                    </>
                    :
                    <h1 className="text-2xl font-bold text-gray-900">This user doesn't have a profile yet</h1>
                    }

            </div> 
    );
};

export default Profile;