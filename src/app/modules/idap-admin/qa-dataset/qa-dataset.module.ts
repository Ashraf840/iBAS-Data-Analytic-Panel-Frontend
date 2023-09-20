import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { QaDatasetComponent } from './qa-dataset.component';
// import { QuestionAnswerListComponent } from './question-answer-list/question-answer-list.component';
import { NewQuestionAnswerComponent } from './cud_components/new-question-answer/new-question-answer.component';
import { UpdateQuestionAnswerComponent } from './update-question-answer/update-question-answer.component';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { LanguageComponent } from './components/language/language.component';
import { CreateLanguageComponent } from './components/language/cud_components/create-language/create-language.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateLanguageComponent } from './components/language/cud_components/update-language/update-language.component';
import { AnswerComponent } from './components/answer/answer.component';
import { CreateAnswerComponent } from './components/answer/cud_components/create-answer/create-answer.component'; // Require while using "formGroup" in the HTML template
import { QuestionComponent } from './components/question/question.component';
import { CreateQuestionComponent } from './components/question/cud_components/create-question/create-question.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    QaDatasetComponent,
    // QuestionAnswerListComponent,
    NewQuestionAnswerComponent,
    UpdateQuestionAnswerComponent,
    LanguageComponent,
    CreateLanguageComponent,
    UpdateLanguageComponent,
    AnswerComponent,
    CreateAnswerComponent,
    QuestionComponent,
    CreateQuestionComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    NgSelectModule,
    AppRoutingModule,
    FormsModule, // Require while using "formGroup" in the HTML template
    ReactiveFormsModule, // Require while using "formGroup" in the HTML template
  ],
  exports: [QaDatasetComponent],
})
export class QaDatasetModule {}
