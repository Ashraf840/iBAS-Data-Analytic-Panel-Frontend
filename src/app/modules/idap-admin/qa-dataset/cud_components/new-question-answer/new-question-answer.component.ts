import { Question } from './../../components/question/types/question';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../../components/question/services/question.service';
import { AnswerService } from '../../components/answer/services/answer.service';
import { QuestionAnswerService } from '../../services/question-answer.service';
import { Router } from '@angular/router';
import { QuestionAnswer } from '../../types/question-answer';

@Component({
  selector: 'app-new-question-answer',
  templateUrl: './new-question-answer.component.html',
  styleUrls: ['./new-question-answer.component.css'],
})
export class NewQuestionAnswerComponent implements OnInit {
  constructor(
    private answerService: AnswerService,
    private questionService: QuestionService,
    private questionAnswerService: QuestionAnswerService,
    private router: Router
  ) {}

  data: any | undefined;

  answers: any | undefined;
  questions: any | undefined;

  bnAnswers: any | undefined;
  enAnswers: any | undefined;

  bnQuestions: any | undefined;
  enQuestions: any | undefined;
  transQuestions: any | undefined;

  selectedBnAnswer: string | undefined;
  selectedEnAnswer: string | undefined;
  selectedBnQuestion: string | undefined;
  selectedEnQuestion: string | undefined;
  selectedTransQuestion: string | undefined;

  ngOnInit(): void {
    this.answerService.getAnsList().subscribe((data) => {
      this.answers = data;
      console.log(`Answer List:`, this.answers);

      this.bnAnswers = this.answers?.results.filter(
        (obj: {
          id: string;
          language: string;
          created_by: string;
          answer: string;
          created_at: string;
          update_at: string;
        }) => {
          return obj?.language === 'Bangla';
        }
      );

      this.enAnswers = this.answers?.results.filter(
        (obj: {
          id: string;
          language: string;
          created_by: string;
          answer: string;
          created_at: string;
          update_at: string;
        }) => {
          return obj?.language === 'English';
        }
      );
      console.log(`Bangla Answers List:`, this.bnAnswers);
      console.log(`English Answers List:`, this.enAnswers);
    });
    this.questionService.getQuesList().subscribe((data) => {
      this.questions = data;
      console.log(`Questions List:`, this.questions);

      // this.bnQuestions = this.questions?.results.filter(bnq) => {
      //   return bnq.language = "Bangla"
      // });

      this.bnQuestions = this.questions?.results.filter(
        (obj: {
          id: string;
          answer: string;
          language: string;
          created_by: string;
          question: string;
          created_at: string;
          update_at: string;
        }) => {
          return obj?.language === 'Bangla';
        }
      );

      this.enQuestions = this.questions?.results.filter(
        (obj: {
          id: string;
          answer: string;
          language: string;
          created_by: string;
          question: string;
          created_at: string;
          update_at: string;
        }) => {
          return obj?.language === 'English';
        }
      );

      this.transQuestions = this.questions?.results.filter(
        (obj: {
          id: string;
          answer: string;
          language: string;
          created_by: string;
          question: string;
          created_at: string;
          update_at: string;
        }) => {
          return obj?.language === 'Transliterate';
        }
      );
      console.log(`Bangla Questions List:`, this.bnQuestions);
      console.log(`English Questions List:`, this.enQuestions);
      console.log(`Transliterated Questions List:`, this.transQuestions);
    });
  }

  form = new FormGroup({
    bangla_ques: new FormControl('', Validators.required),
    english_ques: new FormControl('', Validators.required),
    transliterated_ques: new FormControl('', Validators.required),
    bangla_ans: new FormControl('', Validators.required),
    english_ans: new FormControl('', Validators.required),
    created_by: new FormControl('', Validators.required),
  });

  onBnAnsChange = (event: any): void => {
    // console.log(`Selected a bangla answer!`);
    // console.log('Bn Answer:', event);
    this.selectedBnAnswer = event?.answer;
  };

  onEnAnsChange = (event: any): void => {
    // console.log(`Selected an english answer!`);
    // console.log('En Answer:', event);
    this.selectedEnAnswer = event?.answer;
  };

  onBnQuesChange = (event: any): void => {
    // console.log(`Selected a bangla question!`);
    // console.log('Bn Question:', event);
    this.selectedBnQuestion = event?.question;
  };

  onEnQuesChange = (event: any): void => {
    // console.log(`Selected an english question!`);
    // console.log('En Question:', event);
    this.selectedEnQuestion = event?.question;
  };

  onTransQuesChange = (event: any): void => {
    // console.log(`Selected a tansliterated question!`);
    // console.log('Trans Question:', event);
    this.selectedTransQuestion = event?.question;
  };

  addQuestionAnswerSet() {
    this.data = this.form.value;
    // console.log(`A question-asnwer dataset will be created!`);
    // console.log(`Question-Answer Dataset:`, this.data);
    this.questionAnswerService.addQA(this.data).subscribe((data) => {
      this.router.navigate(['qa-dataset/']);
    });
  }
}
