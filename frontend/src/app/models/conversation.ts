import { Message } from './message';

export interface Conversation {
    id: number;
    topicId: number;
    topic: string;
    student: string;
    lecturer: string;
    unreadMessages: number;
    messages: Message[];
}
