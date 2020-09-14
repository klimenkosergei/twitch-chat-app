import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setChatChannel, leaveChat, setChatTheme } from '../../actions/chat';

const ChatControls = ({ chat, setChatChannel, setChatTheme, leaveChat }) => {
  const [channel, setChannel] = useState(chat.channel);

  const onThemeToggle = () => {
    chat.theme === 'dark' ? setChatTheme('light') : setChatTheme('dark');
  };

  const onChannelInput = (e) => {
    setChannel(e.target.value.toLowerCase());
  };

  // Get random channel out of top 10 english streams
  const onGetRandomChannel = async () => {
    try {
      const res = await fetch(
        'https://api.twitch.tv/kraken/streams?limit=11&language=en',
        {
          headers: {
            'Client-ID': 'j46qoylsjcttr5w0ytzq96pyrtuqyd',
            accept: 'application/vnd.twitchtv.v5+json',
          },
        }
      );
      const data = await res.json();
      const randomNumber = Math.floor(Math.random() * 10);
      const channel = data.streams[randomNumber].channel.name;
      setChannel(channel.toLowerCase());
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (chat.channel !== channel && channel !== '') {
      leaveChat(chat.channel);
      setChatChannel(channel);
    }
  };

  return (
    <div className='controls'>
      {chat.error && <div className='controls__error'>{chat.error}</div>}
      <h2 className='controls__header'>Chat Controls</h2>
      <form onSubmit={onSubmit} className='controls__form'>
        <div className='controls__group'>
          <div className='controls__label'>Dark Theme</div>
          <div className='controls__toggle'>
            <input
              className='controls__checkbox'
              type='checkbox'
              onChange={onThemeToggle}
              checked={chat.theme === 'dark'}
              id='theme-toggle'
            />
            <label htmlFor='theme-toggle' className='controls__button'></label>
          </div>
        </div>
        <div className='controls__group'>
          <label className='controls__label' htmlFor='channel'>
            Channel
          </label>
          <div className='controls__input-group'>
            <input
              id='channel'
              type='text'
              value={channel}
              className='controls__input'
              onChange={onChannelInput}
            />
            <button
              type='button'
              className='controls__btn'
              onClick={onGetRandomChannel}
            >
              Random
            </button>
          </div>
        </div>
        <div className='controls__group'>
          <button
            type='submit'
            disabled={channel === ''}
            className='controls__btn controls__submit'
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

ChatControls.propTypes = {
  chat: PropTypes.object.isRequired,
  setChatChannel: PropTypes.func.isRequired,
  setChatTheme: PropTypes.func.isRequired,
  leaveChat: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ chat: state });

const ConnectedChatControls = connect(mapStateToProps, {
  leaveChat,
  setChatChannel,
  setChatTheme,
})(ChatControls);

export { ChatControls, ConnectedChatControls as default };
