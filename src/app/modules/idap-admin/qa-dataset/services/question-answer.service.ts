import { Injectable } from '@angular/core';
import { QuestionAnswer } from '../types/question-answer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionAnswerService {
  constructor(private http: HttpClient) {}

  private QuestionAnswerCLUrl: string =
    'http://127.0.0.1:8080/qa-dataset/api/qa-dataset/';
  
  getQAList(): Observable<QuestionAnswer[]> {
    return this.http.get<QuestionAnswer[]>(this.QuestionAnswerCLUrl);
  }

  // createQuestionAnswer
  addQA(questionAnswer: QuestionAnswer): Observable<QuestionAnswer> {
    // console.log(`answer: `, answer);
    return this.http.post<QuestionAnswer>(this.QuestionAnswerCLUrl, questionAnswer);
  }
}
