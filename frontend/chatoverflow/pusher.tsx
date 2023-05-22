import PusherClient from 'pusher-js';

export const pusher = new PusherClient('8608120168b14f416d62', {
    cluster: 'eu'
  });

//PusherClient.logToConsole = true;