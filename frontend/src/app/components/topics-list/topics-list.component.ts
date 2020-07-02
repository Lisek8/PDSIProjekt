import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataService } from '../../services/data/data.service';
import { TopicDataSimple } from '../../models/topic-data';
import { TopicListTableFields } from '../../enums/topic-list-table-headers.enum';
import { Subscription, EMPTY, BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalReserveConfirmationComponent } from './modal-reserve-confirmation/modal-reserve-confirmation.component';
import { ModalAskAboutTopicComponent } from './modal-ask-about-topic/modal-ask-about-topic.component';
import { UserType } from 'src/app/enums/user-type.enum';
import { RoleGuardService } from 'src/app/services/role-guard/role-guard.service';

@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.css']
})
export class TopicsListComponent implements OnInit, OnDestroy {

  subject: BehaviorSubject<UserType> = this.roleService.getUserType();
  currentUserType: UserType;
  userTypes: typeof UserType = UserType;

  topics: TopicDataSimple[];
  topicSubscription: Subscription;

  selectOptionsFaculty: SelectItem[];
  selectOptionsLecturer: SelectItem[];
  selectOptionsType: SelectItem[];

  selectedFaculties: SelectItem[];
  selectedLecturers: SelectItem[];
  selectedTypes: SelectItem[];

  openModalRef: NgbModalRef;

  searchInput = '';

  cols = [
    { field: TopicListTableFields.Faculty, header: 'Wydział', sortable: true },
    { field: TopicListTableFields.Lecturer, header: 'Prowadzący', sortable: true },
    { field: TopicListTableFields.Type, header: 'Rodzaj pracy', sortable: true },
    { field: TopicListTableFields.Topic, header: 'Temat pracy', sortable: true },
    { field: TopicListTableFields.Tags, header: 'Tagi', sortable: false }
  ];

  constructor(private dataService: DataService, private toastService: ToastrService, private modalService: NgbModal,
              private roleService: RoleGuardService) { }

  ngOnInit() {
    this.topics = [];
    this.currentUserType = this.subject.getValue();
    this.subject.subscribe(value => this.currentUserType = value);
    this.topicSubscription = this.dataService.getTopics()
    .pipe(
      catchError(err => {
        this.toastService.error('Nie udało się pobrać listy tematów', 'Błąd');
        return EMPTY;
      })
    )
    .subscribe((topics) => {
      this.topics = topics;
      this.populateFilters();
    });
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }

  populateFilters() {
    this.selectOptionsFaculty = [];
    this.selectOptionsLecturer = [];
    this.selectOptionsType = [];
    for (const topic of this.topics) {
      if (!this.selectOptionsFaculty.some((item) => item.value === topic.faculty)) {
        this.selectOptionsFaculty.push({ label: topic.faculty, value: topic.faculty });
      }
      if (!this.selectOptionsLecturer.some((item) => item.value === topic.lecturer)) {
        this.selectOptionsLecturer.push({ label: topic.lecturer, value: topic.lecturer });
      }
      if (!this.selectOptionsType.some((item) => item.value === topic.type)) {
        this.selectOptionsType.push({ label: topic.type, value: topic.type });
      }
    }
  }

  openConfirmationModal(topic: TopicDataSimple) {
    this.openModalRef = this.modalService.open(ModalReserveConfirmationComponent);
    this.openModalRef.componentInstance.topicData = topic;
    this.openModalRef.componentInstance.modalRef = this.openModalRef;
  }

  openAskAboutModal(topic: TopicDataSimple) {
    this.openModalRef = this.modalService.open(ModalAskAboutTopicComponent);
    this.openModalRef.componentInstance.topicData = topic;
    this.openModalRef.componentInstance.modalRef = this.openModalRef;
  }

}
