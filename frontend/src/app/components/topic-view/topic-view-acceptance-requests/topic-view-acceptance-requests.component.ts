import { Component, OnInit, Input } from '@angular/core';
import { TopicDataFull } from 'src/app/models/topic-data';
import { AcceptanceRequestTableHeaders } from 'src/app/enums/acceptance-request-table-headers.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-topic-view-acceptance-requests',
  templateUrl: './topic-view-acceptance-requests.component.html',
  styleUrls: ['./topic-view-acceptance-requests.component.css']
})
export class TopicViewAcceptanceRequestsComponent implements OnInit {
  @Input() data: TopicDataFull;

  acceptanceStudent: string;
  acceptanceId: number;

  cols = [
    { header: AcceptanceRequestTableHeaders.Student, field: 'student' },
    { header: AcceptanceRequestTableHeaders.Date, field: 'date' },
    { header: AcceptanceRequestTableHeaders.Action, field: '' }
  ];

  acceptanceHeaders = AcceptanceRequestTableHeaders;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  setAcceptanceStudent(student: string, id: number) {
    this.acceptanceStudent = student;
    this.acceptanceId = id;
  }

  rejectRequest() {
    // not implemented
  }

  acceptRequest() {
    // not implemented
  }
}
