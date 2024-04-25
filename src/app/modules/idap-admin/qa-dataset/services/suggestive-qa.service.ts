import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuggestiveQues } from '../types/suggestive-ques';
import { PushSuggestiveQA } from '../types/suggestive-ques';

@Injectable({
  providedIn: 'root'
})
export class SuggestiveQaService {
  constructor(private http: HttpClient) { }
  private SuggestiveQuestionsUrl: string =
    'http://127.0.0.1:8082/suggestive-qa/';

  private PushUpdatedSuggestiveQAUrl: string =
    'http://127.0.0.1:8082/push-suggestive-qa/';

  getSuggestiveQuesList(param: any): Observable<SuggestiveQues[]> {
    let params = new HttpParams()
      .set("limit", param.limit)
      .set("offset", param.offset)
      .set('searchText', param.searchText || '')
    return this.http.get<SuggestiveQues[]>(`${this.SuggestiveQuestionsUrl}?${params.toString()}`);
  }

  pushUpdatedSuggestiveQA(): Observable<PushSuggestiveQA> {
    return this.http.get<PushSuggestiveQA>(`${this.PushUpdatedSuggestiveQAUrl}`);
  }
}
