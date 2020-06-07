import { Component, OnInit, Input } from '@angular/core';
import { TopicDataFull } from 'src/app/models/topic-data';

@Component({
  selector: 'app-topic-view-arrangements',
  templateUrl: './topic-view-arrangements.component.html',
  styleUrls: ['./topic-view-arrangements.component.css']
})
export class TopicViewArrangementsComponent implements OnInit {
  @Input() data: TopicDataFull;

  constructor() { }

  ngOnInit() {
  }
}
