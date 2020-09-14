import React from 'react';

const Navigation = () => (
  <nav className='nav'>
    <a href='/' className='nav__link'>
      Twitch Chat App
    </a>
    <a
      href='https://github.com/klimenkosergei/twitch-chat-app'
      target='_blank'
      rel='noopener noreferrer'
      className='nav__link'
    >
      <svg className='nav__link-icon'>
        <use href='/img/sprite.svg#github'></use>
      </svg>
      View on GitHub
    </a>
  </nav>
);

export default Navigation;
