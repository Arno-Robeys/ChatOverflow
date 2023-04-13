import { useRouter } from "next/router";
import Chat from "@/components/Chat";
import SideBar from "@/components/Sidebar";


const ChatPage: React.FC = () => {

  const router = useRouter();
  const { id } = router.query;

    return (
        // main container
        <div className='h-screen overflow-hidden flex'>
            {/* 2 components */}
                    <div className=" border min-w-[340px] max-w-[500] w-100 h-100 bg-gray-50">
                        <SideBar/>
                    </div>
                    
                    <div className="flex-grow min-w-[415px] max-w-[1820px] w-100 h-100 py-4 pl-4">
                        <Chat chatId={id as string}/>
                    </div>
                
            </div>
    );
};


export default ChatPage;
