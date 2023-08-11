import { Injectable } from '@angular/core';
import { Question } from '../types/question';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient) { }

  private QuestionCLUrl: string =
    'http://127.0.0.1:8080/qa-dataset/api/question-answer/question/';
  
  // getQuestionList
  getQuesList(): Observable<Question[]> {
    return this.http.get<Question[]>(this.QuestionCLUrl);
  }

  // createLanguage
  addQuestion(question: Question): Observable<Question> {
    // console.log(`question: `, question);
    return this.http.post<Question>(this.QuestionCLUrl, question);
  }
}
