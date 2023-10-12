import { Injectable } from '@angular/core';
import { QuestionAnswer, QnA } from '../types/question-answer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionAnswerService {
  constructor(private http: HttpClient) { }
  private QuestionAnswerCLUrl: string =
    'http://127.0.0.1:8082/qa-dataset/api/qa-dataset/';
  private QnaDatasetAppendUrl: string =
    "http://127.0.0.1:8082/add-to-dataset/";

  getQAList(): Observable<QuestionAnswer[]> {
    return this.http.get<QuestionAnswer[]>(this.QuestionAnswerCLUrl);
  }

  addQA(questionAnswer: QuestionAnswer): Observable<QuestionAnswer> {
    console.log(`questionAnswer: `, questionAnswer);
    return this.http.post<QuestionAnswer>(this.QuestionAnswerCLUrl, questionAnswer);
  }

  // Add to dataset
  addToDataset(qna: QnA): Observable<QnA> {
    console.log(`qna:`, qna);
    return this.http.post<QnA>(this.QnaDatasetAppendUrl, qna);
  }
}
