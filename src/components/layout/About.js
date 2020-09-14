import React from 'react';

const About = () => (
  <div className='about'>
    <h1 className='about__header'>About</h1>
    <div className='about__tech'>
      <div className='about__tech__label'>Tech stack</div>
      <div className='about__tech__icons'>
        <svg className='about__tech__icon about__tech__icon--react'>
          <use href='/img/sprite.svg#react'></use>
        </svg>
        <svg className='about__tech__icon about__tech__icon--redux'>
          <use href='/img/sprite.svg#redux'></use>
        </svg>
        <svg className='about__tech__icon about__tech__icon--sass'>
          <use href='/img/sprite.svg#sass'></use>
        </svg>
      </div>
    </div>
    <div className='about__description'>
      <div className='about__description__label'>Описание</div>
      <p className='about__description__content'>
        The idea of this app was to create a chat similar to the one you can
        find on{' '}
        <a
          href='https://twitch.tv'
          target='_blank'
          rel='noopener noreferrer'
          className='about__description__link'
        >
          Twitch.tv
        </a>
        <br />
        <br />
        In this project I've used React, Redux and Sass. On the right from the
        chat there are options to change color theme, and join a chat of a
        specific channel. Clicking on the "Random" button selects a random
        twitch channel from Top-10 live at that moment.
        <br />
        <br />
        The chat works through Websocket. By default chat auto scrolls. That can
        be cancelled by scrolling manually. To resume auto-scroll you can either
        scroll the chat back to the beginning or click "Resume Auto-Scroll"
        button.
      </p>
    </div>
  </div>
);

export default About;
