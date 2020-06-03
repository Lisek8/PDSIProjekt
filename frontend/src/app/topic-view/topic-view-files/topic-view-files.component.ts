import { Component, OnInit, Input } from '@angular/core';
import { TopicDataFull } from 'src/app/dataClasses/topic-data';
import { FileTableHeaders } from 'src/app/enums/file-table-headers.enum';

@Component({
  selector: 'app-topic-view-files',
  templateUrl: './topic-view-files.component.html',
  styleUrls: ['./topic-view-files.component.css']
})
export class TopicViewFilesComponent implements OnInit {
  @Input() data: TopicDataFull;

  cols = [
    { header: FileTableHeaders.FileName, field: '' },
    { header: FileTableHeaders.Actions, field: '' }
  ];

  headers = FileTableHeaders;

  constructor() { }

  ngOnInit() {
  }
}
