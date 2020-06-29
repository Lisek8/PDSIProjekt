import { Component, OnInit, Input } from '@angular/core';
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
  dataEditCopy: TopicDataFull;
  topicTags: string;
  topicTypes: typeof TopicType = TopicType;
  topicStatuses: typeof TopicStatus = TopicStatus;
  subject: BehaviorSubject<UserType> = this.roleService.getUserType();
  currentUserType: UserType;
  userTypes: typeof UserType = UserType;
  examDate: Date;

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
    this.dataEditCopy = this.data;
    this.topicTags = this.dataEditCopy.tags.join(',');
    this.examDate = new Date(this.dataEditCopy.examDate);
  }

  saveChanges() {
    this.dataEditCopy.tags = this.topicTags.split(',');
    this.dataEditCopy.examDate = this.examDate.toUTCString();
    this.dataService.modifyTopic(this.dataEditCopy).pipe(
      catchError(err => {
        this.toastService.error('Wystąpił błąd podczas modyfikacji tematu', 'Błąd');
        return throwError(err);
      })
    ).subscribe(value => {
      this.toastService.success('Pomyślnie zmodyfikowano temat', 'Sukces');
    });
  }

  deleteTopic() {
    this.dataService.deleteTopic(this.data.id).pipe(
      catchError(err => {
        this.toastService.error('Wystąpił błąd podczas usuwania tematu', 'Błąd');
        return throwError(err);
      })
    ).subscribe(value => {
      this.router.navigate(['personal']);
    });
  }
}
