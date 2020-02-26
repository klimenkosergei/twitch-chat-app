import React from 'react';

import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';

const StreamChat = () => {
  return (
    <div className='chat'>
      <ChatHeader title='stream chat' />
      <ChatBody />
    </div>
  );
};

export default StreamChat;
