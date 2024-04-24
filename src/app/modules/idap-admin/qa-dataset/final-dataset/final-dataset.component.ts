import { Component, OnInit } from '@angular/core';
import { FinalDatasetService } from '../services/final-dataset.service';
import { WebsocketService_FinalDataset } from '../services/websocket.service';
import { Pageable, TableColumn } from 'src/app/utility/utils';
import { Sort } from '@angular/material/sort';
import { IButtonDescription } from 'src/app/utility/utils/button-description';
import { ReplaySubject } from 'rxjs';
import { QueryParams } from 'src/app/models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ControlItem } from 'src/app/utility/utils/form';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateFinalDatasetComponent } from '../update-final-dataset/update-final-dataset.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-final-dataset',
  templateUrl: './final-dataset.component.html',
  styleUrls: ['./final-dataset.component.scss']
})
export class FinalDatasetComponent implements OnInit {
  constructor(
    private finalDatasetService: FinalDatasetService,
    private websocketService_finalDataset: WebsocketService_FinalDataset,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

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
    this.createform();
    this.pageSizes = this.limit;
    this.websocketService_finalDataset.openWebsocket();

    this.websocketService_finalDataset.messages.subscribe((message) => {
      const data = JSON.parse(message);
      this.percentage = parseInt(data?.message);
      // console.log(`backend_message:`, this.percentage);
      if (this.percentage >= 100) {
        this.isModelTraining = false;
        this.showProgressbar = false;
        this.percentage = 0;
        Swal.fire('Completed!', 'Rasa model training successful!', 'success')
      }
    })

    this.getFinalDataset(this.offset, this.limit, "");
  }

  getFinalDataset(offset: any, limit: any, searchText: string = '') {
    let params = new QueryParams(offset, limit, '', searchText);
    this.finalDatasetService.getFinalDatasetList(params, this.form.value.status).subscribe((data: any) => {
      this.finalDataset = data.results;
      this.totalCount = data.count;
    });
  }

  changeStatus() {
    this.getFinalDataset(this.offset, this.limit, this.searchText);
  }

  start_train() {
    this.isModelTraining = true;
    this.showProgressbar = true;

    // Hits the Django backend API to invoke the model training
    this.finalDatasetService.startTrainingModel().subscribe(resp => {
      console.log("Response:", resp);
    });

    // this.websocketService_finalDataset.messages.subscribe((val: any) => {
    //   this.percentage = parseInt(val);
    //   if (this.percentage >= 100) {
    //     this.isModelTraining = false;
    //     this.showProgressbar = false;
    //     this.percentage = 0;
    //   }
    // });
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

  reset() {

  }

  columns: TableColumn[] = [
    { columnDef: 'id', columnDefBn: 'id', header: 'Id' },
    { columnDef: 'question', columnDefBn: 'question', header: 'Question' },
    { columnDef: 'answer', columnDefBn: 'answer', header: 'Answer' },
    { columnDef: 'language', columnDefBn: 'language', header: 'Language' },
    { columnDef: 'status', columnDefBn: 'status', header: 'Status' }
  ];

  listButton: IButtonDescription[] = [
    {
      listener: qa => this.updatingFinalDataSet(qa),
      text: 'Edit',
      toolTip: 'Edit',
      icon: 'edit',
      disabled: qa => qa.is_added_to_qa_dataset
    }
  ];

  form!: FormGroup;
  statusList: ControlItem[] = [
    {
      value: 'Trained',
      label: "Trained"
    },
    {
      value: 'Untrained',
      label: "Untrained"
    }
  ];

  createform() {
    this.form = this.fb.group({
      status: [null, {
        updateOn: 'change', validators: null
      }]
    });
  }

  updatingFinalDataSet(data: any) {
    console.log(data.oid);
    const myData = Object.assign({}, data);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "580px";
    dialogConfig.data = myData;
    this.dialog.open(UpdateFinalDatasetComponent, dialogConfig).afterClosed().subscribe(res => {
      if (res) {

      }
    });
  }
}
