import { AppConfig } from "@/src/common/config/app.config";
import { ServiceCore } from "@/src/common/service/service.core";
import { ChatbotMessageModel } from "../model/chatbot.model";

export const sendMessage = async (data: ChatbotMessageModel) => {
    try {
        const domain = new AppConfig().getDomain();
        const response = await ServiceCore.POST(
            `${domain}`,
            `chatbot`,
            data.convertModelToExecute()
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const getChatHistory = async (sessionId: string) => {
    try {
        const domain = new AppConfig().getDomain();
        const response = await ServiceCore.GET(
            `${domain}`,
            `get-chat-history?sessionId=${sessionId}`
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const getUserChatSessions = async (userId: number) => {
    try {
        const domain = new AppConfig().getDomain();
        const response = await ServiceCore.GET(
            `${domain}`,
            `get-user-chat-sessions?userId=${userId}`
        );
        return response;
    } catch (error) {
        throw error;
    }
};