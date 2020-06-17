import { Component, OnInit } from '@angular/core';
import { ConversationTableHeaders } from '../../enums/ConversationTableHeaders.enum';
import { ConversationSimple } from '../../models/conversation';
import { DataService } from '../../services/data/data.service';
import { RoleGuardService } from 'src/app/services/role-guard/role-guard.service';
import { UserType } from 'src/app/enums/user-type.enum';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit {
  conversations: ConversationSimple[];
  currentUserType: UserType;
  userTypes: typeof UserType = UserType;

  cols: any[] = [];

  constructor(private dataService: DataService, private roleService: RoleGuardService) { }

  ngOnInit() {
    this.dataService.getConversations().forEach((convos) => this.conversations = convos);
    this.currentUserType = this.roleService.getUserType();
    this.cols = [
      { field: ConversationTableHeaders.Topic, header: 'Temat pracy', sortable: true },
      this.currentUserType === UserType.Lecturer ?
      { field: ConversationTableHeaders.Student, header: 'Student', sortable: true } :
      { field: ConversationTableHeaders.Lecturer, header: 'Wykładowca', sortable: true },
      { field: ConversationTableHeaders.Messages, header: 'Nowych wiadomości', sortable: true },
      { field: ConversationTableHeaders.Actions, header: '', sortable: false }
    ];
  }

}
