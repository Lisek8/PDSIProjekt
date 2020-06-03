import { Message } from './message';

export interface ConversationSimple {
    id: number;
    topicId: number;
    topic: string;
    recipients: {
        student: string;
        lecturer: string;
    };
    unreadMessages: number;
}

export interface Conversation extends ConversationSimple {
    messages: Message[];
}
