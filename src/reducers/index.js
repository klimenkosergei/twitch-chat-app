// import { combineReducers } from 'redux';

import chatReducer from './chat';
// import controlsReducer from './controls';

// const rootReducer = combineReducers({
//   chat: chatReducer,
//   controls: controlsReducer
// });

const rootReducer = chatReducer;

export default rootReducer;
