import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TopicDataFull } from 'src/app/models/topic-data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TopicType } from 'src/app/enums/topic-type.enum';
import { TopicStatus } from 'src/app/enums/topic-status.enum';
import { UserType } from 'src/app/enums/user-type.enum';
import { RoleGuardService } from 'src/app/services/role-guard/role-guard.service';
import { BehaviorSubject, throwError } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topic-view-general',
  templateUrl: './topic-view-general.component.html',
  styleUrls: ['./topic-view-general.component.css']
})
export class TopicViewGeneralComponent implements OnInit {
  @Input() data?: TopicDataFull;
  @Output() requestRefreshEvent = new EventEmitter();
  dataEditCopy: any;
  topicTags: string;
  topicTypes: typeof TopicType = TopicType;
  topicStatuses: typeof TopicStatus = TopicStatus;
  subject: BehaviorSubject<UserType> = this.roleService.getUserType();
  currentUserType: UserType;
  userTypes: typeof UserType = UserType;
  examDate: any;

  constructor(private modalService: NgbModal, private roleService: RoleGuardService, private dataService: DataService,
              private toastService: ToastrService, private router: Router) { }

  ngOnInit() {
    this.currentUserType = this.subject.getValue();
    this.subject.subscribe(value => this.currentUserType = value);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'});
  }

  prepareToEdit() {
    this.dataEditCopy = {};
    Object.assign(this.dataEditCopy, this.data);
    this.topicTags = this.dataEditCopy.tags.join(',');
    if (this.dataEditCopy.examDate !== '') {
      const editDate = new Date(Date.parse(this.dataEditCopy.examDate));
      this.examDate = {
        year: editDate.getFullYear(),
        month: editDate.getMonth() + 1,
        day: editDate.getDay()
      };
    }
  }

  saveChanges() {
    this.dataEditCopy.tags = this.topicTags.split(',');
    console.log(this.examDate);
    if (this.examDate != null) {
      this.dataEditCopy.examDate = this.examDate.year.toString() + '-' + (this.examDate.month - 1).toString() +
        '-' + this.examDate.day.toString();
    }
    this.dataService.modifyTopic(this.dataEditCopy).pipe(
      catchError(err => {
        this.toastService.error('Wystąpił błąd podczas modyfikacji tematu', 'Błąd');
        return throwError(err);
      })
    ).subscribe(value => {
      this.toastService.success('Pomyślnie zmodyfikowano temat', 'Sukces');
      this.requestRefreshEvent.emit();
    });
  }

  deleteTopic() {
    this.dataService.deleteTopic(this.data.id).pipe(
      catchError(err => {
        this.toastService.error('Wystąpił błąd podczas usuwania tematu', 'Błąd');
        return throwError(err);
      })
    ).subscribe(value => {
      this.toastService.success('Pomyślnie usunięto temat', 'Sukces');
      this.router.navigate(['personal']);
    });
  }
}
