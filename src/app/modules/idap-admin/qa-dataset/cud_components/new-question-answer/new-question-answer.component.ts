// import { Question } from './../../components/question/types/question';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { QuestionService } from '../../components/question/services/question.service';
// import { AnswerService } from '../../components/answer/services/answer.service';
import { QuestionAnswerService } from '../../services/question-answer.service';
import { Router } from '@angular/router';
// import { QuestionAnswer } from '../../types/question-answer';

@Component({
  selector: 'app-new-question-answer',
  templateUrl: './new-question-answer.component.html',
  styleUrls: ['./new-question-answer.component.css'],
})
export class NewQuestionAnswerComponent implements OnInit {
  // public form: FormGroup = new FormGroup({});
  constructor(
    // private answerService: AnswerService,
    // private questionService: QuestionService,
    private questionAnswerService: QuestionAnswerService,
    private router: Router
  ) {}

  data: any | undefined;

  ngOnInit(): void {
  }

  public form : FormGroup = new FormGroup({
    bangla_ques: new FormControl('', Validators.required),
    english_ques: new FormControl('', Validators.required),
    transliterated_ques: new FormControl('', Validators.required),
    bangla_ans: new FormControl('', Validators.required),
    english_ans: new FormControl('', Validators.required),
  });


  addQuestionAnswerSet() {
    this.data = this.form.value;
    this.questionAnswerService.addQA(this.data).subscribe((data) => {
      this.router.navigate(['/idap-admin/qa-dataset/list']);
    });
  }
}
