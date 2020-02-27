import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import PropTypes from 'prop-types';

import { openConnection, joinChat } from '../../actions/chat';
import ChatMessage from './ChatMessage';
import { themeColors } from '../../utils/themeColors';

const ChatBody = ({ chat, openConnection, joinChat }) => {
  const messagesEndRef = useRef(null);
  const chatBody = useRef(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatBadges, setChatBadges] = useState(null);
  const [autoScroll, setAutoScroll] = useState(true);

  // Auto scroll view when messages post or auto scroll renabled
  useEffect(() => {
    if (autoScroll) {
      messagesEndRef.current.scrollIntoView({ block: 'nearest' });
    }
  }, [chatMessages, autoScroll]);

  // Set new chat badges
  useEffect(() => {
    setChatBadges(chat.badges);
  }, [chat.badges]);

  // Set new messages
  useEffect(() => {
    setChatMessages(chat.messages);
  }, [chat.messages]);

  useEffect(() => {
    if (chat.status === 'connected') {
      if (chat.channel) {
        joinChat(chat.channel);
      }
    } else {
      openConnection();
    }
    if (chat.status === 'connected' && chatBody) {
      chatBody.current.addEventListener('scroll', onScroll);
    }
    // eslint-disable-next-line
  }, [chat.status, chat.channel]);

  useEffect(() => {
    const theme = themeColors[chat.theme];
    Object.keys(theme).forEach(key => {
      const value = theme[key];
      document.documentElement.style.setProperty(key, value);
    });
  }, [chat.theme]);

  const onScroll = e => {
    const scrollableHeight = e.target.scrollTop + 650;
    const scrollableBody = e.target.children[0].offsetHeight;
    if (scrollableBody - scrollableHeight > 250) {
      // Stop auto scroll when scrolled over 250px up
      setAutoScroll(false);
    } else {
      setAutoScroll(true);
    }
  };

  const onSetAutoScroll = () => {
    setAutoScroll(true);
  };

  return (
    <div className='chat__body'>
      <SimpleBar
        style={{ height: '100%' }}
        scrollableNodeProps={{ ref: chatBody }}
      >
        {chatMessages.map(message => (
          <ChatMessage
            key={message.id}
            chatMessage={message}
            chatBadges={chatBadges}
          />
        ))}
        <div className='scroll-trigger' ref={messagesEndRef}></div>
      </SimpleBar>
      {!autoScroll && (
        <div className='chat__scroll-notification'>
          <button className='chat__scroll-button' onClick={onSetAutoScroll}>
            Resume Auto-Scroll
          </button>
        </div>
      )}
    </div>
  );
};

ChatBody.propTypes = {
  chat: PropTypes.object.isRequired,
  openConnection: PropTypes.func.isRequired,
  joinChat: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ chat: state });
const ConnectedChatBody = connect(mapStateToProps, {
  openConnection,
  joinChat
})(ChatBody);

export { ChatBody, ConnectedChatBody as default };
