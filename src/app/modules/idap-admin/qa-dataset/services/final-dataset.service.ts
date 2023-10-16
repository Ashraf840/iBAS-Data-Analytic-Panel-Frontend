import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FinalDataset } from '../types/final-dataset';

@Injectable({
  providedIn: 'root'
})
export class FinalDatasetService {

  constructor(private http:HttpClient) { }
  private FinalDatasetUrl: string =
    'http://127.0.0.1:8082/final-dataset/get-final-dataset/';
  
    getFinalDatasetList(): Observable<FinalDataset[]> {
      return this.http.get<FinalDataset[]>(this.FinalDatasetUrl);
    }
}
