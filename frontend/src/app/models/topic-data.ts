import { TopicStatus } from '../enums/topic-status.enum';
import { TopicType } from '../enums/topic-type.enum';
import { AcceptanceRequest } from './acceptance-request';
import { Conversation } from './conversation';

export interface TopicDataSimple {
    id: number;
    faculty: string;
    lecturer: string;
    type: TopicType;
    topic: string;
    description: string;
    tags: string[];
}

export interface TopicDataPersonal extends TopicDataSimple {
    status: TopicStatus;
    student: string;
    messages: number;
    examDate?: string;
}

export interface TopicDataFull extends TopicDataPersonal {
    conversations: Conversation[];
    arrangements: string;
    acceptanceRequests: AcceptanceRequest[];
}
