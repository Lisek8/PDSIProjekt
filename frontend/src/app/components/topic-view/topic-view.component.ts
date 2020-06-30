import { Component, OnInit } from '@angular/core';
import { TopicViewTabs } from '../../enums/topic-view-tabs.enum';
import { TopicDataFull } from '../../models/topic-data';
import { DataService } from '../../services/data/data.service';
import { Observable, BehaviorSubject, EMPTY } from 'rxjs';
import { RoleGuardService } from 'src/app/services/role-guard/role-guard.service';
import { UserType } from 'src/app/enums/user-type.enum';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-topic-view',
  templateUrl: './topic-view.component.html',
  styleUrls: ['./topic-view.component.css']
})

export class TopicViewComponent implements OnInit {
  tabs: any = TopicViewTabs;
  activeTab: any;

  topicInfo: Observable<TopicDataFull>;
  subject: BehaviorSubject<UserType> = this.roleService.getUserType();
  currentUserType: UserType;
  userTypes: typeof UserType = UserType;


  constructor(private dataService: DataService, private roleService: RoleGuardService, private toastService: ToastrService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.onRefreshRequest();
    this.activeTab = this.tabs.General;
    this.currentUserType = this.subject.getValue();
    this.subject.subscribe(value => this.currentUserType = value);
  }

  setTab(tabToActivate: TopicViewTabs) {
    this.activeTab = tabToActivate;
  }

  onRefreshRequest() {
    this.topicInfo = this.dataService.getTopicInfo(this.route.snapshot.paramMap.get('id')).pipe(
      catchError(() => {
        this.toastService.error('Nie udało się pobrać danych tematu');
        return EMPTY;
      })
    );
  }
}
