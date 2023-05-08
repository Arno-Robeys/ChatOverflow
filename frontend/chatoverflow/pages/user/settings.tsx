import { UserProfile } from '@/types/userprofile.type';
import { Disclosure, Transition } from '@headlessui/react'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEventHandler, Fragment, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { WithContext as ReactTags, Tag } from 'react-tag-input';

const userSettings: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if(!session) return null;
  const loggedInUserId = session.user.id;

  const [user, setUser] = useState<UserProfile>();
  const [tags, setTags] = useState<Tag[]>([]);
  const inputRefs = Array.from({ length: 6 }).map(() => useRef<HTMLInputElement>(null));
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const avatars = require.context('../../public/avatars/', true, /^\.\/.*\.png$/).keys().filter((path: string) => path.startsWith('./')).map((path: string) => '/avatars' + path.substring(1))

  useEffect(() => {
  (async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/user/${loggedInUserId}/profile`, {method: 'GET', headers: {'Content-Type': 'application/json', 'authorization': `bearer ${session?.user.accessToken}`}});
    var data = await response.json();
    setUser(data);
    setSelectedAvatar(data?.profile?.avatar);
    setTags(data?.profile?.tags?.split(", ").map((tag: string) => {
          if (!tag.trim()) return null;
          return { id: tag, text: tag };
        }).filter((tag: string) => tag !== null));
  })()},[]);

  const handleSubmit : FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const [firstnameInput, lastnameInput, nicknameInput, hobbyInput, educationInput, workInput] = inputRefs.map((ref) => ref.current);
    const descriptionInput = descriptionRef.current;

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/user/update`, {
      method: 'PUT',
      body: JSON.stringify({
        firstname: firstnameInput?.value,
        lastname: lastnameInput?.value,
        nickname: nicknameInput?.value,
        profile: {  
          description: descriptionInput?.value,
          avatar: selectedAvatar,
          hobby: hobbyInput?.value,
          work: workInput?.value,
          education: educationInput?.value,
          tags: tags.map((tag: any) => tag.text).join(', '),
        },
        userid: loggedInUserId
      }),
      headers: { 'Content-Type': 'application/json', 'authorization': `bearer ${session?.user.accessToken}` }});

    if(response.ok) {     
      sessionStorage.setItem('avatar', selectedAvatar as string);
      router.push(`/user/profile`);
      toast.success('Profile Updated!');
    } else {
      toast.error((await response.json()).errorMessage);
    }
  };

  const handleDelete = (i: any) => {
    setTags(tags.filter((tag: any, index: any) => index !== i));
  };

  const handleAddition = (tag: any) => {
    if(tag.text.length > 30) return;
    setTags([...tags, tag]);
  };

  useEffect(() => {
    setUser({...user as UserProfile, profile: {...user?.profile as any, avatar: selectedAvatar}});
  }, [selectedAvatar]);

  
  return (
    <div className="flex justify-center py-4  dark:bg-gray-800  dark:text-gray-300">
    <form className="w-11/12 sm:w-8/12" onSubmit={handleSubmit}>
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900  dark:bg-gray-800  dark:text-gray-300">Profile Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600  dark:bg-gray-800  dark:text-gray-300">
            This information will be displayed publicly so be careful what you share.
          </p>
            <div className="col-span-full flex flex-col items-center">
              <Disclosure>
                {({ open }) => (
                  <>
                    <img src={user?.profile?.avatar ? user.profile.avatar : "/default-avatar.png"} alt="avatar" className="h-40 w-40 rounded-full" />   
                    <Disclosure.Button  className="mt-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm"> 
                  {open ? (
                    <>
                      <div>Profile Avatars</div>
                      <Transition as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <Disclosure.Panel className="rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 mt-2">
                        <div className="flex flex-wrap justify-center">
                        {avatars.map((avatar, index) => (
                          <img key={index} src={avatar} alt="avatar" className="h-20 w-20 rounded-full m-2 cursor-pointer" onClick={() => setSelectedAvatar(avatar)} />
                        ))}
                      </div>
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  ) : (
                    <div>Chose Avatar</div>
                  )}
                </Disclosure.Button>
                  </>
                )}
              </Disclosure>
            </div>


            <div className="mt-10 flex flex-col sm:flex-row sm:justify-between">
                    <div className="mb-4 sm:mb-0 sm:w-1/2 sm:pr-2">
                        <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900  dark:text-gray-300">First name</label>
                        <input type="text" defaultValue={user?.firstname} ref={inputRefs[0]} name="firstname" id="firstname" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    <div className="sm:w-1/2 sm:pl-2">
                        <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">Lastname</label>
                        <input type="text" defaultValue={user?.lastname} ref={inputRefs[1]} name="lastname" id="lastname" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
            </div>
            <div className="mt-4">
                <label htmlFor="nickname" className="block text-sm font-medium leading-6 text-gray-900  dark:text-gray-300">Nickname</label>
                <input type="text" defaultValue={user?.nickname || ""} ref={inputRefs[2]} name="nickname" id="nickname" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
            <div className="mt-4">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900  dark:text-gray-300">Description</label>
                <textarea name="description" defaultValue={user?.profile.description || ""} ref={descriptionRef} id="description" placeholder="Write a few sentences about yourself" className="block w-full h-36 sm:h-24 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"/>
            </div>

            <div className="mt-4">
                <label htmlFor="hobby" className="block text-sm font-medium leading-6 text-gray-900  dark:text-gray-300">Hobby</label>
                <input type="text" defaultValue={user?.profile.hobby || ""} ref={inputRefs[3]} name="hobby" id="hobby" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row sm:justify-between">
                    <div className="mb-4 sm:mb-0 sm:w-1/2 sm:pr-2">
                        <label htmlFor="education" className="block text-sm font-medium leading-6 text-gray-900  dark:text-gray-300">Education</label>
                        <input type="text" defaultValue={user?.profile.education || ""} ref={inputRefs[4]} name="education" id="education" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    <div className="sm:w-1/2 sm:pl-2">
                        <label htmlFor="work" className="block text-sm font-medium leading-6 text-gray-900  dark:text-gray-300">Work</label>
                        <input type="text" defaultValue={user?.profile.work || ""} ref={inputRefs[5]} name="work" id="work" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
            </div>

            <div className="mt-4">
                <label htmlFor="tags" className="block text-sm font-medium leading-6 text-gray-900  dark:text-gray-300">Tags</label>
                <ReactTags tags={tags} autofocus={false} delimiters={[188, 13]} handleDelete={handleDelete} handleAddition={handleAddition} inputFieldPosition="top" maxLength={30} classNames={{tagInputField: 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6', tag: "mr-1.5 p-1 rounded-md bg-gray-200 text-gray-900", selected: "mt-3"}}/>
            </div>
        </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link className="text-sm font-semibold leading-6 text-gray-900  dark:text-gray-300" href={'/user'}>
          Cancel
        </Link>
        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Save
        </button>
      </div>
    </form>
    </div>
  )
}
export default userSettings;
