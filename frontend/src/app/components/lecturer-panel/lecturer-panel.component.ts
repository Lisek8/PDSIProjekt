import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { Dashboard } from '../../models/dashboard';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-lecturer-panel',
  templateUrl: './lecturer-panel.component.html',
  styleUrls: ['./lecturer-panel.component.css']
})
export class LecturerPanelComponent implements OnInit {

  data = {
    labels: ['Dostępne', 'W trakcie realizacji', 'Wymagające potwierdzenia', 'Zrealizowane'],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#4287f5',
          '#f77300',
          '#d60000',
          '#37de00'
        ],
        hoverBackgroundColor: [
          '#42bcf5',
          '#ffa200',
          '#ff0000',
          '#3fff00'
        ]
      }]
  };
  options = {
    title: {
      display: true,
      text: 'Tematy',
      fontSize: 50
    },
    legend: {
      display: true,
      position: 'bottom'
    }
  };

  pageData: Dashboard;

  constructor(private dataService: DataService, private toastService: ToastrService) { }

  ngOnInit() {
    this.pageData = {
      availableTopics: 0,
      inProgressTopics: 0,
      actionRequiredTopics: 0,
      finishedTopics: 0,
      newMessages: 0
    };
    this.dataService.getDashboardData().pipe(
      catchError(err => {
        this.toastService.error('Nie udało się pobrać danych z serwera. Spróbuj ponownie za chwilę.', 'Błąd');
        return EMPTY;
      })
    ).subscribe(
      res => {
        this.pageData = res;
        this.data.datasets[0].data = [this.pageData.availableTopics, this.pageData.inProgressTopics,
        this.pageData.actionRequiredTopics, this.pageData.finishedTopics];
      }
    );
  }

}