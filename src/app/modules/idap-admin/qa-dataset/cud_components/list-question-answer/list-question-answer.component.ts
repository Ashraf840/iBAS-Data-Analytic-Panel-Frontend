import { Component } from '@angular/core';
import { QuestionAnswerService } from '../../services/question-answer.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GenerateSuggestiveQaService } from '../../services/generate-suggestive-qa.service';

@Component({
  selector: 'app-list-question-answer',
  templateUrl: './list-question-answer.component.html',
  styleUrls: ['./list-question-answer.component.css']
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
}
