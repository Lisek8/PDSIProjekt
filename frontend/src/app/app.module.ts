import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { TopicsListComponent } from './topics-list/topics-list.component';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { PersonalTopicsComponent } from './personal-topics/personal-topics.component';
import { TopicViewModule } from './topic-view/topic-view.module';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { ToastrModule } from 'ngx-toastr';
import { LecturerPanelComponent } from './lecturer-panel/lecturer-panel.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
   declarations: [
      AppComponent,
      TopNavbarComponent,
      TopicsListComponent,
      PersonalTopicsComponent,
      ConversationListComponent,
      LecturerPanelComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      RouterModule,
      TableModule,
      MultiSelectModule,
      BrowserAnimationsModule,
      FormsModule,
      TopicViewModule,
      ToastrModule.forRoot(),
      ChartModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
