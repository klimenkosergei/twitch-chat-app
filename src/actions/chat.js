import { twitchConnection } from '../utils/twitchConnection';
import { formatIRC } from '../utils/formatIRC';

let connection;

export const openConnection = () => {
  return dispatch => {
    connection = twitchConnection();

    connection.onopen = () => {
      connection.send('PASS oauth:123xd');
      connection.send('NICK justinfan123');
      connection.send('CAP REQ :twitch.tv/tags');
      dispatch({ type: 'SET_CONNECTION', payload: 'connected' });
    };

    connection.onmessage = e => {
      const message = formatIRC(e.data);
      if (message.command === 'PING') {
        // Respond with PONG to keep the connection open
        connection.send('PONG :tmi.twitch.tv');
      } else if (message.command === 'PRIVMSG') {
        const formattedMessage = {
          id: message.tags.id,
          user: {
            id: message.tags['user-id'],
            color: message.tags.color,
            badges: formatBadges(message.tags.badges),
            displayName: message.tags['display-name']
          },
          emotes: formatEmotes(message.tags.emotes),
          content: message.params[1],
          type: 'user'
        };
        dispatch({ type: 'ADD_MESSAGE', payload: formattedMessage });
      }
    };
  };
};

export const closeConnection = () => {
  return dispatch => {
    connection.close();
    dispatch({ type: 'SET_CONNECTION', payload: 'disconnected' });
  };
};

export const setChatChannel = channel => {
  return dispatch => {
    dispatch({ type: 'SET_CHANNEL', payload: channel });
  };
};

export const joinChat = channel => {
  return async dispatch => {
    try {
      const subBadges = await loadBadges(channel);
      dispatch({ type: 'SET_BADGES', payload: subBadges });
      connection.send(`JOIN #${channel}`);
      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          id: 'info',
          user: { displayName: channel },
          content: `Joined chat channel`,
          type: 'info'
        }
      });
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        payload: `Error connecting to channel ${channel} ${err}`
      });
    }
  };
};

export const leaveChat = channel => {
  return dispatch => {
    connection.send(`PART #${channel}`);
    dispatch({ type: 'SET_CHANNEL', payload: null });
  };
};

export const setChatTheme = theme => {
  return dispatch => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };
};

const loadBadges = async channel => {
  try {
    // Get channel ID by channel NAME
    const resId = await fetch(
      `https://api.twitch.tv/v5/users?login=${channel}&client_id=j46qoylsjcttr5w0ytzq96pyrtuqyd`
    );
    const dataId = await resId.json();
    const id = dataId.users[0]._id;

    // Get Subscriber badges for channel
    const resSub = await fetch(
      `https://badges.twitch.tv/v1/badges/channels/${id}/display`
    );
    const dataSub = await resSub.json();
    const subBadges = {};
    Object.keys(dataSub.badge_sets).forEach(set => {
      subBadges[set] = dataSub.badge_sets[set].versions;
    });

    // Get Global Twitch badges
    const resGlobal = await fetch(
      'https://badges.twitch.tv/v1/badges/global/display'
    );
    const dataGlobal = await resGlobal.json();
    const globalBadges = {};
    Object.keys(dataGlobal.badge_sets).forEach(set => {
      globalBadges[set] = dataGlobal.badge_sets[set].versions;
    });

    return { sub: subBadges, global: globalBadges };
  } catch (err) {
    throw new Error(`Error loading #${channel} ${err}`);
  }
};

// Convert badges string to badges array
const formatBadges = badgesRaw => {
  if (!badgesRaw) return null;
  const badges = badgesRaw.split(',');
  const badgesList = badges.map(badge => ({
    type: badge.split('/')[0],
    version: badge.split('/')[1]
  }));
  return badgesList;
};

// Convert emotes string to emotes array
const formatEmotes = emotesRaw => {
  if (!emotesRaw) return null;
  const emotes = emotesRaw.split('/');
  const emoteList = [];

  emotes.forEach(emote => {
    const [id, positionRaw] = emote.split(':');
    const positions = positionRaw.split(',');
    positions.forEach(position =>
      emoteList.push({ id, position: position.split('-') })
    );
  });

  // Sort emotes by positions in message
  emoteList.sort((a, b) => {
    if (parseInt(a.position[0]) < parseInt(b.position[0])) {
      // If start position of 'a' lower than 'b' move 'a' up
      return -1;
    }
    if (parseInt(a.position[0]) < parseInt(b.position[0])) {
      // If start position of 'a' higher than 'b' move 'a' down
      return 1;
    }
    return 0;
  });

  return emoteList;
};
