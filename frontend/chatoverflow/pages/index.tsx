'use client'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEventHandler, useState } from 'react';


const Home: React.FC = () => {

    const [user, setUser] = useState({email: '', password : ''})
    const [errors, setErrors] = useState<string[]>([]);

    const { data: session} = useSession();
    const router = useRouter(); 
    if(session) router.push('/user');

    const handleSubmit : FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const response = await signIn('email-login', {
            email: user.email,
            password: user.password,
            redirect: false,
            callbackUrl: "/user"
        });


        if (response === undefined || response.error) {
            setErrors(["Email or password are incorrect"]);
        } 
    };



  return (<>
  <section className="bg-gradient-to-r from-gray-50 to-gray-200">
      <div className="flex flex-col items-center justify-center  mx-auto h-screen lg:py-0 sm:mx-0 mx-4">
          <h1 className="flex items-center mb-6 text-5xl font-semibold">ChatOverflow</h1>
          <div className="w-full bg-white rounded-lg shadow border sm:max-w-xl xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                      Sign in to your account
                  </h1>
                  {errors.length > 0 && (

                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                          <strong className="font-bold">Oops! </strong>
                          {errors.map((error, key) => (
                              <span key={key} className="block sm:inline">{error}</span>
                          ))}
                          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                              <svg className="fill-current h-6 w-6 text-red-500" role="button" onClick={() => setErrors([])} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                          </span>
                      </div>
                  )}
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium ">Your email</label>
                          <input type="email" name="email" id="email" onChange={({ target }) => setUser({ ...user, email: target.value })} className="border sm:text-sm rounded-lg block w-full p-2.5 " placeholder="name@company.com" />
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                          <input type="password" name="password" id="password" onChange={({ target }) => setUser({ ...user, password: target.value })} placeholder="*****" className="border sm:text-sm rounded-lg block w-full p-2.5" />
                      </div>
                      <button type="submit" className="w-full text-white bg-gradient-to-l hover:from-cyan-600 hover:to-blue-600 from-cyan-500 to-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                      <p className="text-sm font-light text-blue-600">
                          Don’t have an account yet? <a href="/auth" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                      </p>
                  </form>
              </div>
          </div>
      </div>
  </section></>

)}; 
  export default Home;