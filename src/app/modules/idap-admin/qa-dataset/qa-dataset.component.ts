import { Component, OnInit } from '@angular/core';
import { QuestionAnswerService } from './services/question-answer.service';
import { QueryParams } from 'src/app/models';
// import { Question } from './components/question/types/question';

@Component({
  selector: 'app-qa-dataset',
  templateUrl: './qa-dataset.component.html',
  styleUrls: ['./qa-dataset.component.css']
})
export class QaDatasetComponent implements OnInit {
  constructor(private questionAnswerService: QuestionAnswerService) { }

  questionAnswers: any | undefined;

  ngOnInit(): void {
    let params = new QueryParams(0, undefined, '', '');
    this.questionAnswerService.getQAList(params).subscribe(data => {
      this.questionAnswers = data;
      console.log(`Q/A List:`, this.questionAnswers);
    });
  }
}
