export const twitchConnection = () => {
  return new WebSocket('wss://irc-ws.chat.twitch.tv');
};
