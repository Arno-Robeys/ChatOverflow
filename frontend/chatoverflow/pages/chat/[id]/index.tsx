import { useRouter } from "next/router";
import Chat from "@/components/Chat";
import SideBar from "@/components/Sidebar";


const ChatPage: React.FC = () => {

  const router = useRouter();
  const { id } = router.query;

    return (
            // main container
            <div className='overflow-hidden'>
                {/* 2 components */}
                    <div className="flex flex-wrap bg-[#ffffff] h-screen">
                        <div className=" border min-w-[340px] max-w-[500] bg-gray-50">
                            <SideBar/>
                        </div>
                        
                        <div className="flex-grow min-w-[415px] max-w-[1820px]">
                            <Chat chatId={id as string}/>
                        </div>
                    </div>
                    
                </div>
    );
};


export default ChatPage;
