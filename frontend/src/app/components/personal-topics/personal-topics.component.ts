import { Component, OnInit } from '@angular/core';
import { PersonalTopicsTableHeaders } from '../../enums/personal-topics-table-headers.enum';
import { TopicDataPersonal, TopicDataSimple } from '../../models/topic-data';
import { DataService } from '../../services/data/data.service';
import { SelectItem } from 'primeng/api/selectitem';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TopicType } from 'src/app/enums/topic-type.enum';

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

  searchInput = '';

  cols = [
    { field: PersonalTopicsTableHeaders.Topic, header: 'Temat pracy' },
    { field: PersonalTopicsTableHeaders.Type, header: 'Rodzaj pracy' },
    { field: PersonalTopicsTableHeaders.Status, header: 'Status' },
    { field: PersonalTopicsTableHeaders.Student, header: 'Student' },
    { field: PersonalTopicsTableHeaders.Messages, header: 'Nowych wiadomośći' }
  ];

  constructor(private dataService: DataService, private modalService: NgbModal) { }

  ngOnInit() {
    this.dataService.getPersonalTopics().forEach((topics) => this.topics = topics);
    this.populateFilters();
  }

  open(content) {
    this.topicTags = '';
    this.newTopicInfo.description = '';
    this.newTopicInfo.tags = [];
    this.newTopicInfo.type = TopicType.Engineer;
    this.newTopicInfo.description = '';
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
    // not implemented
  }
}
