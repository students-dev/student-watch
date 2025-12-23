import Pusher from 'pusher';
import PusherClient from 'pusher-js';

export const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID || 'app-id',
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY || 'app-key',
  secret: process.env.PUSHER_APP_SECRET || 'app-secret',
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'mt1',
  useTLS: true,
});

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY || 'app-key',
  {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'mt1',
  }
);
