import { Component, OnInit, Input } from '@angular/core';
import { TopicDataFull } from 'src/app/models/topic-data';
import { MessageTableLecturerHeaders } from 'src/app/enums/message-table-lecturer-headers.enum';
import { ToastrService } from 'ngx-toastr';
import { UserType } from 'src/app/enums/user-type.enum';
import { RoleGuardService } from 'src/app/services/role-guard/role-guard.service';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-topic-view-messages',
  templateUrl: './topic-view-messages.component.html',
  styleUrls: ['./topic-view-messages.component.css']
})
export class TopicViewMessagesComponent implements OnInit {
  @Input() data: TopicDataFull;
  messageContent: string;
  disableSend: boolean;
  subject: BehaviorSubject<UserType> = this.roleService.getUserType();
  currentUserType: UserType;
  userTypes: typeof UserType = UserType;

  cols = [
    { header: MessageTableLecturerHeaders.Recipient, field: 'recipients.' + (this.currentUserType === this.userTypes.User ? 'lecturer' : 'student') }
  ];

  constructor(private toastService: ToastrService, private roleService: RoleGuardService, private dataService: DataService) { }

  ngOnInit() {
    this.messageContent = '';
    this.disableSend = false;
    this.currentUserType = this.subject.getValue();
    this.subject.subscribe(value => this.currentUserType = value);
  }

  clearMessageContent() {
    this.messageContent = '';
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

}
