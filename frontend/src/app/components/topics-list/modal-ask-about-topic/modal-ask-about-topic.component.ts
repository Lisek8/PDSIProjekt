import { Component, OnInit, Input } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TopicDataSimple } from 'src/app/models/topic-data';
import { DataService } from 'src/app/services/data/data.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-modal-ask-about-topic',
  templateUrl: './modal-ask-about-topic.component.html',
  styleUrls: ['./modal-ask-about-topic.component.css']
})
export class ModalAskAboutTopicComponent implements OnInit {

  @Input() topicData: TopicDataSimple;
  @Input() modalRef: NgbModalRef;

  message: string;

  constructor(private dataService: DataService, private toastService: ToastrService) {}

  ngOnInit(): void {
  }

  createConversation(topicId: number, message: string) {
    this.dataService.sendMessageToTopic(topicId, message)
    .pipe(
      catchError(err => {
        this.toastService.error('Wystąpił błąd podczas wysyłania wiadomości', 'Błąd');
        return throwError(err);
      })
    ).subscribe(value => {
      this.toastService.success('Pomyślnie wysłano wiadomość', 'Sukces');
    });
  }

}
