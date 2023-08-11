import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnswerService } from '../../services/answer.service';
import { LanguageService } from '../../../language/services/language.service';
import { Router } from '@angular/router';

// import {MatInputModule} from '@angular/material/input';
// // import { FormsModule } from '@angular/forms';
// import {NgFor} from '@angular/common';
// import {MatSelectModule} from '@angular/material/select';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import { SelectModule } from 'ng2-select';

@Component({
  selector: 'app-create-answer',
  templateUrl: './create-answer.component.html',
  styleUrls: ['./create-answer.component.css'],
  // standalone: true,
  // imports: [MatFormFieldModule, MatSelectModule, NgFor, MatInputModule],

  // properties: [
  //   'allowClear',
  //   'placeholder',
  //   'items',
  //   'multiple',
  //   'showSearchInputInDropdown']
})
export class CreateAnswerComponent implements OnInit {
  constructor(
    private languageService: LanguageService,
    private answerService: AnswerService,
    private router: Router
  ) {}

  data: any;
  languages: any | undefined;
  selectedLanguage: string | undefined;

  ngOnInit(): void {
    this.languageService.getLangList().subscribe((data) => {
      this.languages = data;
      console.log(`Fetched languages:`, this.languages);
    });
  }

  form = new FormGroup({
    answer: new FormControl('', Validators.required),
    language: new FormControl('', Validators.required),
    created_by: new FormControl('', Validators.required),
  });

  onChange = (event: any): void => {
    this.selectedLanguage = event?.language_name  // if the "language_name" key is avaiable
    // console.log(`Onchange method is called`);
    // console.log(`Event:`, event);
    // console.log(`Selected Language: ${this.selectedLanguage}`);
  }

  addAnswer() {
    // console.log(`Create-answer-button is clicked!`);
    this.data = this.form.value;
    // console.log(`Form data:`, this.data);

    this.answerService.addAnswer(this.data).subscribe((data) => {
      this.router.navigate(['qa-dataset/answer']);
    });
  }
}
