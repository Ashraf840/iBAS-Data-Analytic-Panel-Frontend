import { Component, OnInit } from '@angular/core';
import { FinalDatasetService } from '../services/final-dataset.service';

@Component({
  selector: 'app-final-dataset',
  templateUrl: './final-dataset.component.html',
  styleUrls: ['./final-dataset.component.css']
})
export class FinalDatasetComponent implements OnInit {
  constructor(private finalDatasetService: FinalDatasetService) {}

  finalDataset: any | undefined

  ngOnInit(): void {
    this.finalDatasetService.getFinalDatasetList().subscribe(data => {
      this.finalDataset = data;
      // console.log(`Final Dataset List:`, this.finalDataset);
    });
  }
}
