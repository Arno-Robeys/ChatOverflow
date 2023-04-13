import React from 'react'

const Chat: React.FC<{ chatId: string}> = ({ chatId }) => {
  return (
    <div>Chat with chatid: {chatId}</div>
  )
}

export default Chat