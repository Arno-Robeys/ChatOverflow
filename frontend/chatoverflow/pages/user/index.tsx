import { useSession } from "next-auth/react";

const UserHome: React.FC = () => {
    const { data: session } = useSession();

    return (
        <div>
            <h1>Account ingelogd Name: {session?.user.name} - Email: {session?.user.email} - Userid: {session?.user.id}</h1>
        </div>
    );
};

export default UserHome;
