import { Component, OnInit } from '@angular/core';
import { PersonalTopicsTableHeaders } from '../../enums/personal-topics-table-headers.enum';
import { TopicDataPersonal, TopicDataSimple } from '../../models/topic-data';
import { DataService } from '../../services/data/data.service';
import { SelectItem } from 'primeng/api/selectitem';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TopicType } from 'src/app/enums/topic-type.enum';
import { UserType } from 'src/app/enums/user-type.enum';
import { RoleGuardService } from 'src/app/services/role-guard/role-guard.service';
import { BehaviorSubject, EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-personal-topics',
  templateUrl: './personal-topics.component.html',
  styleUrls: ['./personal-topics.component.css']
})
export class PersonalTopicsComponent implements OnInit {
  personalTopicsTableHeaders: typeof PersonalTopicsTableHeaders = PersonalTopicsTableHeaders;
  topicTypes: typeof TopicType = TopicType;
  topics: TopicDataPersonal[];

  selectOptionsType: SelectItem[];
  selectOptionsStatus: SelectItem[];

  selectedTypes: SelectItem[];
  selectedStatuses: SelectItem[];

  newTopicInfo: TopicDataSimple;
  topicTags: string;

  subject: BehaviorSubject<UserType> = this.roleService.getUserType();
  currentUserType: UserType;
  userTypes: typeof UserType = UserType;

  searchInput = '';

  cols = [
    { field: PersonalTopicsTableHeaders.Topic, header: 'Temat pracy' },
    { field: PersonalTopicsTableHeaders.Type, header: 'Rodzaj pracy' },
    { field: PersonalTopicsTableHeaders.Status, header: 'Status' },
    { field: PersonalTopicsTableHeaders.Student, header: 'Student' },
    { field: PersonalTopicsTableHeaders.Messages, header: 'Nowych wiadomośći' }
  ];

  constructor(private dataService: DataService, private modalService: NgbModal, private roleService: RoleGuardService,
              private toastService: ToastrService) { }

  ngOnInit() {
    this.topics = [];
    this.currentUserType = this.subject.getValue();
    this.subject.subscribe(value => this.currentUserType = value);
    this.getPersonalTopics();
    this.populateFilters();
  }

  open(content) {
    this.newTopicInfo = {
      id: -1,
      faculty: '',
      lecturer: '',
      type: TopicType.Engineer,
      topic: '',
      description: '',
      tags: []
    };
    this.topicTags = '';
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'});
  }

  populateFilters() {
    this.selectOptionsType = [];
    this.selectOptionsStatus = [];
    for (const topic of this.topics) {
      if (!this.selectOptionsType.some((item) => item.value === topic.type)) {
        this.selectOptionsType.push({ label: topic.type, value: topic.type });
      }
      if (!this.selectOptionsStatus.some((item) => item.value === topic.status)) {
        this.selectOptionsStatus.push({ label: topic.status, value: topic.status });
      }
    }
  }

  createTopic() {
    this.newTopicInfo.tags = this.topicTags.split(',');
    this.dataService.createTopic(this.newTopicInfo.type, this.newTopicInfo.topic, this.newTopicInfo.description, this.newTopicInfo.tags)
    .pipe(
      catchError(err => {
        this.toastService.error('Wystąpił błąd podczas tworzenia tematu', 'Błąd');
        return throwError(err);
      })
    ).subscribe(value => {
      this.toastService.success('Udało się stworzyć temat', 'Sukces');
      this.getPersonalTopics();
    });
  }

  private getPersonalTopics() {
    this.dataService.getPersonalTopics()
    .pipe(
      catchError(err => {
        this.toastService.error('Nie udało się pobrać listy tematów', 'Błąd');
        return EMPTY;
      })
    ).subscribe((topics) => this.topics = topics);
  }

}
