import { Injectable } from '@angular/core';
import { Language } from '../types/langauge';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private http: HttpClient) {}
  
  private languageCLUrl: string =
    'http://127.0.0.1:8080/qa-dataset/api/language/';
  // http://127.0.0.1:8080/qa-dataset/api/language/

  // getLanguageList
  getLangList(): Observable<Language[]> {
    return this.http.get<Language[]>(this.languageCLUrl);
  }

  // createLanguage
  addLang(language: Language): Observable<Language> {
    // console.log(`language: `, language);
    return this.http.post<Language>(this.languageCLUrl, language);
  }
}
