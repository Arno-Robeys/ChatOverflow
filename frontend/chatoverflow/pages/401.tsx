import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';

const Error401: React.FC = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const handleLogin = () => {
        if(session) {
            signOut(
                {
                    callbackUrl: "/",
                }
            );
            return;
        } else {
         router.push("/")   
        }
    };

  return (<>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">401 Unauthorized</h1>
            <p className="mb-4">Please Login first before going further</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogin}>
              Go to login page
            </button>
        </div>
</>)}; 
  export default Error401;