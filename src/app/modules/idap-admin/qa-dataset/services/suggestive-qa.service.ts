import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuggestiveQues } from '../types/suggestive-ques';

@Injectable({
  providedIn: 'root'
})
export class SuggestiveQaService {
  constructor(private http: HttpClient) { }
  private SuggestiveQuestionsUrl: string =
    'http://ibasdap-api.celloscope.net/suggestive-qa/';
  
  getSuggestiveQuesList(): Observable<SuggestiveQues[]> {
    return this.http.get<SuggestiveQues[]>(this.SuggestiveQuestionsUrl);
  }
}
