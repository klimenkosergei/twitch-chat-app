import React from 'react';

const About = () => (
  <div className='about'>
    <h1 className='about__header'>About</h1>
    <div className='about__tech'>
      <div className='about__tech__label'>Технологии</div>
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
        Идея приложения заключалась в том, чтобы реализовать чат аналогичный
        чату на сайте{' '}
        <a
          href='https://twitch.tv'
          target='_blank'
          rel='noopener noreferrer'
          className='about__description__link'
        >
          Twitch.tv
        </a>
        <br />
        <br />В проекте использовались React, Redux и Sass. Справа от чата
        находятся: опция изменения цветовой схемы, и присоединение к чату
        заданного канала. Нажатие на кнопку "Random" выбирает случайный топ-10
        канал с Twitch API.
        <br />
        <br />
        Работа чата происходит через Websocket. По умолчанию сообщения чата
        автоматически прокручиваются. Это можно отменить скроллингом. Для
        возобновления автоматического скроллинга можно либо прокрутить чат до
        конца, либо нажать кнопку "Resume Auto-Scroll".
      </p>
    </div>
  </div>
);

export default About;
