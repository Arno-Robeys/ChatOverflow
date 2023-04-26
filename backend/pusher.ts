import PusherServer from "pusher";

export const pusherServer = new PusherServer({
    appId: "1590357",
    key: "728f59702ac037fb47f4",
    secret: "aa92979fb9e75710e64a",
    cluster: "eu",
    useTLS: true
  });