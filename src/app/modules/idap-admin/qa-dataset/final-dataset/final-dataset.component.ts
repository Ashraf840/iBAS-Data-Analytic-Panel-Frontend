import { Component, OnInit } from '@angular/core';
import { FinalDatasetService } from '../services/final-dataset.service';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-final-dataset',
  templateUrl: './final-dataset.component.html',
  styleUrls: ['./final-dataset.component.css']
})
export class FinalDatasetComponent implements OnInit {
  constructor(
	  private finalDatasetService: FinalDatasetService,
	  private websocketService: WebsocketService
  ) {}

  finalDataset: any | undefined
  isModelTraining = false
  showProgressbar = false
  percentage = 0;

  ngOnInit(): void {
    this.websocketService.openWebsocket();

    this.finalDatasetService.getFinalDatasetList().subscribe(data => {
      this.finalDataset = data;
      // console.log(`Final Dataset List:`, this.finalDataset);
    });
  }

  start_train() {
    console.log(`Start training btn is clicked!`);
    this.isModelTraining = true;
    this.showProgressbar = true;
    this.finalDatasetService.startTrainingModel().subscribe(resp => {
      //console.log(`resp (final-dataset.component.ts):`, resp);
    });

    this.websocketService.messages.subscribe(val => {
      //console.log(`Value (final-dataset.component.ts):`, val);
      this.percentage = parseInt(val);
      //console.log(`this.percentage:`, this.percentage);
      if (this.percentage >= 100) {
        this.isModelTraining = false;
        this.showProgressbar = false;
        this.percentage = 0;
      }
      //console.log(`Value: ${val};   typeof: ${typeof(val)}`);
    });
  }
}
