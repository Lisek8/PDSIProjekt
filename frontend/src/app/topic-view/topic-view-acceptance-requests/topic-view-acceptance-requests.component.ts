import { Component, OnInit, Input } from '@angular/core';
import { TopicDataFull } from 'src/app/dataClasses/topic-data';
import { AcceptanceRequestTableHeaders } from 'src/app/enums/acceptance-request-table-headers.enum';

@Component({
  selector: 'app-topic-view-acceptance-requests',
  templateUrl: './topic-view-acceptance-requests.component.html',
  styleUrls: ['./topic-view-acceptance-requests.component.css']
})
export class TopicViewAcceptanceRequestsComponent implements OnInit {
  @Input() data: TopicDataFull;

  cols = [
    { header: AcceptanceRequestTableHeaders.Student, field: 'student' },
    { header: AcceptanceRequestTableHeaders.Date, field: 'date' },
    { header: AcceptanceRequestTableHeaders.Action, field: '' }
  ];

  acceptanceHeaders = AcceptanceRequestTableHeaders;

  constructor() { }

  ngOnInit() {
  }
}
