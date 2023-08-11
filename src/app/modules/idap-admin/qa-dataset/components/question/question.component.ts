import { Component, OnInit } from '@angular/core';
import { QuestionService } from './services/question.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{
  constructor(private questionSservice: QuestionService) {}

  questions: any | undefined;
  
  ngOnInit(): void {
    this.questionSservice.getQuesList().subscribe(data => {
      this.questions = data;
      console.log(`Question List:`, this.questions);
    });
  }
}
