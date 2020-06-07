import { Component, OnInit } from '@angular/core';
import { ConversationTableHeaders } from '../../enums/ConversationTableHeaders.enum';
import { ConversationSimple } from '../../models/conversation';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit {
  conversations: ConversationSimple[];

  cols = [
    { field: ConversationTableHeaders.Topic, header: 'Temat pracy', sortable: true },
    { field: ConversationTableHeaders.Student, header: 'Student', sortable: true },
    { field: ConversationTableHeaders.Messages, header: 'Nowych wiadomości', sortable: true },
    { field: ConversationTableHeaders.Actions, header: '', sortable: false }
  ];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getConversations().forEach((convos) => this.conversations = convos);
  }

}
