/**
 * chat-session controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::chat-session.chat-session', ({ strapi }) => ({
  async findByUser(ctx) {
    const token  = ctx.request.headers.authorization.split(" ")[1];
    if (!token) {
      return ctx.badRequest('No token provided');
    }

    try {
      const sessions = await strapi.service('api::chat-session.chat-session').findByUser(token);
      ctx.send(sessions);
    } catch (error) {
      ctx.badRequest(`Failed to retrieve sessions: ${error.message}`);
    }
  },

  async sessionList(ctx){
    const token  = ctx.request.headers.authorization.split(" ")[1];
    if (!token) {
      return ctx.badRequest('No token provided');
    }
    try {
      const sessions = await strapi.service('api::chat-session.chat-session').sessionList(token);
      ctx.send(sessions);
    } catch (error) {
      ctx.badRequest(`Failed to retrieve sessions: ${error.message}`);
    }
  },
  
  async chatHistory(ctx){
    const { sessionId }  = ctx.request.query;
    if (!sessionId) {
      return ctx.badRequest('No sessionId provided');
    }
    try {
      const session = await strapi.service('api::chat-session.chat-session').chatHistory(sessionId);
      ctx.send(session);
    } catch (error) {
      ctx.badRequest(`Failed to retrieve sessions: ${error.message}`);
    }
  },

  async updateChat(ctx) {
    try{
      const { sessionId, title }  = ctx.request.query;
      const chatHistory = ctx.request.body;
      
      if(!sessionId || (!Array.isArray(chatHistory) || (chatHistory.length) < 1)){
        return ctx.badRequest('Provided payload');
      }
      const session = await strapi.service('api::chat-session.chat-session').updateChatHistory(chatHistory, sessionId, title);
      ctx.send(session);
    }catch(error){
      ctx.badRequest(`Failed to retrieve sessions: ${error.message}`);
    }
  },

  async saveSession(ctx) {
    try{
      const chatHistory = ctx.request.body;
      const token  = ctx.request.headers.authorization.split(" ")[1];
      if (!token) {
        return ctx.badRequest('No token provided');
      }
      
      // if(!sessionId || (!Array.isArray(chatHistory) || (chatHistory.length) < 1)){
      //   return ctx.badRequest('Provided payload');
      // }
      const session = await strapi.service('api::chat-session.chat-session').saveSession(chatHistory, token);
      ctx.send(session);
    }catch(error){
      ctx.badRequest(`Failed to retrieve sessions: ${error.message}`);
    }
  }

}));
