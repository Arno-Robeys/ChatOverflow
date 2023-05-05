import { useSession } from "next-auth/react";
import SideBar from "@/components/Sidebar";
import { useEffect } from "react";

const UserHome: React.FC = () => {
    const { data: session } = useSession();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/user/${session?.user.id}/profile`, { method: 'GET', headers: { 'Content-Type': 'application/json', 'authorization': `bearer ${session?.user.accessToken}` } });
            const data = await response.json();
            sessionStorage.setItem('avatar', data.profile.avatar ?? '/default-avatar.png');
        }
        fetchData();
    }, [session?.user.id]);


    return (
        // main container
        <div className='overflow-hidden'>
            {/* 2 components */}
            <div className="flex flex-wrap bg-[#ffffff] h-screen">
                <div className="border min-w-[300px] max-w-[500] bg-gray-50 hidden sm:block">
                    <SideBar />
                </div>

                <div className="flex-grow w-min max-w-[1820px] py-4 p-2 md:p-4">
                    <div className="flex justify-center">
                        <h1 className="text-2xl mb-4">Welkom {session?.user.name} bij <span className="font-bold">ChatOverflow!</span></h1>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default UserHome;
