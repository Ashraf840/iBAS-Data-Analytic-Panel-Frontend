import { Component, OnInit, TemplateRef } from '@angular/core';
import { SuggestiveQaService } from '../services/suggestive-qa.service';

@Component({
  selector: 'app-suggestive-qa',
  templateUrl: './suggestive-qa.component.html',
  styleUrls: ['./suggestive-qa.component.css']
})
export class SuggestiveQaComponent implements OnInit {
  suggestiveQues: any | undefined;
  suggestiveQuesText: string[] = [];
  nextId: number = 1;
  showModal = false;
  suggesQuesText: string | undefined;
  constructor(
    private suggestiveQaService: SuggestiveQaService,
  ) { }
  ngOnInit(): void {
    this.suggestiveQaService.getSuggestiveQuesList().subscribe(data => {
      this.suggestiveQues = data;
      for (let index = 0; index < this.suggestiveQues.length; index++) {
        const element = this.suggestiveQues[index];
        // console.log(element["text"]);
        this.suggestiveQuesText.push(element["text"]);
      }
    });
  }

  toggleModal(suggesQuesText?: string) {
    this.showModal = !this.showModal;
    this.suggesQuesText = suggesQuesText;
  }
}
