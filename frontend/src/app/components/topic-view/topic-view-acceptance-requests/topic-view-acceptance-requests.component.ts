import { Component, OnInit, Input } from '@angular/core';
import { TopicDataFull } from 'src/app/models/topic-data';
import { AcceptanceRequestTableHeaders } from 'src/app/enums/acceptance-request-table-headers.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data/data.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

  constructor(private modalService: NgbModal, private toastService: ToastrService, private dataService: DataService) { }

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
    this.dataService.decideOnAcceptingRequest(this.acceptanceId, false)
    .pipe(
      catchError(err => {
        this.toastService.error('Wystąpił błąd podczas odrzucania prośby o realizcję tematu', 'Błąd');
        return throwError(err);
      })
    )
    .subscribe(value => {
      this.toastService.success('Pomyślnie odrzucono prośbę o realizację tematu', 'Sukces');
      this.data.acceptanceRequests.filter(request => request.id !== this.acceptanceId);
    });
  }

  acceptRequest() {
    this.dataService.decideOnAcceptingRequest(this.acceptanceId, true)
    .pipe(
      catchError(err => {
        this.toastService.error('Wystąpił błąd podczas akceptowania prośby o realizcję tematu', 'Błąd');
        return throwError(err);
      })
    )
    .subscribe(value => {
      this.toastService.success('Pomyślnie akceptowano prośbę o realizację tematu', 'Sukces');
      this.data.acceptanceRequests = [];
    });
  }
}
