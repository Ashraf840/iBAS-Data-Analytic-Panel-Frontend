import { Component, OnInit, TemplateRef } from '@angular/core';
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



@Component({
  selector: 'app-suggestive-qa',
  templateUrl: './suggestive-qa.component.html',
  styleUrls: ['./suggestive-qa.component.scss']
})
export class SuggestiveQaComponent implements OnInit {
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

  constructor(
    private suggestiveQaService: SuggestiveQaService,
    private questionAnswerService: QuestionAnswerService,
    private generateSuggestiveQaService: GenerateSuggestiveQaService,
    private router: Router,
  ) { }

  data: any | undefined;

  ngOnInit(): void {
    console.log("Called this component!");

    this.getSuggestiveQuestionList(this.offset, this.limit, "");
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
          Swal.fire('Completed!', 'Succesfully generated suggestive questions!', 'success')
            .then((result) => {
              if (result?.isConfirmed) {
                this.ngOnInit();  // After generating suggestive-qa as paraphrased-text refresh this component since then it'll fetch the updated paraphrased text from the db
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
  }

  reset() {

  }

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
