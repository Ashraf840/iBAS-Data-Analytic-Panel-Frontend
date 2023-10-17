import { Component, OnInit, TemplateRef } from '@angular/core';
import { SuggestiveQaService } from '../services/suggestive-qa.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionAnswerService } from '../services/question-answer.service';
import { Router } from '@angular/router';
import { GenerateSuggestiveQaService } from '../services/generate-suggestive-qa.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-suggestive-qa',
  templateUrl: './suggestive-qa.component.html',
  styleUrls: ['./suggestive-qa.component.css']
})
export class SuggestiveQaComponent implements OnInit {
  suggestiveQues: any | undefined;
  suggestiveQuesText: string[][] = [];
  nextId: number = 1;
  showModal = false;
  suggesQuesText: string | undefined;

  constructor(
    private suggestiveQaService: SuggestiveQaService,
    private questionAnswerService:QuestionAnswerService,
    private generateSuggestiveQaService:GenerateSuggestiveQaService,
    private router:Router,
  ) { }

  data: any | undefined;

  ngOnInit(): void {
    this.suggestiveQaService.getSuggestiveQuesList().subscribe(data => {
      this.suggestiveQues = data;
      // console.log(this.suggestiveQues);
      
      for (let index = 0; index < this.suggestiveQues.length; index++) {
        const element = this.suggestiveQues[index];
        // console.log([element["text"], element['is_added_to_qa_dataset']]);
        // this.suggestiveQuesText.push(element["text"]);
        this.suggestiveQuesText.push([element["text"], element['is_added_to_qa_dataset']]);
      }

      // console.log(this.suggestiveQuesText);
    });
  }

  toggleModal(suggesQuesText?: string) {
    this.showModal = !this.showModal;
    this.suggesQuesText = suggesQuesText;
    this.form.controls['bangla_ques'].setValue(this.suggesQuesText)
  }


  public form : FormGroup = new FormGroup({
    bangla_ques: new FormControl('', Validators.required),
    english_ques: new FormControl('', Validators.required),
    transliterated_ques: new FormControl('', Validators.required),
    bangla_ans: new FormControl('', Validators.required),
    english_ans: new FormControl('', Validators.required),
  });

  addQnASet() {
    this.data = this.form.value;
    this.questionAnswerService.addQA(this.data).subscribe((data) => {
      this.router.navigate(['/idap-admin/qa-dataset/list']);
    });
  }

  genSuggestiveQuesSuccess() {
    this.generateSuggestiveQaService.genSuggetiveQuesStat().subscribe((data) => {
      console.log("Generate suggestive question payload:", data);
      
      Swal.fire('Completed!', 'Succesfully generated suggestive questions!', 'success')
    });
  }
}
