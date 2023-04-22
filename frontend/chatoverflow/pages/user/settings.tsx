import { UserProfile } from '@/types/userprofile.type';
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const userSettings: React.FC = () => {

  const [user, setUser] = useState<UserProfile>();

  const { data: session } = useSession();
  const router = useRouter();
  if(!session) return (<div>Not logged in</div>);
  const loggedInUserId = session.user.id;

  useEffect(() => {
  (async () => {
    const response = await fetch(`http://localhost:3000/user/${loggedInUserId}/profile`);
    var data = await response.json();

    if(!data.hasOwnProperty('profile')) {
      const response2 = await fetch(`http://localhost:3000/profile/createprofile`, {
        method: 'POST',
        body: JSON.stringify({userid: parseInt(loggedInUserId)}),
        headers: { 'Content-Type': 'application/json' }});
  
        if(response2.ok) {
          data.profile = await response2.json();
        }
    }
    setUser(data);
  })()},[]);

  const inputRefs = Array.from({ length: 7 }).map(() => useRef<HTMLInputElement>(null));
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit : FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const [firstnameInput, lastnameInput, nicknameInput, hobbyInput, educationInput, workInput, tagsInput] = inputRefs.map((ref) => ref.current);
    const descriptionInput = descriptionRef.current;

    const response = await fetch(`http://localhost:3000/profile/update`, {
      method: 'PUT',
      body: JSON.stringify({
        userid: loggedInUserId,
        description: descriptionInput?.value,
        hobby: hobbyInput?.value,
        work: workInput?.value,
        education: educationInput?.value,
        tags: tagsInput?.value,
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    const response2 = await fetch(`http://localhost:3000/user/update`, {
      method: 'PUT',
      body: JSON.stringify({
        firstname: firstnameInput?.value,
        lastname: lastnameInput?.value,
        nickname: nicknameInput?.value,
        userid: loggedInUserId
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if(response.ok && response2.ok) {
      router.push(`/user/profile`);
      toast.success('Profile Updated!');
    }
  };

  return (
    <div className="flex justify-center py-4">
    <form className="w-11/12 sm:w-8/12" onSubmit={handleSubmit}>
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">Profile Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>
            <div className="col-span-full flex flex-col items-center">
                <div className="mt-2 flex flex-col items-center">
                    <UserCircleIcon className="h-48 w-48 text-gray-300" aria-hidden="true" />
                    <label htmlFor="photoUpload" className="mt-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm cursor-pointer hover:bg-gray-50">
                    Change
                    <input type="file" id="photoUpload" className="sr-only" />
                    </label>
                </div>
            </div>


            <div className="mt-10 flex flex-col sm:flex-row sm:justify-between">
                    <div className="mb-4 sm:mb-0 sm:w-1/2 sm:pr-2">
                        <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">First name</label>
                        <input type="text" defaultValue={user?.firstname} ref={inputRefs[0]} name="firstname" id="firstname" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    <div className="sm:w-1/2 sm:pl-2">
                        <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">Lastname</label>
                        <input type="text" defaultValue={user?.lastname} ref={inputRefs[1]} name="lastname" id="lastname" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
            </div>
            <div className="mt-4">
                <label htmlFor="nickname" className="block text-sm font-medium leading-6 text-gray-900">Nickname</label>
                <input type="text" defaultValue={user?.nickname || ""} ref={inputRefs[2]} name="nickname" id="nickname" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
            <div className="mt-4">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                <textarea name="description" defaultValue={user?.profile.description || ""} ref={descriptionRef} id="description" placeholder="Write a few sentences about yourself" className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"/>
            </div>

            <div className="mt-4">
                <label htmlFor="hobby" className="block text-sm font-medium leading-6 text-gray-900">Hobby</label>
                <input type="text" defaultValue={user?.profile.hobby || ""} ref={inputRefs[3]} name="hobby" id="hobby" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row sm:justify-between">
                    <div className="mb-4 sm:mb-0 sm:w-1/2 sm:pr-2">
                        <label htmlFor="education" className="block text-sm font-medium leading-6 text-gray-900">Education</label>
                        <input type="text" defaultValue={user?.profile.education || ""} ref={inputRefs[4]} name="education" id="education" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    <div className="sm:w-1/2 sm:pl-2">
                        <label htmlFor="work" className="block text-sm font-medium leading-6 text-gray-900">Work</label>
                        <input type="text" defaultValue={user?.profile.work || ""} ref={inputRefs[5]} name="work" id="work" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
            </div>

            <div className="mt-4">
                <label htmlFor="tags" className="block text-sm font-medium leading-6 text-gray-900">Tags</label>
                <input type="text" defaultValue={user?.profile.tags || ""} ref={inputRefs[6]} name="tags" id="tags" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
        </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link className="text-sm font-semibold leading-6 text-gray-900" href={'/user'}>
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
