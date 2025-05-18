export class ChatbotMessageModel {
    message: string;
    userId?: number;
    sessionId?: string;

    constructor(
        message?: string,
        userId?: number,
        sessionId?: string
    ) {
        this.message = message || '';
        this.userId = userId;
        this.sessionId = sessionId;
    }

    convertModelToExecute() {
        return {
            message: this.message,
            userId: this.userId,
            sessionId: this.sessionId
        }
    }
}

export class ChatHistoryModel {
    id: number;
    userId?: number;
    sessionId: string;
    message: string;
    response: string;
    messageType: string;
    createdAt: string;
    updatedAt: string;

    constructor(data?: any) {
        this.id = data?.id || 0;
        this.userId = data?.userId;
        this.sessionId = data?.sessionId || '';
        this.message = data?.message || '';
        this.response = data?.response || '';
        this.messageType = data?.messageType || '';
        this.createdAt = data?.createdAt || '';
        this.updatedAt = data?.updatedAt || '';
    }
}

export class ChatSessionModel {
    sessionId: string;
    lastActivity: string;
    previewMessage: string;
    userId?: number;

    constructor(data?: any) {
        this.sessionId = data?.sessionId || '';
        this.lastActivity = data?.lastActivity || '';
        this.previewMessage = data?.previewMessage || '';
        this.userId = data?.userId;
    }
}
