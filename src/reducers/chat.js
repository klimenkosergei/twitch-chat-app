const chatReducerDefaultState = {
  status: 'disconnected',
  channel: 'lirik',
  messages: [],
  badges: null,
  theme: 'dark',
  error: null
};

const chatReducer = (state = chatReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_CONNECTION':
      return { ...state, error: null, status: action.payload };
    case 'SET_CHANNEL':
      return { ...state, error: null, channel: action.payload };
    case 'ADD_MESSAGE':
      if (state.messages.length > 60) {
        return {
          ...state,
          error: null,
          messages: [...state.messages.slice(1), action.payload]
        };
      }
      return {
        ...state,
        error: null,
        messages: [...state.messages, action.payload]
      };
    case 'SET_BADGES':
      return { ...state, error: null, badges: action.payload, messages: [] };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default chatReducer;
