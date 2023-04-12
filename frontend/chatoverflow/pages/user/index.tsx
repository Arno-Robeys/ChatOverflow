import Sidebar from "@/components/Sidebar";
import { useSession } from "next-auth/react";

const UserHome: React.FC = () => {
    const { data: session } = useSession();

    return (
        <div className='home'>
            <div className='flex flex-wrap'>
                <Sidebar/>
                <div className='w-3/5'>
                <h1>Account ingelogd Name: {session?.user.name} - Email: {session?.user.email} - Userid: {session?.user.id}</h1>
                    </div>
            </div>
        </div>
    );
};

export default UserHome;
