import { Component, OnInit } from '@angular/core';
import { PersonalTopicsTableHeaders } from '../enums/personal-topics-table-headers.enum';
import { TopicDataPersonal } from '../dataClasses/topic-data';
import { DataService } from '../data/data.service';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'app-personal-topics',
  templateUrl: './personal-topics.component.html',
  styleUrls: ['./personal-topics.component.css']
})
export class PersonalTopicsComponent implements OnInit {
  personalTopicsTableHeaders: any = PersonalTopicsTableHeaders;
  topics: TopicDataPersonal[];

  selectOptionsType: SelectItem[];
  selectOptionsStatus: SelectItem[];

  selectedTypes: SelectItem[];
  selectedStatuses: SelectItem[];

  searchInput = '';

  cols = [
    { field: PersonalTopicsTableHeaders.Topic, header: 'Temat pracy' },
    { field: PersonalTopicsTableHeaders.Type, header: 'Rodzaj pracy' },
    { field: PersonalTopicsTableHeaders.Status, header: 'Status' },
    { field: PersonalTopicsTableHeaders.Student, header: 'Student' },
    { field: PersonalTopicsTableHeaders.Messages, header: 'Nowych wiadomośći' }
  ];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getPersonalTopics().forEach((topics) => this.topics = topics);
    this.populateFilters();
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
}
