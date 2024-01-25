import { Component } from '@angular/core';
import { QuestionAnswerService } from '../../services/question-answer.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GenerateSuggestiveQaService } from '../../services/generate-suggestive-qa.service';
import { ReplaySubject, finalize, takeUntil } from 'rxjs';
import { Pageable, TableColumn } from 'src/app/utility/utils';
import { Sort } from '@angular/material/sort';
import { QueryParams } from 'src/app/models';
import { IButtonDescription } from 'src/app/utility/utils/button-description';

@Component({
  selector: 'app-list-question-answer',
  templateUrl: './list-question-answer.component.html',
  styleUrls: ['./list-question-answer.component.scss']
})
export class ListQuestionAnswerComponent {
  [x: string]: any;
  router: any;
  constructor(private questionAnswerService: QuestionAnswerService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private generateSuggestiveQaService: GenerateSuggestiveQaService,
  ) { }

  questionAnswers: any | undefined;
  qnaId: any | undefined;

  totalCount = 0;
  searchText: string = '';
  isLoading: boolean = false;
  resetPagination: boolean = false;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  limit: number = 10;
  offset: number = 0;

  ngOnInit(): void {
    this.getQAList(this.offset, this.limit, "");
  }

  data: any[] = [];

  getQAList(offset: any, limit: any, searchText: string = '') {
  
    this.isLoading = true;
    let params = new QueryParams(offset, limit, '', searchText);
    this.questionAnswerService.getQAList()
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.questionAnswers = data;
          this.data = data.results;
          this.totalCount = data.count;
        },
        error: (err) => {
          
        },
        complete: () => { }
      });
  }

  goToAdd() {
    this._router.navigate(["/qa-dataset/add"], {
      relativeTo: this._activatedRoute,
    });
  }

  addQuestionAnswerToDataSet(
    id: string,
    bn_q: string,
    en_q: string,
    tn_q: string,
    bn_a: string,
    en_a: string
  ) {
    console.log(`A question-asnwer dataset will be created!`);
    console.log(`QnA Id:`, id);
    this.qnaId = id;

    this.questionAnswerService.addToDataset(this.qnaId).subscribe((data) => {
      this._router.navigate(["/qa-dataset/final-dataset"], {
        relativeTo: this._activatedRoute,
      });
    });
  }

  genSuggestiveQuesSuccess() {
    this.generateSuggestiveQaService.genSuggetiveQuesStat().subscribe((data) => {
      Swal.fire('Completed!', 'Succesfully generated suggestive questions!', 'success')
    });
  }

  pageChangeEvent(event: Pageable): void {
    this.limit = event.limit;
    this.offset = event.offset;
    this.getQAList(event.offset, event.limit, this.searchText);
  }

  pageSortEvent(event: Sort): void {
    this.getQAList(this.offset, this.limit, this.searchText);
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
    this.getQAList(this.offset, this.limit, searchText);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  reset(){
    
  }

  columns: TableColumn[] = [
    { columnDef: 'id', columnDefBn: 'id', header: 'Id' },
    { columnDef: 'bangla_ques', columnDefBn: 'bangla_ques', header: 'Bangla Question' },
    { columnDef: 'english_ques', columnDefBn: 'english_ques', header: 'English Question' },
    { columnDef: 'transliterated_ques', columnDefBn: 'transliterated_ques', header: 'Transliterated Question' },
    { columnDef: 'bangla_ans', columnDefBn: 'bangla_ans', header: 'Bangla Answer' },
    { columnDef: 'english_ans', columnDefBn: 'english_ans', header: 'English Answer' }
  ];

  listButton: IButtonDescription[] = [
    {
      listener: row => {},
      text: 'Add To Dataset',
      toolTip: 'Add To Dataset',
      icon: 'add',
    }
  ];
}
