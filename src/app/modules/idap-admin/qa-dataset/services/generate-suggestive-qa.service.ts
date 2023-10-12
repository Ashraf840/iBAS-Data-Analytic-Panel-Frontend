import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenSuggestiveQues } from '../types/gen-suggestive-ques';

@Injectable({
  providedIn: 'root'
})
export class GenerateSuggestiveQaService {

  constructor(private http: HttpClient) { }
  private GenSuggestiveUrl: string =
    // 'http://127.0.0.1:5001/suggestive_ques_gen';
    'http://127.0.0.1:8082/gen-suggestive-qa/';
  
  genSuggetiveQuesStat(): Observable<GenSuggestiveQues[]> {
    return this.http.get<GenSuggestiveQues[]>(this.GenSuggestiveUrl);
  }

  // genSuggetiveQuesStat(){
  //   return {status: 'succes'}
  // }
}
