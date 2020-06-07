import { Component, OnInit, Input } from '@angular/core';
import { TopicDataFull } from 'src/app/models/topic-data';

@Component({
  selector: 'app-topic-view-general',
  templateUrl: './topic-view-general.component.html',
  styleUrls: ['./topic-view-general.component.css']
})
export class TopicViewGeneralComponent implements OnInit {
  @Input() data: TopicDataFull;

  constructor() { }

  ngOnInit() {
  }
}
