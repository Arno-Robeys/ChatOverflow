import { useSession } from "next-auth/react";
import { UserCircleIcon } from '@heroicons/react/24/solid'

const Profile: React.FC<{ userId?: string | string[] }> = ({ userId }) => {

    const { data: session } = useSession();
    
    const loggedInUserId = session?.user.id;

    const profileUserId = userId || loggedInUserId;

    return (
        <div>
            <div className="col-span-full flex flex-col items-center">
                <div className="mt-2 flex flex-col items-center">
                    <UserCircleIcon className="h-48 w-48 text-gray-300" aria-hidden="true" />
                    <h1>Profile for user with ID {profileUserId}</h1>
                </div>
            </div>
        </div>  
    );
};

export default Profile;