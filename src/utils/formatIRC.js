export const formatIRC = data => {
  const message = {
    raw: data,
    tags: {},
    prefix: null,
    command: null,
    params: []
  };

  let currentPosition = 0;
  let nextSpace = 0;

  // Extract message tags
  if (data.charCodeAt(currentPosition) === 64) {
    nextSpace = data.indexOf(' ');
    const rawTags = data.slice(1, nextSpace).split(';');
    rawTags.forEach(tag => {
      const pair = tag.split('=');
      // If there is no '=' assign true
      message.tags[pair[0]] = pair[1];
    });
    currentPosition = nextSpace + 1;
  }

  // Extract message prefix
  if (data.charCodeAt(currentPosition) === 58) {
    nextSpace = data.indexOf(' ', currentPosition);
    message.prefix = data.slice(currentPosition + 1, nextSpace);
    currentPosition = nextSpace + 1;
  }

  // Extract message command
  nextSpace = data.indexOf(' ', currentPosition);
  message.command = data.slice(currentPosition, nextSpace);
  currentPosition = nextSpace + 1;

  // Extract message params
  while (currentPosition < data.length) {
    if (data.charCodeAt(currentPosition) === 58) {
      // If character is ':' just push the rest as a param
      message.params.push(data.slice(currentPosition + 1));
      break;
    }

    nextSpace = data.indexOf(' ', currentPosition);
    if (nextSpace === -1) {
      // If no more spaces just push remaining characters as a param
      message.params.push(data.slice(currentPosition));
      break;
    } else {
      message.params.push(data.slice(currentPosition, nextSpace));
      currentPosition = nextSpace + 1;
    }
  }

  return message;
};
