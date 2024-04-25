import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { SuggestiveQaService } from '../services/suggestive-qa.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionAnswerService } from '../services/question-answer.service';
import { Router } from '@angular/router';
import { GenerateSuggestiveQaService } from '../services/generate-suggestive-qa.service';
import Swal from 'sweetalert2';
import { ReplaySubject } from 'rxjs';
import { IButtonDescription } from 'src/app/utility/utils/button-description';
import { Pageable, TableColumn } from 'src/app/utility/utils';
import { Sort } from '@angular/material/sort';
import { QueryParams } from 'src/app/models';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { WebsocketService_SuggestiveQa } from '../services/websockets/suggestive-qa-websocket.service';



@Component({
  selector: 'app-suggestive-qa',
  templateUrl: './suggestive-qa.component.html',
  styleUrls: ['./suggestive-qa.component.scss']
})
export class SuggestiveQaComponent implements OnInit, OnDestroy {
  suggestiveQues: any | undefined;
  suggestiveQuesText: string[][] = [];
  nextId: number = 1;
  showModal = false;
  suggesQuesText: string | undefined;

  totalCount = 0;
  searchText: string = '';
  isLoading: boolean = false;
  resetPagination: boolean = false;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  limit: number = 10;
  offset: number = 0;

  loading: boolean = false;

  constructor(
    private suggestiveQaService: SuggestiveQaService,
    private questionAnswerService: QuestionAnswerService,
    private generateSuggestiveQaService: GenerateSuggestiveQaService,
    private websocketService_suggestiveQa: WebsocketService_SuggestiveQa,
    private router: Router,
  ) { }

  data: any | undefined;

  ngOnInit(): void {
    // console.log("Called this component!");

    this.websocketService_suggestiveQa.openWebsocket();

    this.websocketService_suggestiveQa.messages.subscribe((message) => {
      // console.log(message)
      const data = JSON.parse(message);
      console.log(data?.message)

      let str = data?.message

      const endIndex = str.indexOf("!");

      // Extract the desired substring
      const seggregation_status = str.substring(0, endIndex + 1);

      let trigger_stop_str = "Excel file created successfully!";

      if (seggregation_status === trigger_stop_str) {
        this.loading = false;
        Swal.fire('Completed!', 'Successfully generated paraphrased text from augmented queries!', 'success')
      }
    })

    this.getSuggestiveQuestionList(this.offset, this.limit, "");

    // [Test] Use a basic loader on screen
  }

  getSuggestiveQuestionList(offset: any, limit: any, searchText: string = '') {
    let params = new QueryParams(offset, limit, '', searchText);
    this.suggestiveQaService.getSuggestiveQuesList(params).subscribe((res: any) => {
      this.totalCount = res.count;
      this.suggestiveQues = res.data.map((i: any) => ({ ...i }));
    });
  }

  toggleModal(suggesQuesText?: string) {
    this.showModal = !this.showModal;
    this.suggesQuesText = suggesQuesText;
    this.form.controls['bangla_ques'].setValue(this.suggesQuesText)
  }


  public form: FormGroup = new FormGroup({
    bangla_ques: new FormControl('', Validators.required),
    english_ques: new FormControl('', Validators.required),
    transliterated_ques: new FormControl('', Validators.required),
    bangla_ans: new FormControl('', Validators.required),
    english_ans: new FormControl('', Validators.required),
  });

  addQnASet() {
    this.data = this.form.value;
    this.questionAnswerService.addQA(this.data).subscribe((data) => {
      this.router.navigate(['/idap-admin/qa-dataset/list']);
    });
  }

  genSuggestiveQuesSuccess() {
    this.generateSuggestiveQaService.genSuggetiveQuesStat()
      .pipe(
        catchError(error => {
          // Handle the error
          console.error('Error fetching data:', error);
          // Optionally, rethrow the error to propagate it further
          if (error.status === 500) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
          return throwError(error);
        })
      )
      .subscribe((data) => {
        console.log("Generate suggestive question payload:", data.status_code);
        if (data.status_code === 200) {
          Swal.fire('Started!', 'Started generating paraphrased text from augmented queries!', 'success')
            .then((result) => {
              if (result?.isConfirmed) {
                // TODO: Make the loader to true to show the loader on screen
                this.loading = true;

                // this.ngOnDestroy();
                // this.ngOnInit();  // After generating suggestive-qa as paraphrased-text refresh this component since then it'll fetch the updated paraphrased text from the db
              }
            });
        }
      });
  }

  pageChangeEvent(event: Pageable): void {
    this.limit = event.limit;
    this.offset = event.offset;
    this.getSuggestiveQuestionList(event.offset, event.limit, this.searchText);
  }

  pageSortEvent(event: Sort): void {
    this.getSuggestiveQuestionList(this.offset, this.limit, this.searchText);
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
    this.getSuggestiveQuestionList(this.offset, this.limit, searchText);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    // console.log("SuggestiveQaComponent component is destroyed!");
    this.websocketService_suggestiveQa.closeWebsocket();
  }

  reset() { }

  columns: TableColumn[] = [
    { columnDef: 'id', columnDefBn: 'id', header: 'Id' },
    { columnDef: 'text', columnDefBn: 'text', header: 'Suggestive Question' }
  ];

  listButton: IButtonDescription[] = [
    {
      listener: qa => this.toggleModal(qa.id),
      text: 'Keep',
      toolTip: 'Keep',
      icon: 'add',
      color: 'primary',
      disabled: qa => qa.is_added_to_qa_dataset
    },
    {
      listener: qa => { },
      text: 'Remove',
      toolTip: 'Remove',
      icon: 'delete_forever',
      color: 'warn'
    }
  ];
}
