import { Component, OnInit, Input } from '@angular/core';
import { TopicDataFull } from 'src/app/models/topic-data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TopicType } from 'src/app/enums/topic-type.enum';
import { TopicStatus } from 'src/app/enums/topic-status.enum';
import { UserType } from 'src/app/enums/user-type.enum';
import { RoleGuardService } from 'src/app/services/role-guard/role-guard.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-topic-view-general',
  templateUrl: './topic-view-general.component.html',
  styleUrls: ['./topic-view-general.component.css']
})
export class TopicViewGeneralComponent implements OnInit {
  @Input() data?: TopicDataFull;
  dataEditCopy: TopicDataFull;
  topicTags: string;
  topicTypes: typeof TopicType = TopicType;
  topicStatuses: typeof TopicStatus = TopicStatus;
  subject: BehaviorSubject<UserType> = this.roleService.getUserType();
  currentUserType: UserType;
  userTypes: typeof UserType = UserType;

  constructor(private modalService: NgbModal, private roleService: RoleGuardService) { }

  ngOnInit() {
    this.currentUserType = this.subject.getValue();
    this.subject.subscribe(value => this.currentUserType = value);
  }

  open(content) {
    this.dataEditCopy = this.data;
    this.topicTags = this.dataEditCopy.tags.join(',');
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'});
  }

  saveChanges() {
    this.dataEditCopy.tags = this.topicTags.split(',');
    // not implemented
  }
}
