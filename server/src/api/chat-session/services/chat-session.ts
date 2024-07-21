/**
 * chat-session service
 */

import { factories } from '@strapi/strapi';
import { parseJwt } from '../../../utils/jwt';

export default factories.createCoreService('api::chat-session.chat-session', ({ strapi }) => ({
    async findByUser(token: string) {
        try {
            const userId = parseJwt(token);
            if (typeof userId !== 'number') {
                throw new Error('Invalid token payload');
            }
            const sessions = await strapi.db.query('api::chat-session.chat-session').findMany({
                where: {
                    users_permissions_user: userId
                },
                populate: {
                    users_permissions_user: {
                        select: ['id', 'username'],
                    },
                },
            });
            return sessions;
        } catch (error) {
            console.log(error)
            throw new Error(`Failed to retrieve sessions: ${error.message}`);
        }
    },
    async sessionList(token: string) {
        try {
            const userId = parseJwt(token);
            if (typeof userId !== 'number') {
                throw new Error('Invalid token payload');
            }
            const sessions = await strapi.db.query('api::chat-session.chat-session').findMany({
                where: {
                    users_permissions_user: userId
                },
                select: ["title", "id"],
                orderBy: { id: "desc"}
            });
            //order by desc
            return sessions;
        } catch (error) {
            console.log(error)
            throw new Error(`Failed to retrieve sessions: ${error.message}`);
        }
    },
    async chatHistory(id: number) {
        try {
            const sessions = await strapi.db.query('api::chat-session.chat-session').findOne({
                where: {
                    id: id,
                },
                select: ["history"]
            });
            return sessions;
        } catch (error) {
            console.log(error)
            throw new Error(`Failed to retrieve sessions: ${error.message}`);
        }
    },
    async updateChatHistory(chatHistory: any[], sessionId: number, title?: string) {
        try {
            let data = title ? { title, history: chatHistory } : { history: chatHistory };
            return await strapi.db.query('api::chat-session.chat-session').update({
                where: { id: sessionId },
                data
            });
        } catch (error) {
            throw new Error(error);
        }
    },
    async saveSession(chatData: any, token: string) {
        try {
            const userId = parseJwt(token);
            const chatSession = await strapi.query('api::chat-session.chat-session').create({
                data: {
                    ...chatData,
                    users_permissions_user: userId,
                    publishedAt: new Date()
                }
            });
            return chatSession
        } catch (error) {
            throw new Error(error);
        }
    }
}));
