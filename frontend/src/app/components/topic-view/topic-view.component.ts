import { Component, OnInit } from '@angular/core';
import { TopicViewTabs } from '../../enums/topic-view-tabs.enum';
import { TopicDataFull } from '../../models/topic-data';
import { DataService } from '../../services/data/data.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-topic-view',
  templateUrl: './topic-view.component.html',
  styleUrls: ['./topic-view.component.css']
})

export class TopicViewComponent implements OnInit {
  tabs: any = TopicViewTabs;
  activeTab: any;

  topicInfo: Observable<TopicDataFull>;


  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.topicInfo = this.dataService.getTopicInfo(/* topic id here */0);
    this.activeTab = this.tabs.General;
  }

  setTab(tabToActivate: TopicViewTabs) {
    this.activeTab = tabToActivate;
  }
}
