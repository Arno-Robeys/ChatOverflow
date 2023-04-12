import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Chat from "@/components/Chat";
import SideBar from "@/components/Sidebar";
import Profile from "@/components/Profile";

const UserHome: React.FC = () => {
    const { data: session } = useSession();

    const router = useRouter();
    const { id } = router.query;

    return (
        // main container
        <div className='w-screen h-screen overflow-hidden'>
            {/* 2 components */}
                <div className="flex flex-wrap bg-[#ffffff] h-screen">
                    <div className=" border min-w-[340px] max-w-[500] w-100 h-100 bg-gray-50">
                        <SideBar/>
                    </div>
                    
                    <div className=" min-w-[415px] max-w-[1120px] w-100 h-100 p-4">
                        <h1>Account ingelogd Name: {session?.user.name} - Email: {session?.user.email} - Userid: {session?.user.id}</h1>
                    </div>
                    </div>
                
            </div>
    );
};

export default UserHome;
