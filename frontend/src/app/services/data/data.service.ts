import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TopicDataSimple, TopicDataFull, TopicDataPersonal } from '../../models/topic-data';
import { Conversation } from '../../models/conversation';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TopicType } from 'src/app/enums/topic-type.enum';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // TOPIC LISTS
  getTopics(): Observable<TopicDataSimple[]> {
    return this.http.get<TopicDataSimple[]>(environment.restServicesPath + 'topiclist');
  }

  getPersonalTopics(): Observable<TopicDataPersonal[]> {
    return this.http.get<TopicDataPersonal[]>(environment.restServicesPath + 'personaltopiclist');
  }

  getTopicInfo(topicId: string): Observable<TopicDataFull> {
    return this.http.get<TopicDataFull>(environment.restServicesPath + 'topic?id=' + topicId);
  }

  // TOPIC MANAGEMENT
  createTopic(type: TopicType, topic: string, description: string, tags: string[]) {
    return this.http.post<TopicDataFull>(environment.restServicesPath + 'topic', {
      type,
      topic,
      description,
      tags
    });
  }

  modifyTopic(topicData: TopicDataFull) {
    return this.http.put<any>(environment.restServicesPath + 'topic', {
      id: topicData.id,
      topicName: topicData.topic,
      status: topicData.status,
      type: topicData.type,
      examDate: topicData.examDate,
      description: topicData.description,
      tags: topicData.tags
    });
  }

  deleteTopic(topicId: number) {
    return this.http.delete<TopicDataFull>(environment.restServicesPath + 'topic?id=' + topicId.toString());
  }

  // MESSAGE
  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(environment.restServicesPath + 'conversations');
  }

  sendMessage(conversationId: number, message: string) {
    return this.http.post(environment.restServicesPath + 'message', {
      conversationId,
      content: message
    });
  }

  sendMessageToTopic(topicId: number, message: string) {
    return this.http.post(environment.restServicesPath + 'message?topicId=' + topicId.toString(), message.toString());
  }

  // ACCEPTANCE REQUESTS
  createAcceptanceRequest(topicId: number) {
    return this.http.post(environment.restServicesPath + 'acceptancerequest?id=' + topicId, {});
  }

  decideOnAcceptingRequest(requestId: number, decision: boolean) {
    return this.http.put(environment.restServicesPath + 'acceptancerequest', {
      id: requestId,
      decision
    });
  }

}
