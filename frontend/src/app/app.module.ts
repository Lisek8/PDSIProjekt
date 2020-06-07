import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { TopicsListComponent } from './components/topics-list/topics-list.component';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { PersonalTopicsComponent } from './components/personal-topics/personal-topics.component';
import { TopicViewModule } from './components/topic-view/topic-view.module';
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { ToastrModule } from 'ngx-toastr';
import { LecturerPanelComponent } from './components/lecturer-panel/lecturer-panel.component';
import { ChartModule } from 'primeng/chart';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// tslint:disable-next-line:max-line-length
import { ModalReserveConfirmationComponent } from './components/topics-list/modal-reserve-confirmation/modal-reserve-confirmation.component';
import { ModalAskAboutTopicComponent } from './components/topics-list/modal-ask-about-topic/modal-ask-about-topic.component';

@NgModule({
   declarations: [
      AppComponent,
      TopNavbarComponent,
      TopicsListComponent,
      PersonalTopicsComponent,
      ConversationListComponent,
      LecturerPanelComponent,
      ModalReserveConfirmationComponent,
      ModalAskAboutTopicComponent
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
      ChartModule,
      HttpClientModule,
      NgbModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      ModalReserveConfirmationComponent,
      ModalAskAboutTopicComponent
   ]
})
export class AppModule { }
