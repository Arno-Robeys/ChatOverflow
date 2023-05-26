import { useSession } from "next-auth/react";
import SideBar from "@/components/Sidebar";
import { useEffect } from "react";
import userService from "@/service/userService";
import { UserProfile } from "@/types/userprofile.type";

const UserHome: React.FC = () => {
    const { data: session } = useSession();  

    return (
        // main container
        <div className='overflow-hidden dark:bg-gray-800  dark:text-gray-300 dark:border-blue-900'>
            {/* 2 components */}
            <div className="flex flex-wrap bg-[#ffffff] h-screen  dark:border-blue-900">
                <div className="border min-w-[300px] max-w-[500] bg-gray-50 dark:border-blue-900 dark:text-gray-300 hidden sm:block">
                    <SideBar />
                </div>

                <div className="flex-grow w-min max-w-[1820px] py-4 p-2 md:p-4  dark:bg-gray-800">
                    <div className="flex justify-center">
                        <h1 className="text-2xl mb-4">Welkom {session?.user.name} bij <span className="font-bold">ChatOverflow!</span></h1>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default UserHome;
