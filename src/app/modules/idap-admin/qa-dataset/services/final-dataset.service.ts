import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FinalDataset } from '../types/final-dataset';
import { StartTrainingModelResp } from '../types/start-training-model-resp';


@Injectable({
  providedIn: 'root'
})
export class FinalDatasetService {

  constructor(private http:HttpClient) { }
  private FinalDatasetUrl: string =
    'http://ibasdap-api.celloscope.net/final-dataset/get-final-dataset/';

  private StartTrainingModelURL: string =
    "http://ibasdap-api.celloscope.net/final-dataset/start-training/";

  private start_training: StartTrainingModelResp = {
    message: `start_training`
  }
  
  getFinalDatasetList(): Observable<FinalDataset[]> {
    return this.http.get<FinalDataset[]>(this.FinalDatasetUrl);
  }

  startTrainingModel(): Observable<StartTrainingModelResp> {
    return this.http.get<StartTrainingModelResp>(this.StartTrainingModelURL);
  }
}
