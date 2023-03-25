

const Home: React.FC = () => {
  return (
<section className="bg-gradient-to-r from-gray-50 to-gray-200">
  <div className="flex flex-col items-center justify-center  mx-auto h-screen lg:py-0 sm:mx-0 mx-4">
      <h1 className="flex items-center mb-6 text-5xl font-semibold">ChatOverflow</h1>
      <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-xl xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium ">Your email</label>
                      <input type="email" name="email" id="email" className="border sm:text-sm rounded-lg block w-full p-2.5 " placeholder="name@company.com" />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                      <input type="password" name="password" id="password" placeholder="*****" className="border sm:text-sm rounded-lg block w-full p-2.5" />
                  </div>
                  <button type="submit" className="w-full text-white bg-gradient-to-l hover:from-cyan-600 hover:to-blue-600 from-cyan-500 to-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p className="text-sm font-light text-blue-600">
                      Don’t have an account yet? <a href="/auth" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>



  )}; 
  export default Home;