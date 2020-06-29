import { Component, OnInit } from '@angular/core';
import { ConversationTableHeaders } from '../../enums/ConversationTableHeaders.enum';
import { ConversationSimple } from '../../models/conversation';
import { DataService } from '../../services/data/data.service';
import { RoleGuardService } from 'src/app/services/role-guard/role-guard.service';
import { UserType } from 'src/app/enums/user-type.enum';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit {
  conversations: ConversationSimple[];
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
        this.toastService.error('Nie udało się pobrać listy tematów', 'Błąd');
        return EMPTY;
      })
    ).subscribe((convos: ConversationSimple[]) => this.conversations = convos);
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

  async sendMessage() {
    this.disableSend = true;
    this.toastService.info('Wysyłanie wiadomości', 'Info');
    this.toastService.warning('Funkcja w fazie testów', 'Ostrzeżenie');
    if (this.messageContent.length > 0) {
      this.toastService.success('Wiadomość pomyślnie wysłana', 'Sukces');
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
    this.disableSend = false;
  }

}
