import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import toast from 'react-hot-toast';
import React from 'react'
import SideBar from './Sidebar'
import moment from 'moment';
import { pusher } from '@/pusher'
import { notification } from '@/types/notification.type'
import { log } from 'console'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Navbar: React.FC = () => {

  const router = useRouter();
  const {data: session} = useSession();
  const [notifications, setNotifications] = useState<notification[]>([]);
  
  const logout = async () => {
    await signOut({
      redirect: false,
    });
    sessionStorage.removeItem('avatar');
    router.push('/');
    toast.success('Logged out successfully');
  }

  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  const [darkMode, setDarkMode] = useState(() => {
    const storedValue = localStorage.getItem('darkMode');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  useEffect(() => {
    const body = document.querySelector('div');
    if (darkMode) {
        body.classList.add('dark');
    } else {
        body.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
}, [darkMode]);

  useEffect(() => {
    if(session) {
      refreshNotifications();
      const channel = pusher.subscribe(`notification-${session?.user.id}`);
      channel.bind('notification', (data: any) => {
        refreshNotifications();
      });
    }
  }, [session]);

  
 

  
  

  const refreshNotifications = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/notification/user/${session?.user.id}`, {method: 'GET', headers: {'Content-Type': 'application/json', 'authorization': `bearer ${session?.user.accessToken}`}});
    if(response.ok) {
      const data = await response.json();
      setNotifications(data);
    } else if(response.status === 401) {
      logout();
    }
  }

  const markAsRead = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/notification/read/${session?.user.id}`, {method: "PUT", headers: {'Content-Type': 'application/json', 'authorization': `bearer ${session?.user.accessToken}`}});
    if(response.ok) {
      toast.success('Marked all as read');
    } else {
      toast.error('Something went wrong');
    }
  }

  return (
    <Disclosure as="nav" className="border-b-4 dark:bg-gray-800  dark:text-gray-300 dark:border-blue-900">
      {({ open }) => (
        <>
          <div className="px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button onClick={() => setIsOpen(isOpen => !isOpen)} className="inline-flex dark:items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {isOpen ? (
                    <><XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      <Transition as={Fragment} appear show={isOpen}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <Disclosure.Panel onClick={(e) => e.stopPropagation()} className="fixed inset-0 z-50 top-16 mt-1 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <SideBar method={closeModal} />
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <a href="/user" className="flex items-center pl-2">
                    <img
                      className="h-8 w-auto lg:block"
                      src="/logo.png"
                      alt="Logo"/><span className='pl-1 md:pl-2'>ChatOverflow</span></a>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => setDarkMode(!darkMode)}>
  {darkMode ? (
    <SunIcon className="w-6 h-6" />
  ) : (
    <MoonIcon className="w-6 h-6" />
  )}
</button>

                <Menu as="div" className="relative ml-3">

                  <div>
                    <Menu.Button className="p-1 rounded-full text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-200">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                      {notifications.length > 0 && <div className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"/>}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-1 z-10 mt-2 w-72 origin-top-right rounded-md bg-white dark:bg-gray-700  dark:text-gray-400 py-1 shadow-lg max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      <>
                        {notifications.map((notification, index) => (
                          <Menu.Item key={index}>
                            <div className="flex items-center px-4 py-3 border-b hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800  dark:text-gray-400">
                              <p className="text-gray-600 dark:bg-gray-800  dark:text-gray-300 text-sm mx-2">
                                <span className="font-bold">{notification?.message?.user?.firstname}</span> sent you a message · {moment(notification?.message?.time).format('HH:mm DD/MM/YYYY')}
                              </p>
                            </div>
                          </Menu.Item>
                        ))}
                        <Menu.Item>
                          <div className="flex items-center justify-center p-1 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <button onClick={() => markAsRead()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-8 rounded">
                              Mark as read
                            </button>
                          </div>
                        </Menu.Item>
                      </>
                    ) : (
                      <Menu.Item>
                        <a href="#" className="flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700">
                          <p className="text-gray-600 dark:text-gray-300  text-md mx-2">No notifications</p>
                        </a>
                      </Menu.Item>
                    )}
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full text-sm">
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full" src={sessionStorage.getItem('avatar') ?? "/default-avatar.png"} alt="Avatar"/>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/user/profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/user/settings"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={logout}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
};
export default Navbar;