import { Injectable } from '@angular/core';
import { Answer } from '../types/answer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  constructor(private http: HttpClient) {}
  
  private AnswerCLUrl: string =
    'http://127.0.0.1:8080/qa-dataset/api/question-answer/answer/';

  // getAnswerList
  getAnsList(): Observable<Answer[]> {
    return this.http.get<Answer[]>(this.AnswerCLUrl);
  }

  // createAnswer
  addAnswer(answer: Answer): Observable<Answer> {
    // console.log(`answer: `, answer);
    return this.http.post<Answer>(this.AnswerCLUrl, answer);
  }
}
