import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

const AuthWrapper = ({ children }: PropsWithChildren) => {
  const { data: session, status } = useSession();

  if(status === "loading") return <div>Loading...</div>
 
  if (!session) {
    const router = useRouter();
    router.push("/401");
    return null;
  } else {
    return <>{children}</>;
  }
};

export default AuthWrapper;
