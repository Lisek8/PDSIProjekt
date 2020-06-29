import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TopicDataSimple, TopicDataFull, TopicDataPersonal } from '../../models/topic-data';
import { ConversationSimple } from '../../models/conversation';
import { Dashboard } from '../../models/dashboard';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getTopics(): Observable<TopicDataSimple[]> {
    return this.http.get<TopicDataSimple[]>(environment.restServicesPath + 'topiclist');
  }

  getPersonalTopics(): Observable<TopicDataPersonal[]> {
    return this.http.get<TopicDataPersonal[]>(environment.restServicesPath + 'personaltopiclist');
  }

  getTopicInfo(topicId: number): Observable<TopicDataFull> {
    const params = new HttpParams();
    params.set('id', topicId.toString());
    return this.http.get<TopicDataFull>(environment.restServicesPath + 'topic', {
      headers: new HttpHeaders(),
      params
    });
  }

  getConversations(): Observable<ConversationSimple[]> {
    return this.http.get<ConversationSimple[]>(environment.restServicesPath + 'conversations');
  }

  getDashboardData(): Observable<Dashboard> {
    return this.http.get<Dashboard>(environment.restServicesPath + 'dashboard');
  }

}
