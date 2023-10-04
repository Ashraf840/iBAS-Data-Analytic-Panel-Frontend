import { Component } from '@angular/core';
import { QuestionAnswerService } from '../../services/question-answer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-question-answer',
  templateUrl: './list-question-answer.component.html',
  styleUrls: ['./list-question-answer.component.css']
})
export class ListQuestionAnswerComponent {
  router: any;
  constructor(private questionAnswerService: QuestionAnswerService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
    ) {}

  questionAnswers: any | undefined;
  qnaId: any | undefined;

  ngOnInit(): void {
    this.questionAnswerService.getQAList().subscribe(data => {
      this.questionAnswers = data;
      console.log(`Q/A List:`, this.questionAnswers);
    });
  }

  goToAdd() {
    this._router.navigate(["/qa-dataset/add"], {
      relativeTo: this._activatedRoute,
    });
  }

  addQuestionAnswerToDataSet(id: string) {
    console.log(`A question-asnwer dataset will be created!`);
    console.log(`QnA Id:`, id);
    this.qnaId = id;

    this.questionAnswerService.addToDataset(this.qnaId).subscribe((data) => {
      this.router.navigate(['/idap-admin/qa-dataset/list']);
    });
  }
}
