import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { TopicDataSimple } from 'src/app/models/topic-data';

@Component({
  selector: 'app-modal-reserve-confirmation',
  templateUrl: './modal-reserve-confirmation.component.html',
  styleUrls: ['./modal-reserve-confirmation.component.css']
})
export class ModalReserveConfirmationComponent implements OnInit {
  @Input() topicData: TopicDataSimple;
  @Input() modalRef: NgbModalRef;

  constructor() {}

  ngOnInit(): void {
  }

  reserveTopic(topicId: number) {
    console.warn('Not implemented yet');
  }

}
