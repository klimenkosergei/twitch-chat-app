import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../store/configureStore';
import Navigation from './layout/Navigation';
import About from './layout/About';
import StreamChat from './chat/StreamChat';
import ChatControls from './controls/ChatControls';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <div className='app'>
        <Navigation />
        <About />
        <StreamChat />
        <ChatControls />
      </div>
    </Provider>
  );
};

export default App;
