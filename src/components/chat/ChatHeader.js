import React from 'react';
import PropTypes from 'prop-types';

const ChatHeader = ({ title }) => (
  <div className='chat__header'>
    <button className='chat__header__btn'>
      <svg className='chat__header__btn__icon'>
        <use href='/img/sprite.svg#collapse'></use>
      </svg>
    </button>
    <h5 className='chat__header__label'>{title}</h5>
    <button className='chat__header__btn'>
      <svg className='chat__header__btn__icon'>
        <use href='/img/sprite.svg#users'></use>
      </svg>
    </button>
  </div>
);

ChatHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default ChatHeader;
