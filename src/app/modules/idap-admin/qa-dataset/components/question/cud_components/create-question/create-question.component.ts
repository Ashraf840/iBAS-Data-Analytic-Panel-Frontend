import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../../services/question.service';
import { AnswerService } from '../../../answer/services/answer.service';
import { LanguageService } from '../../../language/services/language.service';
import { Router } from '@angular/router';
import { Question } from '../../types/question';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css'],
})
export class CreateQuestionComponent implements OnInit {
  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService,
    private languageService: LanguageService,
    private router: Router
  ) {}

  data: any;
  answers: any | undefined;
  languages: any | undefined;
  selectedAnswer: string | undefined;
  selectedLanguage: string | undefined;

  ngOnInit(): void {
    this.answerService.getAnsList().subscribe((data) => {
      this.answers = data;
      console.log(`Answer List:`, this.answers);
    });
    this.languageService.getLangList().subscribe((data) => {
      this.languages = data;
      console.log(`Language List:`, this.languages);
    });
  }

  form = new FormGroup({
    answer: new FormControl('', Validators.required),
    language: new FormControl('', Validators.required),
    created_by: new FormControl('', Validators.required),
    question: new FormControl('', Validators.required),
  });

  onLangChange = (event: any): void => {
    // console.log(`Selected a language!`);
    // console.log('Language:', event);
    this.selectedLanguage = event?.language_name;
  };

  onAnsChange = (event: any): void => {
    // console.log(`Selected an answer!`);
    // console.log('Answer:', event);
    this.selectedAnswer = event?.answer;
  };

  addQuestion() {
    this.data = this.form.value;
    // console.log(`A question will be created!`);
    // console.log(`Question:`, this.data);
    this.questionService.addQuestion(this.data).subscribe((data) => {
      this.router.navigate(['qa-dataset/question']);
    });
  }
}
