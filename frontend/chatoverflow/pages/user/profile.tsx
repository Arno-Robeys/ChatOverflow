import { useRouter } from "next/router";
import SideBar from "@/components/Sidebar";
import Profile from "@/components/Profile";


const ProfilePage: React.FC = () => {

  const router = useRouter();
  const { id } = router.query;

    return (
        // main container
        <div className='h-screen overflow-hidden flex'>
            {/* 2 components */}
                    <div className="border min-w-[340px] max-w-[500] bg-gray-50">
                        <SideBar/>
                    </div>
                    
                    <div className="flex-grow min-w-[415px] max-w-[1820px] pt-4 pl-4">
                      <Profile userId={id}/>
                    </div>
                
            </div>
    );
};


export const getServerSideProps = async (context: { query?: any; }) => {
  const { userId } = context.query;
  return userId ? { props: { userId } } : { props: {} };
};


export default ProfilePage;
