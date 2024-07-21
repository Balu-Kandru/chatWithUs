import { Strapi } from '@strapi/strapi';
import { Server } from 'http';
import { Server as SocketIOServer } from 'socket.io';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {
    // You can add your custom logic here if needed
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Strapi }) {
    try {
      const server: Server = strapi.server.httpServer;
      const io = new SocketIOServer(server, {
        cors: {
          origin: "*"
        },
      });
      io.on('connection', (socket) => {
        console.log('A user connected');
        
        socket.on('disconnect', () => {
          console.log('User disconnected');
        });
  
        socket.on('message', (data) => {
          console.log('Message received:', data);
          socket.emit('message', `Echo: ${data}`);
        });
      });
  
      strapi.io = io;
    } catch (error) {
      console.log(error)
    }
  },
};
