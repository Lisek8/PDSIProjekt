import { Component, OnInit } from '@angular/core';
import { ConversationTableHeaders } from '../../enums/ConversationTableHeaders.enum';
import { DataService } from '../../services/data/data.service';
import { RoleGuardService } from 'src/app/services/role-guard/role-guard.service';
import { UserType } from 'src/app/enums/user-type.enum';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Conversation } from 'src/app/models/conversation';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit {
  conversations: Conversation[];
  subject: BehaviorSubject<UserType> = this.roleService.getUserType();
  currentUserType: UserType;
  userTypes: typeof UserType = UserType;
  messageContent: string;
  disableSend: boolean;

  cols: any[] = [];

  constructor(private dataService: DataService, private roleService: RoleGuardService, private toastService: ToastrService) { }

  ngOnInit() {
    this.dataService.getConversations()
    .pipe(
      catchError(err => {
        this.toastService.error('Nie udało się pobrać listy wiadomości', 'Błąd');
        return EMPTY;
      })
    ).subscribe((convos: Conversation[]) => this.conversations = convos);
    this.currentUserType = this.subject.getValue();
    this.subject.subscribe(value => this.currentUserType = value);
    this.cols = [
      { field: ConversationTableHeaders.Topic, header: 'Temat pracy', sortable: true },
      this.currentUserType === UserType.Lecturer ?
      { field: ConversationTableHeaders.Student, header: 'Student', sortable: true } :
      { field: ConversationTableHeaders.Lecturer, header: 'Wykładowca', sortable: true },
      { field: ConversationTableHeaders.Messages, header: 'Nowych wiadomości', sortable: true },
      { field: ConversationTableHeaders.Actions, header: '', sortable: false }
    ];
  }

  async sendMessage(conversationId: number) {
    this.disableSend = true;
    await this.dataService.sendMessage(conversationId, this.messageContent).toPromise().then(
      success => {
        this.toastService.success('Wiadomość pomyślnie wysłana', 'Sukces');
        this.clearMessageContent();
      },
      error => this.toastService.error('Wystąpił błąd podczas wysyłania wiadomości', 'Błąd')
    );
    this.disableSend = false;
  }

  clearMessageContent() {
    this.messageContent = '';
  }

}
