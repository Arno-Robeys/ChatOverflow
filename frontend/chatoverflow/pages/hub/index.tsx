import Search from "@/components/Search";
import Sidebar from "@/components/Sidebar";
import { useSession } from "next-auth/react";
import Chat from "@/components/Chat";

const Hub: React.FC = () => {
    const { data: session } = useSession();

    return (
        // main container
        <div className='w-screen h-screen overflow-hidden'>
            {/* 2 components */}
                <div className="flex flex-wrap bg-[#ffffff] h-screen">
                    <div className=" border min-w-[340px] max-w-[500] w-100 h-100 bg-slate-200">
                        <Sidebar/>
                    </div>
                    
                    <div className=" min-w-[415px] max-w-[1120px] w-100 h-100">
                        <h1>Account ingelogd Name: {session?.user.name} - Email: {session?.user.email} - Userid: {session?.user.id}</h1>
                        <Chat/>
                    </div>
                    </div>
                
                
            </div>
    );
};

export default Hub;
