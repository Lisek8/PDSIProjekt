import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { TopicDataSimple, TopicDataFull, TopicDataPersonal } from '../../models/topic-data';
import { TopicType } from '../../enums/topic-type.enum';
import { TopicStatus } from '../../enums/topic-status.enum';
import { ConversationSimple } from '../../models/conversation';
import { Dashboard } from '../../models/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getTopics(): Observable<TopicDataSimple[]> {
    /* return this.http.get<TopicDataSimple[]>(environment.restServicesPath + 'topicslist').pipe(
      catchError(this.handleError)
    ); */
    return of([
      {
        id: 0,
        faculty: 'EEIA',
        lecturer: 'prof. Szymon Grabowski',
        type: TopicType.Engineer,
        topic: 'Ekstrakcja i zarządzanie uzyteczną wiedzą z serwisu Stack Overflow',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque sagittis massa, eget feugiat turpis.
        Vivamus viverra purus turpis. Proin facilisis, elit sed vulputate efficitur, sem lectus ultrices tortor,
        non maximus enim mauris eu tortor.
        Aenean porttitor, augue sed vehicula porta, est tortor euismod lorem, eu semper dolor dui in erat.
        Nam neque magna, dignissim eget quam ut, ultrices feugiat augue. Donec venenatis urna vel quam semper cursus.
        Praesent vitae odio et nisl tristique dapibus sed ac sapien. Mauris ex sapien, suscipit sed sapien eget, pretium venenatis nulla.
        Maecenas placerat, nunc nec mattis tincidunt, nibh orci fringilla sapien, non condimentum massa velit at justo.
        Mauris sodales orci id purus ullamcorper rutrum. Phasellus gravida sit amet ante non tincidunt.
        Integer imperdiet lacus nec malesuada ornare.
        Proin quis facilisis turpis.`,
        tags: [
          'stack overflow',
          'ekstrakcja wiedzy',
          'webscraping'
        ]
      },
      {
        id: 1,
        faculty: 'EEIA',
        lecturer: 'prof. Szymon Grabowski',
        type: TopicType.Engineer,
        topic: 'Zapis partii szachowej na podstawie analizy obrazów szachownicy',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque sagittis massa, eget feugiat turpis.
        Vivamus viverra purus turpis. Proin facilisis, elit sed vulputate efficitur, sem lectus ultrices tortor,
        non maximus enim mauris eu tortor.
        Aenean porttitor, augue sed vehicula porta, est tortor euismod lorem, eu semper dolor dui in erat.
        Nam neque magna, dignissim eget quam ut, ultrices feugiat augue. Donec venenatis urna vel quam semper cursus.
        Praesent vitae odio et nisl tristique dapibus sed ac sapien. Mauris ex sapien, suscipit sed sapien eget, pretium venenatis nulla.
        Maecenas placerat, nunc nec mattis tincidunt, nibh orci fringilla sapien, non condimentum massa velit at justo.
        Mauris sodales orci id purus ullamcorper rutrum. Phasellus gravida sit amet ante non tincidunt.
        Integer imperdiet lacus nec malesuada ornare.
        Proin quis facilisis turpis.`,
        tags: [
          'szachy',
          'analiza obrazu'
        ]
      },
      {
        id: 2,
        faculty: 'EEIA',
        lecturer: 'dr inż. Łukasz Sturgulewski',
        type: TopicType.Engineer,
        topic: 'Wirtualizacja usług siecowych w złożonych systemach informatycznych',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque sagittis massa, eget feugiat turpis.
        Vivamus viverra purus turpis. Proin facilisis, elit sed vulputate efficitur, sem lectus ultrices tortor,
        non maximus enim mauris eu tortor.
        Aenean porttitor, augue sed vehicula porta, est tortor euismod lorem, eu semper dolor dui in erat.
        Nam neque magna, dignissim eget quam ut, ultrices feugiat augue. Donec venenatis urna vel quam semper cursus.
        Praesent vitae odio et nisl tristique dapibus sed ac sapien. Mauris ex sapien, suscipit sed sapien eget, pretium venenatis nulla.
        Maecenas placerat, nunc nec mattis tincidunt, nibh orci fringilla sapien, non condimentum massa velit at justo.
        Mauris sodales orci id purus ullamcorper rutrum. Phasellus gravida sit amet ante non tincidunt.
        Integer imperdiet lacus nec malesuada ornare.
        Proin quis facilisis turpis.`,
        tags: [
          'wirtualizacja',
          'sieci'
        ]
      },
      {
        id: 3,
        faculty: 'EEIA',
        lecturer: 'prof. Szymon Grabowski',
        type: TopicType.Master,
        topic: 'Wykrywanie tesktu na obrazach',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque sagittis massa, eget feugiat turpis.
        Vivamus viverra purus turpis. Proin facilisis, elit sed vulputate efficitur, sem lectus ultrices tortor,
        non maximus enim mauris eu tortor.
        Aenean porttitor, augue sed vehicula porta, est tortor euismod lorem, eu semper dolor dui in erat.
        Nam neque magna, dignissim eget quam ut, ultrices feugiat augue. Donec venenatis urna vel quam semper cursus.
        Praesent vitae odio et nisl tristique dapibus sed ac sapien. Mauris ex sapien, suscipit sed sapien eget, pretium venenatis nulla.
        Maecenas placerat, nunc nec mattis tincidunt, nibh orci fringilla sapien, non condimentum massa velit at justo.
        Mauris sodales orci id purus ullamcorper rutrum. Phasellus gravida sit amet ante non tincidunt.
        Integer imperdiet lacus nec malesuada ornare.
        Proin quis facilisis turpis.`,
        tags: [
          'wykrywanie tekstu',
          'analiza obrazu'
        ]
      }
    ]);
  }

  getPersonalTopics(): Observable<TopicDataPersonal[]> {
    /* return this.http.get<TopicDataSimple[]>(environment.restServicesPath + 'topicslist').pipe(
      catchError(this.handleError)
    ); */
    return of([
      {
        id: 0,
        faculty: 'EEIA',
        lecturer: 'prof. Szymon Grabowski',
        topic: 'Ekstrakcja i zarządzanie uzyteczną wiedzą z serwisu Stack Overflow',
        status: TopicStatus.InProgress,
        type: TopicType.Engineer,
        student: 'David Z',
        messages: 0,
        examDate: new Date('21 Mar Dec 2021 00:12:00 GMT'),
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque sagittis massa, eget feugiat turpis.
        Vivamus viverra purus turpis. Proin facilisis, elit sed vulputate efficitur, sem lectus ultrices tortor,
        non maximus enim mauris eu tortor.
        Aenean porttitor, augue sed vehicula porta, est tortor euismod lorem, eu semper dolor dui in erat.
        Nam neque magna, dignissim eget quam ut, ultrices feugiat augue. Donec venenatis urna vel quam semper cursus.
        Praesent vitae odio et nisl tristique dapibus sed ac sapien. Mauris ex sapien, suscipit sed sapien eget, pretium venenatis nulla.
        Maecenas placerat, nunc nec mattis tincidunt, nibh orci fringilla sapien, non condimentum massa velit at justo.
        Mauris sodales orci id purus ullamcorper rutrum. Phasellus gravida sit amet ante non tincidunt.
        Integer imperdiet lacus nec malesuada ornare.
        Proin quis facilisis turpis.`,
        tags: [
          'stack overflow',
          'ekstrakcja wiedzy'
        ]
      },
      {
        id: 1,
        faculty: 'EEIA',
        lecturer: 'prof. Szymon Grabowski',
        topic: 'Zapis partii szachowej na podstawie analizy obrazów szachownicy',
        status: TopicStatus.InProgress,
        type: TopicType.Engineer,
        student: 'Jędrzej L',
        messages: 50,
        examDate: new Date('21 Mar Dec 2021 00:12:00 GMT'),
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque sagittis massa, eget feugiat turpis.
        Vivamus viverra purus turpis. Proin facilisis, elit sed vulputate efficitur, sem lectus ultrices tortor,
        non maximus enim mauris eu tortor.
        Aenean porttitor, augue sed vehicula porta, est tortor euismod lorem, eu semper dolor dui in erat.
        Nam neque magna, dignissim eget quam ut, ultrices feugiat augue. Donec venenatis urna vel quam semper cursus.
        Praesent vitae odio et nisl tristique dapibus sed ac sapien. Mauris ex sapien, suscipit sed sapien eget, pretium venenatis nulla.
        Maecenas placerat, nunc nec mattis tincidunt, nibh orci fringilla sapien, non condimentum massa velit at justo.
        Mauris sodales orci id purus ullamcorper rutrum. Phasellus gravida sit amet ante non tincidunt.
        Integer imperdiet lacus nec malesuada ornare.
        Proin quis facilisis turpis.`,
        tags: [
          'szachy',
          'analiza obrazu'
        ]
      },
      {
        id: 2,
        faculty: 'EEIA',
        lecturer: 'prof. Szymon Grabowski',
        topic: 'Wykrywanie tesktu na obrazach',
        status: TopicStatus.Available,
        type: TopicType.Master,
        student: '-',
        messages: 5,
        examDate: null,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque sagittis massa, eget feugiat turpis.
        Vivamus viverra purus turpis. Proin facilisis, elit sed vulputate efficitur, sem lectus ultrices tortor,
        non maximus enim mauris eu tortor.
        Aenean porttitor, augue sed vehicula porta, est tortor euismod lorem, eu semper dolor dui in erat.
        Nam neque magna, dignissim eget quam ut, ultrices feugiat augue. Donec venenatis urna vel quam semper cursus.
        Praesent vitae odio et nisl tristique dapibus sed ac sapien. Mauris ex sapien, suscipit sed sapien eget, pretium venenatis nulla.
        Maecenas placerat, nunc nec mattis tincidunt, nibh orci fringilla sapien, non condimentum massa velit at justo.
        Mauris sodales orci id purus ullamcorper rutrum. Phasellus gravida sit amet ante non tincidunt.
        Integer imperdiet lacus nec malesuada ornare.
        Proin quis facilisis turpis.`,
        tags: [
          'wirtualizacja',
          'sieci'
        ]
      },
      {
        id: 3,
        faculty: 'EEIA',
        lecturer: 'prof. Szymon Grabowski',
        topic: 'Temat wymagający potwierdzenia',
        status: TopicStatus.RequiredAction,
        type: TopicType.Master,
        student: '-',
        messages: 0,
        examDate: null,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque sagittis massa, eget feugiat turpis.
        Vivamus viverra purus turpis. Proin facilisis, elit sed vulputate efficitur, sem lectus ultrices tortor,
        non maximus enim mauris eu tortor.
        Aenean porttitor, augue sed vehicula porta, est tortor euismod lorem, eu semper dolor dui in erat.
        Nam neque magna, dignissim eget quam ut, ultrices feugiat augue. Donec venenatis urna vel quam semper cursus.
        Praesent vitae odio et nisl tristique dapibus sed ac sapien. Mauris ex sapien, suscipit sed sapien eget, pretium venenatis nulla.
        Maecenas placerat, nunc nec mattis tincidunt, nibh orci fringilla sapien, non condimentum massa velit at justo.
        Mauris sodales orci id purus ullamcorper rutrum. Phasellus gravida sit amet ante non tincidunt.
        Integer imperdiet lacus nec malesuada ornare.
        Proin quis facilisis turpis.`,
        tags: [
          'wykrywanie tekstu',
          'analiza obrazu'
        ]
      }
    ]);
  }

  getTopicInfo(topicId: number): Observable<TopicDataFull> {
    /* return this.http.get<TopicDataSimple[]>(environment.restServicesPath + 'topicslist').pipe(
      catchError(this.handleError)
    ); */
    return of({
      id: 0,
      faculty: 'EEIA',
      lecturer: 'prof. Szymon Grabowski',
      topic: 'Ekstrakcja i zarządzanie uzyteczną wiedzą z serwisu Stack Overflow',
      type: TopicType.Engineer,
      status: TopicStatus.InProgress,
      student: 'David Z',
      messages: 0,
      conversations: [
        {
          id: 1,
          topicId: 0,
          topic: 'Ekstrakcja i zarządzanie uzyteczną wiedzą z serwisu Stack Overflow',
          recipients: {
            student: 'David Z',
            lecturer: 'prof. Szymon Grabowski'
          },
          messages: [
            {
              id: 0,
              author: 'David Z',
              date: new Date('04 Dec 2020 00:12:00 GMT'),
              content: 'Tekst wiadomości'
            },
            {
              id: 1,
              author: 'David Z',
              date: new Date('04 Dec 2020 00:15:00 GMT'),
              content: 'Tekst wiadomości2'
            }
          ],
          unreadMessages: 5
        },
        {
          id: 2,
          topicId: 0,
          topic: 'Ekstrakcja i zarządzanie uzyteczną wiedzą z serwisu Stack Overflow',
          recipients: {
            student: 'Alan O',
            lecturer: 'prof. Szymon Grabowski'
          },
          messages: [
            {
              id: 3,
              author: 'Alan O',
              date: new Date('04 Apr 2020 00:12:00 GMT'),
              content: 'Tekst wiadomości'
            },
            {
              id: 4,
              author: 'Alan O',
              date: new Date('04 Apr 2020 00:15:00 GMT'),
              content: 'Tekst wiadomości2'
            }
          ],
          unreadMessages: 5
        }
      ],
      examDate: new Date('21 Mar Dec 2021 00:12:00 GMT'),
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque sagittis massa, eget feugiat turpis.
      Vivamus viverra purus turpis. Proin facilisis, elit sed vulputate efficitur, sem lectus ultrices tortor,
      non maximus enim mauris eu tortor.
      Aenean porttitor, augue sed vehicula porta, est tortor euismod lorem, eu semper dolor dui in erat.
      Nam neque magna, dignissim eget quam ut, ultrices feugiat augue. Donec venenatis urna vel quam semper cursus.
      Praesent vitae odio et nisl tristique dapibus sed ac sapien. Mauris ex sapien, suscipit sed sapien eget, pretium venenatis nulla.
      Maecenas placerat, nunc nec mattis tincidunt, nibh orci fringilla sapien, non condimentum massa velit at justo.
      Mauris sodales orci id purus ullamcorper rutrum. Phasellus gravida sit amet ante non tincidunt.
      Integer imperdiet lacus nec malesuada ornare.
      Proin quis facilisis turpis.`,
      arrangements: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque sagittis massa, eget feugiat turpis.
      Vivamus viverra purus turpis. Proin facilisis, elit sed vulputate efficitur, sem lectus ultrices tortor,
      non maximus enim mauris eu tortor.
      Aenean porttitor, augue sed vehicula porta, est tortor euismod lorem, eu semper dolor dui in erat.
      Nam neque magna, dignissim eget quam ut, ultrices feugiat augue. Donec venenatis urna vel quam semper cursus.
      Praesent vitae odio et nisl tristique dapibus sed ac sapien. Mauris ex sapien, suscipit sed sapien eget, pretium venenatis nulla.
      Maecenas placerat, nunc nec mattis tincidunt, nibh orci fringilla sapien, non condimentum massa velit at justo.
      Mauris sodales orci id purus ullamcorper rutrum. Phasellus gravida sit amet ante non tincidunt.
      Integer imperdiet lacus nec malesuada ornare.
      Proin quis facilisis turpis.`,
      files: [
        'plik1.docx',
        'plik2.docx',
        'plik3.docx'
      ],
      acceptanceRequests: [
        {
          id: 0,
          date: new Date('04 Dec 2020 00:12:00 GMT'),
          student: 'Jędrzej L'
        }
      ],
      tags: [
        'stack overflow',
        'ekstrakcja wiedzy'
      ]
    });
  }

  getConversations(): Observable<ConversationSimple[]> {
    /* return this.http.get<TopicDataSimple[]>(environment.restServicesPath + 'topicslist').pipe(
      catchError(this.handleError)
    ); */
    return of(
      [
        {
          id: 0,
          topicId: 0,
          topic: 'Test topic 1',
          recipients: {
            student: 'David Z',
            lecturer: 'prof. Szymon Grabowski'
          },
          unreadMessages: 0
        },
        {
          id: 1,
          topicId: 0,
          topic: 'Test topic 1',
          recipients: {
            student: 'Jędrzej L',
            lecturer: 'prof. Szymon Grabowski'
          },
          unreadMessages: 1
        },
        {
          id: 2,
          topicId: 1,
          topic: 'Test topic 2',
          recipients: {
            student: 'David Z',
            lecturer: 'prof. Szymon Grabowski'
          },
          unreadMessages: 3
        },
        {
          id: 3,
          topicId: 0,
          topic: 'Test topic 3',
          recipients: {
            student: 'David Z',
            lecturer: 'prof. Szymon Grabowski'
          },
          unreadMessages: 5
        },
        {
          id: 4,
          topicId: 0,
          topic: 'Test topic 4',
          recipients: {
            student: 'Alan O',
            lecturer: 'dr inż. Łukasz Sturgulewski'
          },
          unreadMessages: 2
        }
      ]
    );
  }

  getDashboardData(): Observable<Dashboard> {
    /* return this.http.get<TopicDataSimple[]>(environment.restServicesPath + 'topicslist').pipe(
      catchError(this.handleError)
    ); */
    return of({
      availableTopics: 20,
      inProgressTopics: 5,
      actionRequiredTopics: 3,
      finishedTopics: 5,
      newMessages: 4
    });
  }

  /* private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  } */

}
