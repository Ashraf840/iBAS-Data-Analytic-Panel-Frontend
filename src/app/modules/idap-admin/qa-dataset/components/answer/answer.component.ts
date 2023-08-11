import { Component, OnInit } from '@angular/core';
// import { Answer } from './types/answer';
import { AnswerService } from './services/answer.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css'],
})
export class AnswerComponent implements OnInit {
  constructor(private AnswerService: AnswerService) {}

  answers: any | undefined;

  ngOnInit(): void {
    this.AnswerService.getAnsList().subscribe((data) => {
      this.answers = data;
      console.log(`Answer List:`, this.answers);
    });
  }
}
