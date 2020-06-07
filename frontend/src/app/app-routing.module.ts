import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TopicsListComponent } from './components/topics-list/topics-list.component';
import { PersonalTopicsComponent } from './components/personal-topics/personal-topics.component';
import { TopicViewComponent } from './components/topic-view/topic-view.component';
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { LecturerPanelComponent } from './components/lecturer-panel/lecturer-panel.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: TopicsListComponent
  },
  {
    path: 'personal',
    component: PersonalTopicsComponent
  },
  {
    path: 'topicview/:id',
    component: TopicViewComponent
  },
  {
    path: 'conversations',
    component: ConversationListComponent
  },
  {
    path: 'dashboard',
    component: LecturerPanelComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
