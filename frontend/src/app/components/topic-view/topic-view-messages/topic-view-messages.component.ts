import { Component, OnInit, Input } from '@angular/core';
import { TopicDataFull } from 'src/app/models/topic-data';
import { MessageTableLecturerHeaders } from 'src/app/enums/message-table-lecturer-headers.enum';
import { ToastrService } from 'ngx-toastr';
import { UserType } from 'src/app/enums/user-type.enum';
import { RoleGuardService } from 'src/app/services/role-guard/role-guard.service';

@Component({
  selector: 'app-topic-view-messages',
  templateUrl: './topic-view-messages.component.html',
  styleUrls: ['./topic-view-messages.component.css']
})
export class TopicViewMessagesComponent implements OnInit {
  @Input() data: TopicDataFull;
  messageContent: string;
  disableSend: boolean;
  currentUserType: UserType;
  userTypes: typeof UserType = UserType;

  cols = [
    { header: MessageTableLecturerHeaders.Recipient, field: 'recipients.' + (this.currentUserType === this.userTypes.User ? 'lecturer' : 'student') }
  ];

  constructor(private toastService: ToastrService, private roleService: RoleGuardService) { }

  ngOnInit() {
    this.messageContent = '';
    this.disableSend = false;
    this.currentUserType = this.roleService.getUserType();
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
