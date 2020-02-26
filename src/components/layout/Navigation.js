import React from 'react';

const Navigation = () => (
  <nav className='nav'>
    <a href='/' className='nav__link'>
      &larr; Назад
    </a>
    <a
      href='https://github.com/klimenkosergey/twitch-chat-app'
      target='_blank'
      rel='noopener noreferrer'
      className='nav__link'
    >
      <svg className='nav__link-icon'>
        <use href='/img/sprite.svg#github'></use>
      </svg>
      Посмотреть на GitHub
    </a>
  </nav>
);

export default Navigation;
