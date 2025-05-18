import { ChatbotMessageModel } from "../model/chatbot.model";
import * as ChatbotService from "../service/chatbot.service";

export const sendMessage = async (data: ChatbotMessageModel) => {
    try {
        const result = await ChatbotService.sendMessage(data);
        return result;
    } catch (error) {
        throw error;
    }
};

export const getChatHistory = async (sessionId: string) => {
    try {
        const result = await ChatbotService.getChatHistory(sessionId);
        return result;
    } catch (error) {
        throw error;
    }
};

export const getUserChatSessions = async (userId: number) => {
    try {
        const result = await ChatbotService.getUserChatSessions(userId);
        return result;
    } catch (error) {
        throw error;
    }
};