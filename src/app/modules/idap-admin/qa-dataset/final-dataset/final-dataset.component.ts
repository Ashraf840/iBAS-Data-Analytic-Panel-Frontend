import { Component, OnInit } from '@angular/core';
import { FinalDatasetService } from '../services/final-dataset.service';
import { WebsocketService } from '../services/websocket.service';
import { Pageable, TableColumn } from 'src/app/utility/utils';
import { Sort } from '@angular/material/sort';
import { IButtonDescription } from 'src/app/utility/utils/button-description';
import { ReplaySubject } from 'rxjs';
import { QueryParams } from 'src/app/models';

@Component({
  selector: 'app-final-dataset',
  templateUrl: './final-dataset.component.html',
  styleUrls: ['./final-dataset.component.css']
})
export class FinalDatasetComponent implements OnInit {
  constructor(
    private finalDatasetService: FinalDatasetService,
    private websocketService: WebsocketService
  ) {}

  finalDataset: any | undefined
  isModelTraining = false
  showProgressbar = false
  percentage = 0;

  dataLimitOptions = [15, 30, 45, 60];
  pageSizes = 15;

  totalCount = 0;
  searchText: string = '';
  isLoading: boolean = false;
  resetPagination: boolean = false;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  limit: number = 15;
  offset: number = 0;

  ngOnInit(): void {
    this.pageSizes = this.limit;
    this.websocketService.openWebsocket();

    // this.websocketService.messages.subscribe((message) => {
    //   console.log(`Percentage:`, message);
    // })
    this.getFinalDataset(this.offset, this.limit, "");
    
  }

  getFinalDataset(offset: any, limit: any, searchText: string = '') {
    let params = new QueryParams(offset, limit, '', searchText);
      this.finalDatasetService.getFinalDatasetList(params).subscribe((data : any)=> {
        this.finalDataset = data.results;
        this.totalCount = data.count;
      });
  }

  start_train() {
    console.log(`Start training btn is clicked!`);
    // this.isModelTraining = true;
    this.isModelTraining = true;
    this.showProgressbar = true;
    this.finalDatasetService.startTrainingModel().subscribe(resp => {
      // console.log(`resp:`, resp);
      
      // if (resp?.message === "training_started") {
      //   this.isModelTraining = true;
      //   this.showProgressbar = true;
      //   // this.websocketService.messages.subscribe((message) => {
      //   //   console.log(`data:`, message);
      //   //   console.log(typeof(message));
      //   // });
      // }
    });

    this.websocketService.messages.subscribe(val => {
      this.percentage = parseInt(val);
      if (this.percentage >= 100) {
        this.isModelTraining = false;
        this.showProgressbar = false;
        this.percentage = 0;
      }
      // console.log(`Value: ${val};   typeof: ${typeof(val)}`);
    });
  }

  pageChangeEvent(event: Pageable): void {
    this.limit = event.limit;
    this.offset = event.offset;
    this.getFinalDataset(event.offset, event.limit, this.searchText);
  }

  pageSortEvent(event: Sort): void {
    this.getFinalDataset(this.offset, this.limit, this.searchText);
  }

  onTableAction(event: any): void {
    console.log('event', event);
  }

  onSearch(searchText: string) {
    if (searchText) {
      this.resetPagination = true;
    } else {
      this.resetPagination = false;
    }
    this.searchText = searchText;
    this.getFinalDataset(this.offset, this.limit, searchText);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  reset(){
    
  }

  columns: TableColumn[] = [
    { columnDef: 'id', columnDefBn: 'id', header: 'Id' },
    { columnDef: 'question', columnDefBn: 'question', header: 'Question' },
    { columnDef: 'answer', columnDefBn: 'answer', header: 'Answer' },
    { columnDef: 'language', columnDefBn: 'language', header: 'Language' }
  ];

  listButton: IButtonDescription[] = [
    
  ];
}
