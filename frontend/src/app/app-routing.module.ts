import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TopicsListComponent } from './components/topics-list/topics-list.component';
import { PersonalTopicsComponent } from './components/personal-topics/personal-topics.component';
import { TopicViewComponent } from './components/topic-view/topic-view.component';
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { LoginComponent } from './components/login/login.component';
import { RoleGuardService } from './services/role-guard/role-guard.service';

const routes: Routes = [
  {
    path: '',
    component: TopicsListComponent
  },
  {
    path: 'personal',
    component: PersonalTopicsComponent,
    canActivate: [RoleGuardService]
  },
  {
    path: 'topicview/:id',
    component: TopicViewComponent,
    canActivate: [RoleGuardService]
  },
  {
    path: 'conversations',
    component: ConversationListComponent,
    canActivate: [RoleGuardService]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RoleGuardService]
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
