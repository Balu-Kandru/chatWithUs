/**
 * custom-chat-session-routes.ts
 */

export default {
    routes: [
      {
        method: 'GET',
        path: '/historiesList',
        handler: 'chat-session.findByUser',
        config: {},
      },
      {
        method: 'GET',
        path: '/sessionTitlesList',
        handler: 'chat-session.sessionList',
        config: {},
      },
      {
        method: 'GET',
        path: '/chatHistory',
        handler: 'chat-session.chatHistory',
        config: {},
      },
      {
        method: 'PUT',
        path: '/chat',
        handler: 'chat-session.updateChat',
        config: {},
      },
      {
        method: 'POST',
        path: '/chat',
        handler: 'chat-session.saveSession',
        config: {},
      }
    ],
  };
  