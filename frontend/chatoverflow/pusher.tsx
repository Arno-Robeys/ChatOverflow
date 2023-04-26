import PusherClient from 'pusher-js';

export const pusher = new PusherClient('728f59702ac037fb47f4', {
    cluster: 'eu'
  });

//PusherClient.logToConsole = true;