import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataService } from '../data/data.service';
import { TopicDataSimple } from '../dataClasses/topic-data';
import { TopicListTableFields } from '../enums/topic-list-table-headers.enum';

@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.css']
})
export class TopicsListComponent implements OnInit {

  topics: TopicDataSimple[];

  selectOptionsFaculty: SelectItem[];
  selectOptionsLecturer: SelectItem[];
  selectOptionsType: SelectItem[];

  selectedFaculties: SelectItem[];
  selectedLecturers: SelectItem[];
  selectedTypes: SelectItem[];

  searchInput = '';

  cols = [
    { field: TopicListTableFields.Faculty, header: 'Wydział', sortable: true },
    { field: TopicListTableFields.Lecturer, header: 'Prowadzący', sortable: true },
    { field: TopicListTableFields.Type, header: 'Rodzaj pracy', sortable: true },
    { field: TopicListTableFields.Topic, header: 'Temat pracy', sortable: true },
    { field: TopicListTableFields.Tags, header: 'Tagi', sortable: false }
  ];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getTopics().forEach((topics) => this.topics = topics);
    this.populateFilters();
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

}
