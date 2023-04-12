import React from 'react'

const Chats: React.FC = () => {
  return (
    <section className="flex flex-col antialiased bg-gray-50 text-gray-600 min-h-screen">
    <div className="h-full">
            <div className="py-3 px-5">
                <h3 className="text-xs font-semibold uppercase text-gray-400 mb-1">Chats</h3>
                <div className="divide-y divide-gray-200">
                    <button className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50 hover:bg-gray-100">
                        <div className="flex items-center">
                            <img className="rounded-full items-start flex-shrink-0 mr-3" width="32" height="32" alt="Marie Zulfikar" />
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900">Arno</h4>
                                <div className="text-[13px]">Doebadoebadoe · 2hrs</div>
                            </div>
                        </div>
                    </button>
                    <button className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50 hover:bg-gray-100">
                        <div className="flex items-center">
                            <img className="rounded-full items-start flex-shrink-0 mr-3" width="32" height="32" alt="Nhu Cassel" />
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900">Gerald</h4>
                                <div className="text-[13px]">Hey 👋, · 24 Mar</div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
    </div>
</section>
  )
}
export default Chats