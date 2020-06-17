import { Component, OnInit } from '@angular/core';
import { TopicViewTabs } from '../../enums/topic-view-tabs.enum';
import { TopicDataFull } from '../../models/topic-data';
import { DataService } from '../../services/data/data.service';
import { Observable } from 'rxjs';
import { RoleGuardService } from 'src/app/services/role-guard/role-guard.service';
import { UserType } from 'src/app/enums/user-type.enum';


@Component({
  selector: 'app-topic-view',
  templateUrl: './topic-view.component.html',
  styleUrls: ['./topic-view.component.css']
})

export class TopicViewComponent implements OnInit {
  tabs: any = TopicViewTabs;
  activeTab: any;

  topicInfo: Observable<TopicDataFull>;
  currentUserType: UserType;
  userTypes: typeof UserType = UserType;


  constructor(private dataService: DataService, private roleService: RoleGuardService) { }

  ngOnInit() {
    this.topicInfo = this.dataService.getTopicInfo(/* topic id here */0);
    this.activeTab = this.tabs.General;
    this.currentUserType = this.roleService.getUserType();
  }

  setTab(tabToActivate: TopicViewTabs) {
    this.activeTab = tabToActivate;
  }
}
