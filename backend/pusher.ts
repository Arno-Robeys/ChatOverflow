import PusherServer from "pusher";

export const pusherServer = new PusherServer({
    appId: "1590357",
    key: "8608120168b14f416d62",
    secret: "82f633c564b3a5ce970a",
    cluster: "eu",
    useTLS: true
  });