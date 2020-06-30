import { Component, OnInit, Input } from '@angular/core';
import { NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { TopicDataSimple } from 'src/app/models/topic-data';
import { DataService } from 'src/app/services/data/data.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-modal-reserve-confirmation',
  templateUrl: './modal-reserve-confirmation.component.html',
  styleUrls: ['./modal-reserve-confirmation.component.css']
})
export class ModalReserveConfirmationComponent implements OnInit {
  @Input() topicData: TopicDataSimple;
  @Input() modalRef: NgbModalRef;

  constructor(private dataService: DataService, private toastService: ToastrService) {}

  ngOnInit(): void {
  }

  reserveTopic(topicId: number) {
    this.dataService.createAcceptanceRequest(topicId)
    .pipe(
      catchError(err => {
        this.toastService.error('Wystąpił błąd podczas wysyłania prośby o realizację tematu', 'Błąd');
        return throwError(err);
      })
    ).subscribe(value => {
      this.toastService.success('Pomyślnie wysłano prośbę o realizację tematu', 'Sukces');
    });
  }

}
