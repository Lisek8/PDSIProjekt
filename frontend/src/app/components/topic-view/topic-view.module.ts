import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicViewComponent } from './topic-view.component';
import { BrowserModule } from '@angular/platform-browser';
import { TopicViewGeneralComponent } from './topic-view-general/topic-view-general.component';
import { TopicViewMessagesComponent } from './topic-view-messages/topic-view-messages.component';
import { TopicViewAcceptanceRequestsComponent } from './topic-view-acceptance-requests/topic-view-acceptance-requests.component';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    TableModule,
    FormsModule,
    InputTextareaModule,
    NgbModule
  ],
  declarations: [
    TopicViewComponent,
    TopicViewGeneralComponent,
    TopicViewMessagesComponent,
    TopicViewAcceptanceRequestsComponent
  ]
})
export class TopicViewModule { }
