import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'

import { QaDatasetComponent } from './qa-dataset.component';
import { QuestionAnswerListComponent } from './question-answer-list/question-answer-list.component';
import { NewQuestionAnswerComponent } from './new-question-answer/new-question-answer.component';
import { UpdateQuestionAnswerComponent } from './update-question-answer/update-question-answer.component';

import { AppRoutingModule } from 'src/app/app-routing.module';


@NgModule({
  declarations: [QaDatasetComponent, QuestionAnswerListComponent, NewQuestionAnswerComponent, UpdateQuestionAnswerComponent],
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule,

    AppRoutingModule,
  ],
  exports: [QaDatasetComponent],
})
export class QaDatasetModule { }
