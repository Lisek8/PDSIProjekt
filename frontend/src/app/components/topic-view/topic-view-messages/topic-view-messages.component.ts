import { Component, OnInit, Input } from '@angular/core';
import { TopicDataFull } from 'src/app/models/topic-data';
import { MessageTableLecturerHeaders } from 'src/app/enums/message-table-lecturer-headers.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-topic-view-messages',
  templateUrl: './topic-view-messages.component.html',
  styleUrls: ['./topic-view-messages.component.css']
})
export class TopicViewMessagesComponent implements OnInit {
  @Input() data: TopicDataFull;
  messageContent: string;
  disableSend: boolean;

  cols = [
    { header: MessageTableLecturerHeaders.Recipient, field: 'recipients.student' }
  ];

  constructor(private toastService: ToastrService) { }

  ngOnInit() {
    this.messageContent = '';
    this.disableSend = false;
  }

  async sendMessage() {
    this.disableSend = true;
    this.toastService.info('Wysyłanie wiadomości', 'Info');
    this.toastService.warning('Funkcja w fazie testów', 'Ostrzeżenie');
    if (this.messageContent.length > 0) {
      this.toastService.success('Wiadomość pomyślnie wysłana', 'Sukces');
    }
    if (this.messageContent.length === 0) {
      this.toastService.error('Wystąpił błąd podczas wysyłania wiadomości', 'Błąd');
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
    this.disableSend = false;
  }

}
