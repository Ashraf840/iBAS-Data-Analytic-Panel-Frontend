import { Injectable } from '@angular/core';
import { QuestionAnswer, QnA } from '../types/question-answer';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionAnswerService {
  constructor(private http: HttpClient) { }
  private QuestionAnswerCLUrl: string =
    'http://127.0.0.1:8082/qa-dataset/api/qa-dataset/';
  private QnaDatasetAppendUrl: string =
    // "http://127.0.0.1:8082/add-to-dataset/";
    "http://127.0.0.1:8082/final-dataset/add-to-dataset/";

  getQAList(param: any): Observable<QuestionAnswer[]> {
    let params = new HttpParams()
      .set("limit", param.limit)
      .set("offset", param.offset)
      .set('searchText', param.searchText || '')
    return this.http.get<QuestionAnswer[]>(`${this.QuestionAnswerCLUrl}?${params.toString()}`);

  }

  addQA(questionAnswer: QuestionAnswer): Observable<QuestionAnswer> {
    return this.http.post<QuestionAnswer>(this.QuestionAnswerCLUrl, questionAnswer);
  }

  // Add to dataset
  addToDataset(qna: QnA): Observable<QnA> {
    return this.http.post<QnA>(this.QnaDatasetAppendUrl, qna);
  }
}
