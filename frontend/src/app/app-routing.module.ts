import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TopicsListComponent } from './topics-list/topics-list.component';
import { PersonalTopicsComponent } from './personal-topics/personal-topics.component';
import { TopicViewComponent } from './topic-view/topic-view.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { LecturerPanelComponent } from './lecturer-panel/lecturer-panel.component';

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
    path: 'topicview',
    component: TopicViewComponent
  },
  {
    path: 'conversations',
    component: ConversationListComponent
  },
  {
    path: 'dashboard',
    component: LecturerPanelComponent
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
