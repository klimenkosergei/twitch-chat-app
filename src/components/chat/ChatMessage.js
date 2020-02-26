import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ChatMessage = ({
  chatMessage: { user, emotes, content, type },
  chatBadges
}) => {
  const [badges, setBadges] = useState([]);
  const [message, setMessage] = useState(content);

  useEffect(() => {
    try {
      if (user.badges && chatBadges) {
        user.badges.forEach(badge => {
          if (badge.type === 'subscriber') {
            setBadges(prevState => [
              ...prevState,
              chatBadges.sub[badge.type][badge.version].image_url_1x
            ]);
          } else {
            setBadges(prevState => [
              ...prevState,
              chatBadges.global[badge.type][badge.version].image_url_1x
            ]);
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line
  }, [chatBadges]);

  useEffect(() => {
    if (emotes) {
      try {
        const formattedMessage = [];
        let curPos = 0;
        emotes.forEach(({ id, position }, index) => {
          const start = parseInt(position[0]);
          const end = parseInt(position[1]);
          formattedMessage.push(content.slice(curPos, start));
          formattedMessage.push(
            <img
              className='chat__message__emote'
              alt='emote'
              src={`https://static-cdn.jtvnw.net/emoticons/v1/${id}/1.0`}
            />
          );
          if (index === emotes.length - 1) {
            // Last emote, push the rest of the message
            formattedMessage.push(content.slice(end + 1));
          }
          curPos = end + 1;
        });
        const content_ = (
          <span>
            {formattedMessage.map((msg, index) => (
              <Fragment key={index}>{msg}</Fragment>
            ))}
          </span>
        );
        setMessage(content_);
      } catch (err) {
        console.error(content, err);
      }
    }
    // eslint-disable-next-line
  }, []);

  if (type === 'info') {
    return (
      <div className='chat__message chat__message--info'>
        {message}{' '}
        <span className='chat__message__user'>{user.displayName}</span>
      </div>
    );
  } else {
    return (
      <div className='chat__message'>
        <span>
          {badges.length > 0 &&
            badges.map(badge => (
              <img
                key={badge}
                className='chat__message__badge'
                src={badge}
                alt='chat badge'
              />
            ))}
        </span>
        <span className='chat__message__user' style={{ color: user.color }}>
          {user.displayName}
        </span>
        <span>: </span>
        {message}
      </div>
    );
  }
};

ChatMessage.propTypes = {
  chatMessage: PropTypes.object.isRequired,
  chatBadges: PropTypes.object.isRequired
};

export default ChatMessage;
